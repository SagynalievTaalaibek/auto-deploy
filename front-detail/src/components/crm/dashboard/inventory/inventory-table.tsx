import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	InputLabel,
	MenuItem,
	Paper,
	Select,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
	Tooltip,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';

import { selectInventoryData } from '../../../../features/inventory/inventory.slice.ts';
import {
	deductInventory,
	receiveInventory,
	updateInventory,
} from '../../../../features/inventory/inventory.thunks.ts';
import { selectMainServices } from '../../../../features/services/services.slice.ts';
import { fetchMainServices } from '../../../../features/services/services.thunks.ts';
import { ROUTES } from '../../../../shared/constants/constants.ts';
import {
	useAppDispatch,
	useAppSelector,
} from '../../../../shared/hooks/hooksStore.ts';
import { useAppSnackbar } from '../../../../shared/hooks/useAppSnackbar.tsx';

const categories = [
	'Все',
	'Тонирование стекол',
	'Оклейка полиуретаном',
	'Оклейка винилом',
	'Оклейка салона',
	'Ремонт салона',
	'Кузовной ремонт',
	'Полировка',
	'Химчистка',
];

interface InventoryItem {
	id: string;
	name: string;
	category: string;
	quantity: number;
	minStockLevel: number;
	purchasePrice: number;
	totalCost: number;
}

