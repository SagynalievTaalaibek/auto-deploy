import {
	Body,
	Controller,
	HttpCode,
	HttpStatus,
	Post,
	Req,
	Res
} from '@nestjs/common';
import { Request, Response } from 'express';

import { LoginDto } from '@/auth/dto/login.dto';
import { RegisterDto } from '@/auth/dto/register.dto';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
	public constructor(private readonly authService: AuthService) {}

	@Post('register')
	@HttpCode(HttpStatus.OK)
	async register(@Req() req: Request, @Body() registerDto: RegisterDto) {
		return this.authService.register(req, registerDto);
	}

	@Post('login')
	@HttpCode(HttpStatus.OK)
	async login(@Req() req: Request, @Body() loginDto: LoginDto) {
		return this.authService.login(req, loginDto);
	}

	@Post('logout')
	@HttpCode(HttpStatus.OK)
	async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
		return this.authService.logout(req, res);
	}
}
