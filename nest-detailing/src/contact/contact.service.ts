import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/prisma/prisma.service';

import { ContactInfo } from '../../generated/prisma';

@Injectable()
export class ContactService {
	constructor(private readonly prisma: PrismaService) {}

	async getContactInfo() {
		return this.prisma.contactInfo.findFirst();
	}

	async updateContactInfo(data: Partial<ContactInfo>) {
		const existing = await this.prisma.contactInfo.findFirst();
		if (!existing) {
			return this.prisma.contactInfo.create({ data: data as ContactInfo });
		}
		return this.prisma.contactInfo.update({
			where: { id: existing.id },
			data
		});
	}
}
