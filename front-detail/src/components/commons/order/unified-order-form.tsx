import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
	Autocomplete,
	Box,
	Button,
	Checkbox,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	FormControl,
	FormHelperText,
	InputLabel,
	ListItemText,
	MenuItem,
	OutlinedInput,
	Select,
	TextField,
	Typography,
} from '@mui/material';

import {
	selectMastersCRM,
	selectUsersCRM,
} from '../../../features/auth/authSlice.ts';
import {
	fetchMastersCRM,
	fetchUsersCRM,
} from '../../../features/auth/authThunks.ts';
import {
	selectCars,
	selectCarsBodyType,
} from '../../../features/cars/cars.slice.ts';
import {
	fetchCars,
	fetchCarsBodyType,
} from '../../../features/cars/cars.thunks.ts';
import { selectOneOrderUpdate } from '../../../features/orders/orders.slice.ts';
import {
	createOrderCRM,
	createOrderClient,
	updateOrder,
} from '../../../features/orders/orders.thunks.ts';
import { selectMainServices } from '../../../features/services/services.slice.ts';
import { fetchMainServices } from '../../../features/services/services.thunks.ts';
import { ROUTES } from '../../../shared/constants/constants.ts';
import {
	useAppDispatch,
	useAppSelector,
} from '../../../shared/hooks/hooksStore.ts';
import { useAppSnackbar } from '../../../shared/hooks/useAppSnackbar.tsx';
import { OrderCRMSchema, OrderProfileSchema } from '../../../shared/schemas';
import type { UnifiedOrderSchema } from '../../../shared/types/orders.ts';
import NumberInputStyled from '../../ui/number-input-styled.tsx';

type Props = {
	mode: 'crm' | 'client';
	orderId?: string;
};

