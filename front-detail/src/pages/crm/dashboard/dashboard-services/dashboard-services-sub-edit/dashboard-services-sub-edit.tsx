import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
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
import Box from '@mui/material/Box';

import DashboardBreadcrumbs from '../../../../../components/ui/dashboard-breadcrumbs.tsx';
import { LoadingScreen } from '../../../../../components/ui/loading-screen/loading-screen.tsx';
import {
	selectLoadingServices,
	selectMainServices,
	selectOneServices,
} from '../../../../../features/services/services.slice.ts';
import {
	fetchMainServices,
	fetchOneServices,
	updateService,
} from '../../../../../features/services/services.thunks.ts';
import { ROUTES } from '../../../../../shared/constants/constants.ts';
import {
	useAppDispatch,
	useAppSelector,
} from '../../../../../shared/hooks/hooksStore.ts';
import { useAppSnackbar } from '../../../../../shared/hooks/useAppSnackbar.tsx';
import {
	ServiceServiceEditSchema,
	type TypeServiceServiceEditSchema,
} from '../../../../../shared/schemas/service.service.edit.schema.ts';

export const DashboardServicesSubEdit = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const oneService = useAppSelector(selectOneServices);
	const mainService = useAppSelector(selectMainServices);

	const { showSnackbar } = useAppSnackbar();

	const { id } = useParams<{ id: string }>();

	const loading = useAppSelector(selectLoadingServices);

	const [formData, setFormData] = useState<TypeServiceServiceEditSchema>({
		name: '',
		description: '',
		categoryId: '',
		basePriceMin: 0,
		basePriceMax: 0,
	});
	const [errors, setErrors] = useState<Record<string, string>>({});

	useEffect(() => {
		dispatch(fetchMainServices());
	}, [dispatch]);

	useEffect(() => {
		if (id) {
			dispatch(fetchOneServices(id));
		}
	}, [dispatch, id]);

	useEffect(() => {
		if (oneService) {
			setFormData({
				name: oneService.name,
				description: oneService.description,
				categoryId: oneService.categoryId,
				basePriceMax: oneService.basePriceMax,
				basePriceMin: oneService.basePriceMin,
			});
		}
	}, [oneService]);

	const handleChange = (
		field: keyof TypeServiceServiceEditSchema,
		value: string | number,
	) => {
		setFormData(prev => ({
			...prev,
			[field]: value,
		}));
	};

	const handleSubmit = async () => {
		const result = ServiceServiceEditSchema.safeParse(formData);

		if (!result.success) {
			const fieldErrors: Partial<
				Record<keyof TypeServiceServiceEditSchema, string>
			> = {};
			result.error.errors.forEach(err => {
				const field = err.path[0] as keyof TypeServiceServiceEditSchema;
				fieldErrors[field] = err.message;
			});
			setErrors(fieldErrors);
			console.log('Ошибка валидации:', fieldErrors);
			return;
		}

		if (id) {
			dispatch(updateService({ data: formData, id: id }));
			showSnackbar('Услуга обновлена', 'success');
			navigate(ROUTES.DASHBOARD_SERVICES);
		}
	};

	if (loading) {
		return (
			<Box p={4}>
				<LoadingScreen />
			</Box>
		);
	}

	return (
		<Box p={4}>
			<DashboardBreadcrumbs
				items={[
					{ label: 'Панель управления', href: ROUTES.DASHBOARD },
					{ label: 'Услуги', href: ROUTES.DASHBOARD_SERVICES },
					{ label: 'Редактирования услуги' },
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
					mt: 2,
				}}
			>
				<Typography variant="h5">Редактировать услугу</Typography>

				<FormControl fullWidth error={!!errors.categoryId}>
					<InputLabel>Категория</InputLabel>
					<Select
						value={formData.categoryId}
						label="Категория"
						onChange={(e: SelectChangeEvent) =>
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
