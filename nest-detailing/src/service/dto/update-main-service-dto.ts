import { IsOptional, IsString } from 'class-validator';

export class UpdateMainServiceDto {
	@IsOptional()
	@IsString()
	name?: string;

	@IsOptional()
	@IsString()
	description?: string;

	@IsOptional()
	@IsString()
	img?: string;
}