export function UnifiedOrderForm({ mode, orderId }: Props) {
	const isCRM = mode === 'crm';
	const isEditMode = isCRM && Boolean(orderId);

	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { showSnackbar } = useAppSnackbar();

	const carsData = useAppSelector(selectCars);
	const carsBodyTypeData = useAppSelector(selectCarsBodyType);
	const mainServices = useAppSelector(selectMainServices);
	const users = useAppSelector(selectUsersCRM);
	const masters = useAppSelector(selectMastersCRM);
	const orderUpdate = useAppSelector(selectOneOrderUpdate);

	useEffect(() => {
		const loadData = async () => {
			await dispatch(fetchCars());
			await dispatch(fetchCarsBodyType());
			await dispatch(fetchMainServices());
			if (isCRM) {
				await dispatch(fetchUsersCRM());
				await dispatch(fetchMastersCRM());
			}
		};
		void loadData();
	}, [dispatch, isCRM]);

	const [formData, setFormData] = useState<UnifiedOrderSchema>({
		modelCarId: '',
		bodyTypeId: '',
		carYear: 0,
		carColor: '',
		notes: '',
		orderCategoryIds: [],
		orderServiceIds: [],
		...(isCRM
			? {
					masterId: '',
					startTime: '',
					endTime: '',
					totalPrice: 0,
					photos: [],
					userId: '',
				}
			: {}),
	});

	const [brand, setBrand] = useState<string>('');
	const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({
		min: 0,
		max: 0,
	});
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [errors, setErrors] = useState<
		Partial<Record<keyof UnifiedOrderSchema, string>>
	>({});

	useEffect(() => {
		if (isEditMode && orderUpdate) {
			setFormData(orderUpdate);
			const car = carsData.find(c =>
				c.models.some(m => m.id === orderUpdate.modelCarId),
			);
			setBrand(car?.id || '');
		}
	}, [isEditMode, orderUpdate, carsData]);

	useEffect(() => {
		mockCalculatePriceRange();
	}, [
		formData.orderCategoryIds,
		formData.orderServiceIds,
		formData.bodyTypeId,
		brand,
	]);

	const mockCalculatePriceRange = () => {
		let totalMin = 0;
		let totalMax = 0;

		mainServices.forEach(category => {
			if (formData.orderCategoryIds.includes(category.id)) {
				category.services.forEach(service => {
					if (formData.orderServiceIds.includes(service.id)) {
						totalMin += service.basePriceMin;
						totalMax += service.basePriceMax;
					}
				});
			}
		});

		const bodyTypeCoefficient =
			carsBodyTypeData.find(item => item.id === formData.bodyTypeId)
				?.coefficient ?? 1;
		const carCoefficient =
			carsData.find(item => item.id === brand)?.coefficient ?? 1;

		const min = Math.round(totalMin * bodyTypeCoefficient * carCoefficient);
		const max = Math.round(totalMax * bodyTypeCoefficient * carCoefficient);

		setPriceRange({ min, max });
	};

	const handleChange = (
		key: keyof UnifiedOrderSchema,
		value: string | string[],
	) => {
		setFormData(prev => ({ ...prev, [key]: value }));
	};

	const handleSubmit = async () => {
		const schema = isCRM ? OrderCRMSchema : OrderProfileSchema;
		const result = schema.safeParse(formData);

		if (!result.success) {
			const fieldErrors: Partial<Record<keyof UnifiedOrderSchema, string>> = {};
			result.error.errors.forEach(err => {
				const field = err.path[0] as keyof UnifiedOrderSchema;
				fieldErrors[field] = err.message;
			});
			setErrors(fieldErrors);
			console.log('Ошибка валидации:', fieldErrors);
			return;
		}

		if (isCRM) {
			if (!isEditMode) {
				const response = await dispatch(createOrderCRM(result.data));
				if (response.payload) {
					showSnackbar(response.payload.message, 'success');
					navigate(ROUTES.DASHBOARD_ORDER);
				}
			} else {
				if (orderId) {
					const response = await dispatch(
						updateOrder({ data: result.data, id: orderId }),
					);
					if (response.payload) {
						showSnackbar('Заказ обновлен', 'success');
						navigate(ROUTES.DASHBOARD_ORDER);
					}
				}

				console.log(
					isEditMode ? 'Success EDIT' : 'Success CREATE',
					result.data,
				);
			}
		} else {
			setIsDialogOpen(true);
		}
	};

	const handleConfirmPrice = async () => {
		setIsDialogOpen(false);
		const response = await dispatch(createOrderClient(formData));
		if (response.payload) {
			showSnackbar(response.payload.message, 'success');
			navigate(ROUTES.PROFILE);
		}
	};

	const handleRejectPrice = () => {
		setIsDialogOpen(false);
		handleChange('orderCategoryIds', []);
		handleChange('orderServiceIds', []);
	};

	const models = carsData.find(car => car.id === brand)?.models || [];
	const services = mainServices
		.filter(category => formData.orderCategoryIds.includes(category.id))
		.flatMap(category => category.services);

	return (
		<Box>
			<Box>
				<Box>
					Примерная стоимость услуг:{' '}
					<strong>
						от {priceRange.min} до {priceRange.max} сом
					</strong>
				</Box>

				{isCRM && (
					<Autocomplete
						fullWidth
						options={users}
						getOptionLabel={option => option.email}
						value={users.find(user => user.id === formData.userId) || null}
						onChange={(_event, newValue) => {
							handleChange('userId', newValue ? newValue.id : '');
						}}
						renderInput={params => (
							<TextField
								{...params}
								label="Клиент"
								margin="normal"
								error={!!errors.userId}
								helperText={errors.userId}
							/>
						)}
					/>
				)}

				<TextField
					fullWidth
					label="Марка"
					margin="normal"
					value={brand}
					onChange={e => {
						setBrand(e.target.value);
						handleChange('modelCarId', '');
					}}
					error={!!errors.modelCarId}
					helperText={errors.modelCarId}
					select
				>
					<MenuItem value="">Выберите марку</MenuItem>
					{carsData.map(car => (
						<MenuItem key={car.id} value={car.id}>
							{car.name}
						</MenuItem>
					))}
				</TextField>

				<TextField
					fullWidth
					label="Модель"
					margin="normal"
					value={formData.modelCarId}
					onChange={e => handleChange('modelCarId', e.target.value)}
					error={!!errors.modelCarId}
					helperText={errors.modelCarId}
					select
					disabled={!brand}
				>
					<MenuItem value="">Выберите модель</MenuItem>
					{models.map(model => (
						<MenuItem key={model.id} value={model.id}>
							{model.name}
						</MenuItem>
					))}
				</TextField>

				<NumberInputStyled
					label="Год выпуска"
					value={formData.carYear}
					onChange={e => handleChange('carYear', e.target.value)}
					error={!!errors.carYear}
					helperText={errors.carYear}
					min={1980}
					max={new Date().getFullYear()}
				/>

				<TextField
					fullWidth
					label="Цвет"
					margin="normal"
					value={formData.carColor}
					placeholder="Черный"
					onChange={e => handleChange('carColor', e.target.value)}
					error={!!errors.carColor}
					helperText={errors.carColor}
				/>

				<TextField
					fullWidth
					label="Кузов"
					margin="normal"
					value={formData.bodyTypeId}
					onChange={e => handleChange('bodyTypeId', e.target.value)}
					error={!!errors.bodyTypeId}
					helperText={errors.bodyTypeId}
					select
					disabled={!brand}
				>
					<MenuItem value="">Выберите кузов</MenuItem>
					{carsBodyTypeData.map(model => (
						<MenuItem key={model.id} value={model.id}>
							{model.name}
						</MenuItem>
					))}
				</TextField>

				<FormControl
					fullWidth
					margin="normal"
					error={!!errors.orderCategoryIds}
				>
					<InputLabel>Категории</InputLabel>
					<Select
						multiple
						value={formData.orderCategoryIds}
						onChange={e => {
							const value = e.target.value as string[];
							if (value.length <= 2) {
								handleChange('orderCategoryIds', value);
								handleChange('orderServiceIds', []);
							}
						}}
						input={<OutlinedInput label="Категории" />}
						renderValue={selected =>
							mainServices
								.filter(cat => selected.includes(cat.id))
								.map(cat => cat.name)
								.join(', ')
						}
					>
						{mainServices.map(cat => (
							<MenuItem
								key={cat.id}
								value={cat.id}
								disabled={
									formData.orderCategoryIds.length >= 2 &&
									!formData.orderCategoryIds.includes(cat.id)
								}
							>
								<Checkbox
									checked={formData.orderCategoryIds.includes(cat.id)}
								/>
								<ListItemText primary={cat.name} />
							</MenuItem>
						))}
					</Select>
					<FormHelperText>{errors.orderCategoryIds}</FormHelperText>
				</FormControl>

				<FormControl fullWidth margin="normal" error={!!errors.orderServiceIds}>
					<InputLabel>Услуги</InputLabel>
					<Select
						multiple
						value={formData.orderServiceIds}
						onChange={e => handleChange('orderServiceIds', e.target.value)}
						input={<OutlinedInput label="Услуги" />}
						renderValue={selected =>
							services
								.filter(srv => selected.includes(srv.id))
								.map(srv => srv.name)
								.join(', ')
						}
					>
						{services.map(srv => (
							<MenuItem key={srv.id} value={srv.id}>
								<Checkbox checked={formData.orderServiceIds.includes(srv.id)} />
								<ListItemText primary={srv.name} />
							</MenuItem>
						))}
					</Select>
					<FormHelperText>{errors.orderServiceIds}</FormHelperText>
				</FormControl>

				{isCRM && (
					<>
						<FormControl fullWidth margin="normal" error={!!errors.masterId}>
							<InputLabel>Ответственный мастер</InputLabel>
							<Select
								value={formData.masterId}
								label="Ответственный мастер"
								onChange={e => handleChange('masterId', e.target.value)}
							>
								<MenuItem value="">Выберите мастера</MenuItem>
								{masters.map(master => (
									<MenuItem key={master.id} value={master.id}>
										{master.name} — {master.specialization}
									</MenuItem>
								))}
							</Select>
							<FormHelperText>{errors.masterId}</FormHelperText>
						</FormControl>

						<TextField
							fullWidth
							label="Дата и время начала"
							margin="normal"
							type="datetime-local"
							value={formData.startTime?.slice(0, 16) || ''}
							onChange={e => handleChange('startTime', e.target.value)}
							error={!!errors.startTime}
							helperText={errors.startTime}
						/>

						<TextField
							fullWidth
							label="Дата и время окончания"
							margin="normal"
							type="datetime-local"
							value={formData.endTime?.slice(0, 16) || ''}
							onChange={e => handleChange('endTime', e.target.value)}
							error={!!errors.endTime}
							helperText={errors.endTime}
						/>

						<NumberInputStyled
							label="Стоимость заказа"
							value={formData.totalPrice}
							onChange={e => handleChange('totalPrice', e.target.value)}
							error={!!errors.totalPrice}
							helperText={errors.totalPrice}
							min={2000}
						/>

						<Box mt={2}>
							<Typography variant="body1" mb={1}>
								Ссылки на фото автомобиля (можно вставить несколько через
								запятую)
							</Typography>
							<TextField
								fullWidth
								multiline
								rows={3}
								placeholder="https://drive.google.com/..., https://imgur.com/..."
								value={formData.photos?.join(', ') || ''}
								onChange={e => {
									const links = e.target.value
										.split(',')
										.map(link => link.trim())
										.filter(link => link !== '');
									handleChange('photos', links);
								}}
								error={!!errors.photos}
								helperText={errors.photos}
							/>
						</Box>
					</>
				)}

				<TextField
					fullWidth
					label="Заметки"
					multiline
					rows={3}
					margin="normal"
					value={formData.notes}
					onChange={e => handleChange('notes', e.target.value)}
					error={!!errors.notes}
					helperText={errors.notes}
				/>

				<Button
					variant="contained"
					fullWidth
					onClick={handleSubmit}
					sx={{ mt: 2 }}
				>
					{isEditMode ? 'Сохранить изменения' : 'Создать заказ'}
				</Button>
			</Box>

			{mode === 'client' && (
				<Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
					<DialogTitle>Подтверждение цены</DialogTitle>
					<DialogContent>
						<DialogContentText>
							Примерная стоимость услуг:{' '}
							<strong>
								от {priceRange.min} до {priceRange.max} сом
							</strong>
							.<br />
							Вы согласны с данной ценой?
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleRejectPrice}>Нет</Button>
						<Button onClick={handleConfirmPrice} variant="contained">
							Да
						</Button>
					</DialogActions>
				</Dialog>
			)}
		</Box>
	);
}
