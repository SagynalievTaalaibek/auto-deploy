import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Put
} from '@nestjs/common';

import { Authorization } from '@/auth/decorators/auth.decorator';

import { ContactInfo, UserRole } from '../../generated/prisma';

import { ContactService } from './contact.service';

@Controller('contact')
export class ContactController {
	constructor(private readonly contactService: ContactService) {}

	@Get()
	getContact() {
		return this.contactService.getContactInfo();
	}

	@Authorization(UserRole.ADMIN)
	@HttpCode(HttpStatus.OK)
	@Put()
	updateContact(@Body() data: Partial<ContactInfo>) {
		return this.contactService.updateContactInfo(data);
	}
}
