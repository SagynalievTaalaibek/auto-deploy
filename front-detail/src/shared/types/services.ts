export interface IService {
	id: string;
	name: string;
	description: string;
	basePriceMin: number;
	basePriceMax: number;
	categoryId: string;
}

export interface IMainService {
	id: string;
	name: string;
	img: string;
	description: string;
	services: IService[];
}
