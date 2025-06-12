import { IsString } from 'class-validator';

export class CreateMainServiceDto {
	@IsString()
	name: string;

	@IsString()
	description: string;

	@IsString()
	img: string;
}
