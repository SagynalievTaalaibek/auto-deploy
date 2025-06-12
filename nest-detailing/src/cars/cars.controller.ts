import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';

import { Authorization } from '@/auth/decorators/auth.decorator';

import { CarsService } from './cars.service';

@Controller('cars')
export class CarsController {
	constructor(private readonly carsService: CarsService) {}

	@Authorization()
	@HttpCode(HttpStatus.OK)
	@Get()
	async findAllCars() {
		return this.carsService.findAllCars();
	}

	@Authorization()
	@HttpCode(HttpStatus.OK)
	@Get('/body-type')
	async findAllCarsBodyType() {
		return this.carsService.findAllCarsBodyType();
	}
}
