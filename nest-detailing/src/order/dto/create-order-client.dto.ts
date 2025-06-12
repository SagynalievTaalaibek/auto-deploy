import { IsArray, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateOrderClientDto {
	@IsUUID() modelCarId: string;
	@IsUUID() bodyTypeId: string;

	@IsString() carYear: string;
	@IsString() carColor: string;

	@IsOptional() notes?: string;

	@IsArray() orderCategoryIds: string[];
	@IsArray() orderServiceIds: string[];
}
