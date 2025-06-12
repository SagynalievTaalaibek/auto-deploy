import { useEffect, useState } from 'react';

import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { z } from 'zod';

import { selectContactsInfo } from '../../../../features/settings/settings.slice.ts';
import {
	fetchContactInfo,
	updateContactInfo,
} from '../../../../features/settings/settings.thunks.ts';
import {
	useAppDispatch,
	useAppSelector,
} from '../../../../shared/hooks/hooksStore.ts';
import { useAppSnackbar } from '../../../../shared/hooks/useAppSnackbar.tsx';

type ContactInfoFromApi = {
	title?: string;
	subTitle?: string;
	address?: string;
	phone?: string;
	email?: string;
	workingHours?: string;
	telegramUrl?: string;
	whatsappUrl?: string;
	instagramUrl?: string;
	mapUrl?: string;
};

const formSchema = z.object({
	title: z.string().min(1, 'Обязательное поле'),
	subTitle: z.string().min(1, 'Обязательное поле'),
	address: z.string().min(1, 'Обязательное поле'),
	phone: z.string().min(1, 'Обязательное поле'),
	email: z.string().min(1, 'Обязательное поле'),
	workingHours: z.string().min(1, 'Обязательное поле'),
	telegramUrl: z.string().min(1, 'Обязательное поле'),
	whatsappUrl: z.string().min(1, 'Обязательное поле'),
	instagramUrl: z.string().min(1, 'Обязательное поле'),
	mapUrl: z.string().min(1, 'Обязательное поле'),
});

type FormData = z.infer<typeof formSchema>;

export function SettingsPage() {
	const dispatch = useAppDispatch();
	const contacts = useAppSelector(selectContactsInfo) as ContactInfoFromApi;
	const { showSnackbar } = useAppSnackbar();
	const [formData, setFormData] = useState<FormData>({
		title: '',
		subTitle: '',
		address: '',
		phone: '',
		email: '',
		workingHours: '',
		telegramUrl: '',
		whatsappUrl: '',
		instagramUrl: '',
		mapUrl: '',
	});

	const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
		{},
	);

	useEffect(() => {
		dispatch(fetchContactInfo());
	}, [dispatch]);

	useEffect(() => {
		if (contacts) {
			setFormData({
				title: contacts.title || '',
				subTitle: contacts.subTitle || '',
				address: contacts.address || '',
				phone: contacts.phone || '',
				email: contacts.email || '',
				workingHours: contacts.workingHours || '',
				telegramUrl: contacts.telegramUrl || '',
				whatsappUrl: contacts.whatsappUrl || '',
				instagramUrl: contacts.instagramUrl || '',
				mapUrl: contacts.mapUrl || '',
			});
		}
	}, [contacts]);

	const handleChange = (key: keyof FormData, value: string) => {
		setFormData(prev => ({ ...prev, [key]: value }));
		setErrors(prev => ({ ...prev, [key]: '' }));
	};

	const handleSave = async () => {
		const result = formSchema.safeParse(formData);

		if (!result.success) {
			const fieldErrors: Partial<Record<keyof FormData, string>> = {};
			for (const err of result.error.errors) {
				const fieldName = err.path[0] as keyof FormData;
				fieldErrors[fieldName] = err.message;
			}
			setErrors(fieldErrors);
			return;
		}

		await dispatch(updateContactInfo(result.data));
		showSnackbar('Контакты обновлены', 'success');
		dispatch(fetchContactInfo());
	};

	return (
		<Box sx={{ py: 3, width: '100%' }}>
			<Paper sx={{ p: 3, mb: 4 }}>
				<Typography variant="h6" mb={2}>
					Информация о центре
				</Typography>
				<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
					{Object.entries(formData).map(([key, value]) => (
						<TextField
							key={key}
							label={getFieldLabel(key as keyof FormData)}
							value={value}
							onChange={e =>
								handleChange(key as keyof FormData, e.target.value)
							}
							error={Boolean(errors[key as keyof FormData])}
							helperText={errors[key as keyof FormData]}
							fullWidth
						/>
					))}
				</Box>
			</Paper>

			<Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
				<Button variant="contained" color="primary" onClick={handleSave}>
					Сохранить настройки
				</Button>
			</Box>
		</Box>
	);
}

function getFieldLabel(field: keyof FormData): string {
	const labels: Record<keyof FormData, string> = {
		title: 'Название центра',
		subTitle: 'Подзаголовок',
		address: 'Адрес',
		phone: 'Телефон',
		email: 'Email',
		workingHours: 'Часы работы',
		telegramUrl: 'Telegram URL',
		whatsappUrl: 'WhatsApp URL',
		instagramUrl: 'Instagram URL',
		mapUrl: 'Карта (mapUrl)',
	};
	return labels[field];
}
