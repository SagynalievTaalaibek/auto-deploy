export interface InventoryGet {
	id: string;
	name: string;
	quantity: number;
	category: string;
	minStockLevel: number;
	purchasePrice: number;
	totalCost: number;
	createdAt: string;
	updatedAt: string;
}
