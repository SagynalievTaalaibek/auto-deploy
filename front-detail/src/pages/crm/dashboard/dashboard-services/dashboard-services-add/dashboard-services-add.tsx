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
	Typography,
} from '@mui/material';

import DashboardBreadcrumbs from '../../../../../components/ui/dashboard-breadcrumbs.tsx';
import { selectMainServices } from '../../../../../features/services/services.slice.ts';
import {
	createMainService,
	fetchMainServices,
} from '../../../../../features/services/services.thunks.ts';
import { ROUTES } from '../../../../../shared/constants/constants.ts';
import {
	useAppDispatch,
	useAppSelector,
} from '../../../../../shared/hooks/hooksStore.ts';
import {
	ServiceAddSchema,
	type TypeServiceAddSchema,
} from '../../../../../shared/schemas/service.add.schema.ts';

export const DashboardServicesAdd = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const mainService = useAppSelector(selectMainServices);

	const [formData, setFormData] = useState<TypeServiceAddSchema>({
		name: '',
		description: '',
		categoryId: '',
		basePriceMin: 0,
		basePriceMax: 0,
	});

	useEffect(() => {
		dispatch(fetchMainServices());
	}, [dispatch]);

	const [errors, setErrors] = useState<
		Partial<Record<keyof TypeServiceAddSchema, string>>
	>({});

	const handleChange = (
		field: keyof TypeServiceAddSchema,
		value: string | number,
	) => {
		setFormData(prev => ({
			...prev,
			[field]: value,
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const parsed = ServiceAddSchema.safeParse(formData);

		if (!parsed.success) {
			const fieldErrors: Partial<Record<keyof TypeServiceAddSchema, string>> =
				{};
			parsed.error.errors.forEach(err => {
				const field = err.path[0] as keyof TypeServiceAddSchema;
				fieldErrors[field] = err.message;
			});
			setErrors(fieldErrors);
			return;
		}

		setErrors({});
		dispatch(createMainService(formData));
		navigate(ROUTES.DASHBOARD_SERVICES);
	};

	return (
		<Box>
			<DashboardBreadcrumbs
				items={[
					{ label: 'Панель управления', href: ROUTES.DASHBOARD },
					{ label: 'Услуги', href: ROUTES.DASHBOARD_SERVICES },
					{ label: 'Добавить услугу' },
				]}
			/>

			<Divider />
			<Box
				component="form"
				onSubmit={handleSubmit}
				sx={{
					display: 'flex',
					flexDirection: 'column',
					gap: 2,
					maxWidth: 600,
					p: 4,
				}}
			>
				<Typography variant="h5">Добавить услугу</Typography>

				<FormControl fullWidth error={!!errors.categoryId}>
					<InputLabel>Категория</InputLabel>
					<Select
						value={formData.categoryId}
						label="Категория"
						onChange={(e: SelectChangeEvent<string>) =>
							handleChange('categoryId', e.target.value)
						}
					>
						{mainService.map(category => (
							<MenuItem key={category.id} value={category.id}>
								{category.name}
							</MenuItem>
						))}
					</Select>
					<FormHelperText>{errors.categoryId}</FormHelperText>
				</FormControl>

				<TextField
					label="Название"
					value={formData.name}
					onChange={e => handleChange('name', e.target.value)}
					error={!!errors.name}
					helperText={errors.name}
				/>

				<TextField
					label="Описание"
					value={formData.description}
					onChange={e => handleChange('description', e.target.value)}
					error={!!errors.description}
					helperText={errors.description}
					multiline
					minRows={3}
				/>

				<TextField
					label="Минимальная цена"
					type="number"
					value={formData.basePriceMin}
					onChange={e => handleChange('basePriceMin', Number(e.target.value))}
					error={!!errors.basePriceMin}
					helperText={errors.basePriceMin}
				/>

				<TextField
					label="Максимальная цена"
					type="number"
					value={formData.basePriceMax}
					onChange={e => handleChange('basePriceMax', Number(e.target.value))}
					error={!!errors.basePriceMax}
					helperText={errors.basePriceMax}
				/>

				<Button type="submit" variant="contained">
					Сохранить
				</Button>
			</Box>
		</Box>
	);
};
