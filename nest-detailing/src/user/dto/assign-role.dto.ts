import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';

import { UserRole } from '../../../generated/prisma';

export class AssignRoleDto {
	@IsEmail()
	email: string;

	@IsEnum(UserRole)
	role: UserRole;

	@IsOptional()
	@IsString()
	specialization?: string;
}
