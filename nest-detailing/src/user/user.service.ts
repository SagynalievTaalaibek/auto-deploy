import { Injectable, NotFoundException } from '@nestjs/common';
import { hash } from 'argon2';

import { PrismaService } from '@/prisma/prisma.service';
import { AssignRoleDto } from '@/user/dto/assign-role.dto';
import { UpdateUserDto } from '@/user/dto/update-user.dto';

@Injectable()
export class UserService {
	public constructor(private readonly prismaService: PrismaService) {}

	public async findMasters() {
		return this.prismaService.user.findMany({
			where: { role: 'MASTER' },
			select: {
				id: true,
				name: true,
				specialization: true
			}
		});
	}

	public async findUsers() {
		return this.prismaService.user.findMany({
			select: {
				id: true,
				email: true
			}
		});
	}

	public async findById(id: string) {
		const user = await this.prismaService.user.findUnique({
			where: {
				id
			}
		});

		if (!user) {
			throw new NotFoundException(
				'User not found. Please check the entered data.'
			);
		}

		return user;
	}

	public async findByEmail(email: string) {
		return this.prismaService.user.findUnique({
			where: {
				email
			}
		});
	}

	public async create(
		email: string,
		password: string,
		name: string,
		phone: string,
		avatarUrl: string,
		specialization: string,
		isVerified: boolean
	) {
		return this.prismaService.user.create({
			data: {
				email,
				password: password ? await hash(password) : '',
				name,
				phone,
				avatarUrl,
				specialization,
				isVerified
			}
		});
	}

	public async update(userId: string, dto: UpdateUserDto) {
		const user = await this.findById(userId);

		return this.prismaService.user.update({
			where: {
				id: user.id
			},
			data: {
				email: dto.email,
				name: dto.name,
				isTwoFactorEnabled: dto.isTwoFactorEnabled
			}
		});
	}

	public async findAll() {
		return this.prismaService.user.findMany({
			select: {
				id: true,
				name: true,
				email: true,
				phone: true,
				role: true,
				specialization: true
			}
		});
	}

	public async assignRole(dto: AssignRoleDto) {
		const user = await this.findByEmail(dto.email);
		if (!user) {
			throw new NotFoundException('Пользователь с таким email не найден');
		}

		return this.prismaService.user.update({
			where: { id: user.id },
			data: {
				role: dto.role,
				specialization: dto.role === 'MASTER' ? dto.specialization : null
			},
			select: {
				id: true,
				email: true,
				role: true,
				specialization: true
			}
		});
	}
}
