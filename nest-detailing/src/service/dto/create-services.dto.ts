import { IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateServicesDto {
	@IsString()
	name: string;

	@IsUUID()
	categoryId: string;

	@IsString()
	description: string;

	@IsNumber()
	basePriceMin: number;

	@IsNumber()
	basePriceMax: number;
}
