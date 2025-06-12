import { IsDateString, IsString } from 'class-validator';

export class ReportTypeDto {
	@IsString()
	reportType: 'orders' | 'finance' | 'warehouse' | 'staff';

	@IsDateString()
	startDate: string;

	@IsDateString()
	endDate: string;
}
