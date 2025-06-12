// types/order.ts
import type { TypeOrderCRMSchema, TypeOrderProfileSchema } from '../schemas';

export type OrderStatus =
	| 'NEW'
	| 'CONFIRMED'
	| 'IN_PROGRESS'
	| 'COMPLETED'
	| 'PAID'
	| 'CLOSED'
	| 'CANCELLED'
	| 'RESCHEDULED';

export interface OrderCategory {
	id: string;
	orderId: string;
	categoryId: string;
	category: {
		id: string;
		name: string;
	};
}

export interface OrderService {
	id: string;
	orderId: string;
	serviceId: string;
	service: {
		id: string;
		name: string;
		basePriceMin: number;
		basePriceMax: number;
		categoryId: string;
	};
}

export interface IOrder {
	id: string;
	userId: string;
	modelCar: {
		id: string;
		name: string;
		brand: {
			id: string;
			name: string;
			coefficient: number;
		};
	};
	bodyType: {
		id: string;
		name: string;
		coefficient: number;
	};
	carYear: string;
	carColor: string;
	status: OrderStatus;
	startTime: string; // ISO формат
	endTime: string | null;
	totalPrice: number | null;
	notes: string;
	photos: string[];
	createdAt: string;
	user: {
		id: string;
		name: string;
		email: string;
		phone: string;
	};
	master: {
		id: string;
		name: string;
	};
	orderCategories: OrderCategory[];
	orderServices: OrderService[];
}

export interface OrderGetCRM {
	id: string;

	modelCar: {
		name: string;
		brand: {
			name: string;
		};
	};
	carYear: string;
	carColor: string;
	status: OrderStatus;

	user: {
		name: string;
		email: string;
		phone: string;
	};

	createdAt: string;
}

export interface OrderGetProfile {
	id: string;

	modelCar: {
		name: string;
	};
	status: OrderStatus;

	orderCategories: {
		category: {
			name: string;
		};
	}[];

	createdAt: string;
}

export type UnifiedOrderSchema = TypeOrderProfileSchema &
	Partial<TypeOrderCRMSchema>;
