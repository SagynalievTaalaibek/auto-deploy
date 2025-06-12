import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Patch,
	Post
} from '@nestjs/common';

import { Authorization } from '@/auth/decorators/auth.decorator';
import { Authorized } from '@/auth/decorators/authorized.decorator';
import { AssignRoleDto } from '@/user/dto/assign-role.dto';
import { UpdateUserDto } from '@/user/dto/update-user.dto';

import { UserRole } from '../../generated/prisma';

import { UserService } from './user.service';

@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Authorization(UserRole.ADMIN)
	@Post('/admin/assign-role')
	public async assignRole(@Body() dto: AssignRoleDto) {
		return this.userService.assignRole(dto);
	}

	@Authorization(UserRole.ADMIN)
	@HttpCode(HttpStatus.OK)
	@Get()
	public async findAll() {
		return this.userService.findAll();
	}

	@Authorization()
	@HttpCode(HttpStatus.OK)
	@Get('profile')
	public async findProfile(@Authorized('id') userId: string) {
		return this.userService.findById(userId);
	}

	@Authorization()
	@HttpCode(HttpStatus.OK)
	@Patch('profile')
	public async updateProfile(
		@Authorized('id') userId: string,
		@Body() dto: UpdateUserDto
	) {
		return this.userService.update(userId, dto);
	}

	@Authorization(UserRole.ADMIN)
	@HttpCode(HttpStatus.OK)
	@Get('master')
	public async findMasters() {
		return this.userService.findMasters();
	}

	@Authorization(UserRole.ADMIN)
	@HttpCode(HttpStatus.OK)
	@Get('users')
	public async findUsers() {
		return this.userService.findUsers();
	}

	@Authorization(UserRole.ADMIN)
	@HttpCode(HttpStatus.OK)
	@Get('by-id/:id')
	public async findById(@Param('id') id: string) {
		return this.userService.findById(id);
	}

	@Authorization()
	@Get('session')
	async getSession(@Authorized('id') userId: string) {
		const user = await this.userService.findById(userId);
		return { userId: user.id, role: user.role };
	}
}
