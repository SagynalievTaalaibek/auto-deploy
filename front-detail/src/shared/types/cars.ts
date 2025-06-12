export interface ICarGet {
	id: string;
	name: string;
	coefficient: number;
	models: { id: string; name: string; brandId: string }[];
}

export interface ICarBodyType {
	id: string;
	name: string;
	coefficient: number;
}
