import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
	Box,
	Button,
	Divider,
	FormControl,
	FormHelperText,
	InputLabel,
	MenuItem,
	Select,
	type SelectChangeEvent,
	TextField,
} from '@mui/material';
import Typography from '@mui/material/Typography';

import DashboardBreadcrumbs from '../../../../../components/ui/dashboard-breadcrumbs.tsx';
import { createInventory } from '../../../../../features/inventory/inventory.thunks.ts';
import { selectMainServices } from '../../../../../features/services/services.slice.ts';
import { fetchMainServices } from '../../../../../features/services/services.thunks.ts';
import { ROUTES } from '../../../../../shared/constants/constants.ts';
import {
	useAppDispatch,
	useAppSelector,
} from '../../../../../shared/hooks/hooksStore.ts';
import { useAppSnackbar } from '../../../../../shared/hooks/useAppSnackbar.tsx';
import {
	InventoryCreateSchema,
	type TypeInventoryCreateSchema,
} from '../../../../../shared/schemas/inventory.create.schema.ts';

export const InventoryAdd = () => {
	const dispatch = useAppDispatch();

	const navigate = useNavigate();
	const { showSnackbar } = useAppSnackbar();

	const mainService = useAppSelector(selectMainServices);

	const [form, setForm] = useState<TypeInventoryCreateSchema>({
		name: '',
		category: '',
		quantity: 0,
		minStockLevel: 0,
		purchasePrice: 0,
	});

	useEffect(() => {
		dispatch(fetchMainServices());
	}, [dispatch]);

	const [errors, setErrors] = useState<
		Partial<Record<keyof TypeInventoryCreateSchema, string>>
	>({});

	const handleChange = (
		field: keyof TypeInventoryCreateSchema,
		value: string | number,
	) => {
		setForm(prev => ({
			...prev,
			[field]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const result = InventoryCreateSchema.safeParse(form);

		if (!result.success) {
			const fieldErrors: Partial<
				Record<keyof TypeInventoryCreateSchema, string>
			> = {};
			result.error.errors.forEach(err => {
				const field = err.path[0] as keyof TypeInventoryCreateSchema;
				fieldErrors[field] = err.message;
			});
			setErrors(fieldErrors);
		} else {
			setErrors({});

			const response = await dispatch(createInventory(result.data));

			if (response.payload) {
				showSnackbar(response.payload.message, 'success');
				navigate(ROUTES.DASHBOARD_INVENTORY);
			}

			console.log('✅ Валидные данные:', result.data);
		}
	};

	return (
		<Box>
			<DashboardBreadcrumbs
				items={[
					{ label: 'Панель управления', href: ROUTES.DASHBOARD },
					{ label: 'Склад', href: ROUTES.DASHBOARD_INVENTORY },
					{ label: 'Создание материала' },
				]}
			/>
			<Divider sx={{ my: 2 }} />
			<Typography variant="h5" mb={2}>
				Создание материала
			</Typography>
			<Box
				component="form"
				onSubmit={handleSubmit}
				sx={{ display: 'grid', gap: 2, maxWidth: 800 }}
			>
				<TextField
					label="Название"
					name="name"
					value={form.name}
					onChange={e => handleChange('name', e.target.value)}
					error={!!errors.name}
					helperText={errors.name}
				/>

				<FormControl fullWidth error={!!errors.category}>
					<InputLabel>Категория</InputLabel>
					<Select
						value={form.category}
						label="Категория"
						onChange={(e: SelectChangeEvent<string>) =>
							handleChange('category', e.target.value)
						}
					>
						{mainService.map(category => (
							<MenuItem key={category.id} value={category.name}>
								{category.name}
							</MenuItem>
						))}
					</Select>
					<FormHelperText>{errors.category}</FormHelperText>
				</FormControl>

				<TextField
					label="Количество"
					name="quantity"
					type="number"
					value={form.quantity}
					onChange={e => handleChange('quantity', e.target.value)}
					error={!!errors.quantity}
					helperText={errors.quantity}
				/>
				<TextField
					label="Мин. уровень запаса"
					name="minStockLevel"
					type="number"
					value={form.minStockLevel}
					onChange={e => handleChange('minStockLevel', e.target.value)}
					error={!!errors.minStockLevel}
					helperText={errors.minStockLevel}
				/>
				<TextField
					label="Цена закупки"
					name="purchasePrice"
					type="number"
					value={form.purchasePrice}
					onChange={e => handleChange('purchasePrice', e.target.value)}
					error={!!errors.purchasePrice}
					helperText={errors.purchasePrice}
				/>
				<Button type="submit" variant="contained">
					Добавить
				</Button>
			</Box>
		</Box>
	);
};
