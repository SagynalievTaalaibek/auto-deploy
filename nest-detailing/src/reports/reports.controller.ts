import { Body, Controller, Post } from '@nestjs/common';

import { ReportTypeDto } from '@/reports/dto/report-type.dto';

import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
	constructor(private readonly reportsService: ReportsService) {}

	@Post()
	async getReport(@Body() dto: ReportTypeDto) {
		return this.reportsService.getReport(dto);
	}
}
