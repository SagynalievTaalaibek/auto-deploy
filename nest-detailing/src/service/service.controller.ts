import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Post,
	Put
} from '@nestjs/common';

import { Authorization } from '@/auth/decorators/auth.decorator';
import { CreateMainServiceDto } from '@/service/dto/create-main-service.dto';
import { CreateServicesDto } from '@/service/dto/create-services.dto';
import { UpdateMainServiceDto } from '@/service/dto/update-main-service-dto';
import { UpdateServicesDto } from '@/service/dto/update-services-dto';

import { UserRole } from '../../generated/prisma';

import { ServiceService } from './service.service';

@Controller('services')
export class ServiceController {
	constructor(private readonly serviceService: ServiceService) {}
	@Authorization(UserRole.ADMIN)
	@HttpCode(HttpStatus.OK)
	@Post('main-service')
	async createMainService(@Body() dto: CreateMainServiceDto) {
		return this.serviceService.createMainService(dto);
	}

	@Authorization(UserRole.ADMIN)
	@HttpCode(HttpStatus.OK)
	@Post()
	async createServices(@Body() dto: CreateServicesDto) {
		return this.serviceService.createServices(dto);
	}

	@HttpCode(HttpStatus.OK)
	@Get('main-services')
	async getMainService() {
		return this.serviceService.getMainService();
	}

	@HttpCode(HttpStatus.OK)
	@Get(':id')
	public async findOne(@Param('id') id: string) {
		return this.serviceService.getOne(id);
	}

	@HttpCode(HttpStatus.OK)
	@Get('service/:id')
	public async findOneService(@Param('id') id: string) {
		return this.serviceService.getOneService(id);
	}

	@Authorization(UserRole.ADMIN, UserRole.ADMIN)
	@HttpCode(HttpStatus.OK)
	@Put('main-service/:id')
	async updateMainService(
		@Param('id') id: string,
		@Body() dto: UpdateMainServiceDto
	) {
		return this.serviceService.updateMainService(id, dto);
	}

	@Authorization(UserRole.ADMIN, UserRole.ADMIN)
	@HttpCode(HttpStatus.OK)
	@Put(':id')
	async updateService(@Param('id') id: string, @Body() dto: UpdateServicesDto) {
		return this.serviceService.updateService(id, dto);
	}

	@Authorization(UserRole.ADMIN)
	@HttpCode(HttpStatus.OK)
	@Delete(':id')
	async deleteService(@Param('id') id: string) {
		await this.serviceService.deleteService(id);
	}
}