export function InventoryTable() {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { showSnackbar } = useAppSnackbar();

	const inventoryData = useAppSelector(selectInventoryData);
	const mainService = useAppSelector(selectMainServices);
	const [selectedCategory, setSelectedCategory] = useState('Все');

	const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
	const [modalType, setModalType] = useState<
		'edit' | 'deduct' | 'receive' | null
	>(null);
	const [formData, setFormData] = useState<Partial<InventoryItem>>({});

	const handleOpenModal = (item: InventoryItem, type: typeof modalType) => {
		setEditingItem(item);
		setModalType(type);

		if (type === 'edit') {
			setFormData({ name: item.name, category: item.category });
		}
		if (type === 'deduct') {
			setFormData({ quantity: 0 });
		}
		if (type === 'receive') {
			setFormData({ quantity: 0, purchasePrice: 0 });
		}
	};

	useEffect(() => {
		dispatch(fetchMainServices());
	}, [dispatch]);

	const handleCloseModal = () => {
		setEditingItem(null);
		setModalType(null);
		setFormData({});
	};

	const handleFormChange = (
		e:
			| React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
			| SelectChangeEvent<string>,
	) => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async () => {
		if (modalType === 'edit') {
			if (editingItem && editingItem.id && formData.name && formData.category) {
				const response = await dispatch(
					updateInventory({
						id: editingItem?.id,
						name: formData.name,
						category: formData.category,
					}),
				);

				if (response.payload) {
					showSnackbar(response.payload.message, 'success');
				}
			}
		}

		if (modalType === 'deduct') {
			if (editingItem && editingItem.id && formData.quantity) {
				const response = await dispatch(
					deductInventory({
						id: editingItem.id,
						quantity: formData.quantity,
					}),
				);

				if (response.payload) {
					showSnackbar(response.payload.message, 'success');
				}
			}
		}

		if (modalType === 'receive') {
			if (
				editingItem &&
				editingItem.id &&
				formData.quantity &&
				formData.purchasePrice
			) {
				const response = await dispatch(
					receiveInventory({
						id: editingItem.id,
						quantity: formData.quantity,
						purchasePrice: formData.purchasePrice,
					}),
				);

				if (response.payload) {
					showSnackbar(response.payload.message, 'success');
				}
			}
		}

		console.log(`🔧 ${modalType?.toUpperCase()} MATERIAL:`, {
			id: editingItem?.id,
			...formData,
		});
		handleCloseModal();
	};

	const filteredMaterials = useMemo(() => {
		if (selectedCategory === 'Все') return inventoryData;
		return inventoryData.filter(m => m.category === selectedCategory);
	}, [selectedCategory, inventoryData]);

	const handleCategoryChange = (event: SelectChangeEvent) => {
		setSelectedCategory(event.target.value);
	};

	return (
		<Box>
			<Box sx={{ py: 2 }}>
				<Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 3 }}>
					<Select
						value={selectedCategory}
						onChange={handleCategoryChange}
						size="small"
						sx={{ minWidth: 400 }}
					>
						{categories.map(cat => (
							<MenuItem key={cat} value={cat}>
								{cat}
							</MenuItem>
						))}
					</Select>

					<Button
						variant="contained"
						color="primary"
						onClick={() => navigate(ROUTES.DASHBOARD_INVENTORY_ADD)}
					>
						Добавить материал
					</Button>
				</Box>

				<TableContainer component={Paper} sx={{ boxShadow: 3 }}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>Название</TableCell>
								<TableCell>Категория</TableCell>
								<TableCell>Остаток</TableCell>
								<TableCell>Минимум</TableCell>
								<TableCell>Цена закупки</TableCell>
								<TableCell>Сумма</TableCell>
								<TableCell align="right">Действия</TableCell>
							</TableRow>
						</TableHead>

						<TableBody>
							{filteredMaterials.map(material => {
								const lowStock = material.quantity < material.minStockLevel;
								return (
									<TableRow
										key={material.id}
										sx={{
											bgcolor: lowStock ? 'rgba(255, 0, 0, 0.1)' : 'inherit',
										}}
									>
										<TableCell>{material.name}</TableCell>
										<TableCell>{material.category}</TableCell>
										<TableCell>
											{material.quantity}{' '}
											{lowStock && (
												<Tooltip title="Низкий остаток!">
													<WarningAmberIcon color="error" fontSize="small" />
												</Tooltip>
											)}
										</TableCell>
										<TableCell>{material.minStockLevel}</TableCell>
										<TableCell>{material.purchasePrice} сом</TableCell>
										<TableCell>{material.totalCost} сом</TableCell>
										<TableCell align="right">
											<Button
												size="small"
												variant="outlined"
												sx={{ mr: 1 }}
												onClick={() => handleOpenModal(material, 'edit')}
											>
												Редактировать
											</Button>
											<Button
												size="small"
												variant="outlined"
												color="error"
												sx={{ mr: 1 }}
												onClick={() => handleOpenModal(material, 'deduct')}
											>
												Списать
											</Button>
											<Button
												size="small"
												variant="contained"
												color="success"
												onClick={() => handleOpenModal(material, 'receive')}
											>
												Поступление
											</Button>
										</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</TableContainer>
			</Box>

			{/* МОДАЛЬНОЕ ОКНО */}
			<Dialog open={!!modalType} onClose={handleCloseModal}>
				<DialogTitle>
					{modalType === 'edit' && 'Редактировать материал'}
					{modalType === 'deduct' && 'Списание материала'}
					{modalType === 'receive' && 'Поступление материала'}
				</DialogTitle>
				<DialogContent
					sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}
				>
					{modalType === 'edit' && (
						<>
							<TextField
								label="Название"
								name="name"
								value={formData.name || ''}
								onChange={handleFormChange}
							/>
							<FormControl fullWidth>
								<InputLabel>Категория</InputLabel>
								<Select
									name="category"
									value={formData.category || ''}
									label="Категория"
									onChange={handleFormChange}
								>
									{mainService.map(category => (
										<MenuItem key={category.id} value={category.name}>
											{category.name}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</>
					)}

					{modalType === 'deduct' && (
						<TextField
							label="Количество для списания"
							name="quantity"
							type="number"
							value={formData.quantity || ''}
							onChange={handleFormChange}
						/>
					)}

					{modalType === 'receive' && (
						<>
							<TextField
								label="Количество"
								name="quantity"
								type="number"
								value={formData.quantity || ''}
								onChange={handleFormChange}
							/>
							<TextField
								label="Цена закупки"
								name="purchasePrice"
								type="number"
								value={formData.purchasePrice || ''}
								onChange={handleFormChange}
							/>
						</>
					)}
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseModal}>Отмена</Button>
					<Button onClick={handleSubmit} variant="contained">
						Сохранить
					</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
}
