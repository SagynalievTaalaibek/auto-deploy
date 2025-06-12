import { Module } from '@nestjs/common';

import { UserService } from '@/user/user.service';

import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';

@Module({
	controllers: [ContactController],
	providers: [ContactService, UserService],
	exports: [ContactService]
})
export class ContactModule {}
