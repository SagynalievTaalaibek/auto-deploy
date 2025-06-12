import { Module } from '@nestjs/common';

import { UserService } from '@/user/user.service';

import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';

@Module({
	controllers: [CarsController],
	providers: [CarsService, UserService],
	exports: [CarsService]
})
export class CarsModule {}
