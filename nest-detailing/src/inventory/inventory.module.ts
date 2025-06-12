import { Module } from '@nestjs/common';

import { UserService } from '@/user/user.service';

import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';

@Module({
	controllers: [InventoryController],
	providers: [InventoryService, UserService],
	exports: [InventoryService]
})
export class InventoryModule {}
