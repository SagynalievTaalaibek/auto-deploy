import { Module } from '@nestjs/common';

import { UserService } from '@/user/user.service';

import { ServiceController } from './service.controller';
import { ServiceService } from './service.service';

@Module({
	controllers: [ServiceController],
	providers: [ServiceService, UserService],
	exports: [ServiceService]
})
export class ServiceModule {}
