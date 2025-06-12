import React, { useState } from 'react';

import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
} from '@mui/material';

import { useAppSnackbar } from '../../../shared/hooks/useAppSnackbar.tsx';
import { QuestionSchema } from '../../../shared/schemas/question.schema.ts';

interface Props {
	open: boolean;
	setOpen(open: boolean): void;
}

export const FormQuestion = (props: Props) => {
	const { showSnackbar } = useAppSnackbar();
	const [formData, setFormData] = useState({
		name: '',
		phone: '',
		question: '',
	});

	const [errors, setErrors] = useState<Record<string, string>>({});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
		setErrors(prev => ({ ...prev, [e.target.name]: '' }));
	};

	const handleSubmit = () => {
		const result = QuestionSchema.safeParse(formData);

		if (!result.success) {
			const fieldErrors: Record<string, string> = {};
			result.error.errors.forEach(err => {
				if (err.path[0]) {
					fieldErrors[err.path[0]] = err.message;
				}
			});
			setErrors(fieldErrors);
			return;
		}

		console.log('Submitted:', result.data);
		props.setOpen(false);
		showSnackbar('Вопрос успешна отправлен', 'success');
		setFormData({ name: '', phone: '', question: '' });
		setErrors({});
	};

	return (
		<Dialog
			open={props.open}
			onClose={() => props.setOpen(false)}
			fullWidth
			maxWidth="sm"
		>
			<DialogTitle>Задать вопрос</DialogTitle>
			<DialogContent
				sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}
			>
				<TextField
					label="Имя"
					name="name"
					value={formData.name}
					onChange={handleChange}
					error={!!errors.name}
					helperText={errors.name}
					fullWidth
				/>

				<TextField
					label="Телефон"
					name="phone"
					value={formData.phone}
					onChange={handleChange}
					error={!!errors.phone}
					helperText={errors.phone}
					fullWidth
				/>

				<TextField
					label="Вопрос"
					name="question"
					value={formData.question}
					onChange={handleChange}
					error={!!errors.question}
					helperText={errors.question}
					multiline
					rows={3}
					fullWidth
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={() => props.setOpen(false)}>Отмена</Button>
				<Button onClick={handleSubmit} variant="contained">
					Отправить
				</Button>
			</DialogActions>
		</Dialog>
	);
};
