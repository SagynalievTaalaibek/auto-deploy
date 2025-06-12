import {
	IsArray,
	IsDateString,
	IsEnum,
	IsOptional,
	IsString,
	IsUUID
} from 'class-validator';

import { OrderStatus } from '../../../generated/prisma';

export class CreateOrderCRMDto {
	@IsUUID() userId: string;
	@IsUUID() modelCarId: string;
	@IsUUID() bodyTypeId: string;

	@IsString() carYear: string;
	@IsString() carColor: string;

	@IsEnum(OrderStatus) @IsOptional() status?: OrderStatus;

	@IsDateString() @IsOptional() startTime?: Date;
	@IsDateString() @IsOptional() endTime?: Date;

	@IsOptional() totalPrice?: number;
	@IsOptional() notes?: string;

	@IsUUID() @IsOptional() masterId?: string;
	@IsArray() @IsOptional() photos?: string[];

	@IsArray() orderCategoryIds: string[];
	@IsArray() orderServiceIds: string[];
}
