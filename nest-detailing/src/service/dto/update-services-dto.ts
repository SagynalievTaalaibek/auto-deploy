import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateServicesDto {
	@IsOptional()
	@IsString()
	name?: string;

	@IsOptional()
	@IsUUID()
	categoryId?: string;

	@IsOptional()
	@IsString()
	description?: string;

	@IsOptional()
	@IsNumber()
	basePriceMin?: number;

	@IsOptional()
	@IsNumber()
	basePriceMax?: number;
}
