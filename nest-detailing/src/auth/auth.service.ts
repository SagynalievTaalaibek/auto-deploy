import {
	ConflictException,
	forwardRef,
	Inject,
	Injectable,
	InternalServerErrorException,
	NotFoundException,
	UnauthorizedException
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { verify } from 'argon2';
import { Request, Response } from 'express';

import { LoginDto } from '@/auth/dto/login.dto';
import { RegisterDto } from '@/auth/dto/register.dto';
import { EmailConfirmationService } from '@/auth/email-confirmation/email-confirmation.service';
import { TwoFactorAuthService } from '@/auth/two-factor-auth/two-factor-auth.service';
import { UserService } from '@/user/user.service';

import { User } from '../../generated/prisma';

@Injectable()
export class AuthService {
	public constructor(
		private readonly userService: UserService,
		private readonly configService: ConfigService,
		@Inject(forwardRef(() => EmailConfirmationService))
		private readonly emailConfirmationService: EmailConfirmationService,
		private readonly twoFactorAuthService: TwoFactorAuthService
	) {}

	register = async (_req: Request, dto: RegisterDto) => {
		const isExists = await this.userService.findByEmail(dto.email);

		if (isExists) {
			throw new ConflictException(
				'Регистрация не удалась. Пользователь с таким email уже существует. Пожалуйста, используйте другой email или войдите в систему.'
			);
		}

		const newUser = await this.userService.create(
			dto.email,
			dto.password,
			dto.name,
			dto.phone,
			'',
			'',
			false
		);
		await this.emailConfirmationService.sendVerificationToken(newUser.email);

		return {
			message:
				'Вы успешно зарегистрировались. Пожалуйста, подтвердите ваш email. Сообщение было отправлено на ваш почтовый адрес.'
		};
	};

	login = async (req: Request, dto: LoginDto) => {
		const user = await this.userService.findByEmail(dto.email);

		if (!user || !user.password) {
			throw new NotFoundException(
				'Пользователь не найден. Пожалуйста, проверьте введенные данные'
			);
		}

		const isValidPassword = await verify(user.password, dto.password);

		if (!isValidPassword) {
			throw new UnauthorizedException(
				'Неверный пароль. Пожалуйста, попробуйте еще раз или восстановите пароль, если забыли его.'
			);
		}

		if (!user.isVerified) {
			await this.emailConfirmationService.sendVerificationToken(user.email);
			throw new UnauthorizedException(
				'Ваш email не подтвержден. Пожалуйста, проверьте вашу почту и подтвердите адрес.'
			);
		}

		if (user.isTwoFactorEnabled) {
			if (!dto.code) {
				await this.twoFactorAuthService.sendTwoFactorToken(user.email);

				return {
					message:
						'Проверьте вашу почту. Требуется код двухфакторной аутентификации.'
				};
			}

			await this.twoFactorAuthService.validateTwoFactorToken(
				user.email,
				dto.code
			);
		}

		return this.saveSession(req, user);
	};

	logout = async (req: Request, res: Response): Promise<void> => {
		return new Promise((resolve, reject) => {
			req.session.destroy(err => {
				if (err) {
					return reject(
						new InternalServerErrorException(
							'Не удалось завершить сессию. Возможно, возникла проблема с сервером или сессия уже была завершена.'
						)
					);
				}

				res.clearCookie(this.configService.getOrThrow<string>('SESSION_NAME'));
				resolve();
			});
		});
	};

	saveSession = async (req: Request, user: User) => {
		return new Promise((resolve, reject) => {
			req.session.userId = user.id;
			req.session.role = user.role;

			// delete user.password;

			req.session.save(err => {
				if (err) {
					return reject(
						new InternalServerErrorException(
							'Не удалось сохранить сессию. Проверьте, правильно ли настроены параметры сессии.'
						)
					);
				}

				resolve({
					user
				});
			});
		});
	};
}
