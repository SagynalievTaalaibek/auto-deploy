import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Button, Divider, TextField } from '@mui/material';
import Box from '@mui/material/Box';

import DashboardBreadcrumbs from '../../../../../components/ui/dashboard-breadcrumbs.tsx';
import { LoadingScreen } from '../../../../../components/ui/loading-screen/loading-screen.tsx';
import {
	selectLoadingServices,
	selectOneMainServices,
} from '../../../../../features/services/services.slice.ts';
import {
	fetchOneMainServices,
	updateMainService,
} from '../../../../../features/services/services.thunks.ts';
import { ROUTES } from '../../../../../shared/constants/constants.ts';
import {
	useAppDispatch,
	useAppSelector,
} from '../../../../../shared/hooks/hooksStore.ts';
import { useAppSnackbar } from '../../../../../shared/hooks/useAppSnackbar.tsx';
import {
	ServiceMainEditSchema,
	type TypeServiceMainEditSchema,
} from '../../../../../shared/schemas/service.main.edit.schema.ts';

export const DashboardServicesMainEdit = () => {
	const dispatch = useAppDispatch();
	const oneMainService = useAppSelector(selectOneMainServices);
	const navigate = useNavigate();

	const { showSnackbar } = useAppSnackbar();

	const { id } = useParams<{ id: string }>();

	const loading = useAppSelector(selectLoadingServices);

	const [formData, setFormData] = useState<TypeServiceMainEditSchema>({
		name: '',
		description: '',
		img: '',
	});
	const [errors, setErrors] = useState<Record<string, string>>({});

	useEffect(() => {
		if (id) {
			dispatch(fetchOneMainServices(id));
		}
	}, [dispatch, id]);

	useEffect(() => {
		if (oneMainService) {
			setFormData({
				name: oneMainService.name,
				description: oneMainService.description,
				img: oneMainService.img,
			});
		}
	}, [oneMainService]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async () => {
		const result = ServiceMainEditSchema.safeParse(formData);

		if (!result.success) {
			const fieldErrors: Partial<
				Record<keyof TypeServiceMainEditSchema, string>
			> = {};
			result.error.errors.forEach(err => {
				const field = err.path[0] as keyof TypeServiceMainEditSchema;
				fieldErrors[field] = err.message;
			});
			setErrors(fieldErrors);
			console.log('Ошибка валидации:', fieldErrors);
			return;
		}

		if (id) {
			dispatch(updateMainService({ data: formData, id: id }));
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
					{ label: 'Редактирования главной услуги' },
				]}
			/>

			<Divider />
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					gap: 2,
					maxWidth: 800,
					mt: 2,
				}}
			>
				<TextField
					label="Название"
					name="name"
					value={formData.name}
					onChange={handleChange}
					error={!!errors.name}
					helperText={errors.name}
				/>
				<TextField
					label="Описание"
					name="description"
					multiline
					rows={5}
					value={formData.description}
					onChange={handleChange}
					error={!!errors.description}
					helperText={errors.description}
				/>
				<TextField
					label="Ссылка на изображение"
					name="img"
					value={formData.img}
					onChange={handleChange}
					error={!!errors.img}
					helperText={errors.img}
				/>
				<Button variant="contained" onClick={handleSubmit} disabled={loading}>
					Сохранить
				</Button>
			</Box>
		</Box>
	);
};
