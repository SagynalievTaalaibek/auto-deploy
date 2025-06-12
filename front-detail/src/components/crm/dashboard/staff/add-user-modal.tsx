import { useState } from 'react';

import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	MenuItem,
	TextField,
} from '@mui/material';

import {
	assignRole,
	fetchUsersCRM,
} from '../../../../features/auth/authThunks.ts';
import { useAppDispatch } from '../../../../shared/hooks/hooksStore.ts';
import { useAppSnackbar } from '../../../../shared/hooks/useAppSnackbar.tsx';
import type { UserRole } from '../../../../shared/types/user.ts';

interface Props {
	open: boolean;
	onCloseModalAction: () => void;
}

const specializations = [
	{ id: '123', specialist: 'Мастер по тонированию' },
	{ id: '321', specialist: 'Мастер по полировке и химчистке авто' },
	{ id: '222', specialist: 'Мастер по оклейке' },
	{ id: '444', specialist: 'Мастер по ремонту салона' },
	{ id: 'Кузовной_ремонт', specialist: 'Кузовщик' },
	{ id: 'Все услуги', specialist: 'Детейлер-универсал' },
];

export function AddUserModal({ open, onCloseModalAction }: Props) {
	const [email, setEmail] = useState('');
	const [role, setRole] = useState<UserRole>('REGULAR');
	const [specialization, setSpecialization] = useState('');

	const { showSnackbar } = useAppSnackbar();

	const dispatch = useAppDispatch();

	const handleAdd = async () => {
		try {
			await dispatch(assignRole({ email, role, specialization })).unwrap();
			await dispatch(fetchUsersCRM());
			showSnackbar('Вы успешно изменили роль', 'success');
			onCloseModalAction();
		} catch (e) {
			console.error(e);
			showSnackbar('Failed change role', 'error');
		}
	};

	return (
		<Dialog open={open} onClose={onCloseModalAction}>
			<DialogTitle>Добавить сотрудника</DialogTitle>
			<DialogContent>
				<TextField
					fullWidth
					label="Email пользователя"
					value={email}
					onChange={e => setEmail(e.target.value)}
					sx={{ my: 2 }}
				/>

				<TextField
					select
					fullWidth
					label="Роль"
					value={role}
					onChange={e => setRole(e.target.value as UserRole)}
				>
					<MenuItem value="REGULAR">Обычный</MenuItem>
					<MenuItem value="MASTER">Мастер</MenuItem>
					<MenuItem value="ADMIN">Админ</MenuItem>
				</TextField>

				{role === 'MASTER' && (
					<TextField
						select
						fullWidth
						label="Специализация"
						value={specialization}
						onChange={e => setSpecialization(e.target.value)}
						sx={{ mt: 2 }}
					>
						{specializations.map(spec => (
							<MenuItem key={spec.id} value={spec.specialist}>
								{spec.specialist}
							</MenuItem>
						))}
					</TextField>
				)}
			</DialogContent>
			<DialogActions>
				<Button onClick={onCloseModalAction}>Отмена</Button>
				<Button onClick={handleAdd} variant="contained">
					Сохранить
				</Button>
			</DialogActions>
		</Dialog>
	);
}
