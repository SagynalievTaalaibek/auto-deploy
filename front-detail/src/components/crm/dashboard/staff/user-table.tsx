import React from 'react';

import {
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Typography,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

import { selectUsersCRM } from '../../../../features/auth/authSlice.ts';
import { useAppSelector } from '../../../../shared/hooks/hooksStore.ts';

const columns = [
	{ field: 'name', headerName: 'Имя', flex: 1 },
	{ field: 'email', headerName: 'Email', flex: 1 },
	{ field: 'phone', headerName: 'Телефон', flex: 1 },
	{ field: 'role', headerName: 'Роль', flex: 1 },
	{ field: 'specialization', headerName: 'Специализация', flex: 1 },
];

export function UserTable() {
	const [selectedRole, setSelectedRole] = React.useState('');
	const users = useAppSelector(selectUsersCRM);

	const handleChange = (event: SelectChangeEvent) => {
		setSelectedRole(event.target.value);
	};

	const filteredUsers = React.useMemo(() => {
		if (!selectedRole) return users;
		return users.filter(user => user.role === selectedRole);
	}, [selectedRole, users]);

	return (
		<Box sx={{ width: '100%' }}>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					gap: 2,
				}}
			>
				<Typography variant="h6" sx={{ mb: 2 }}>
					Фильтрация по роли
				</Typography>

				<FormControl sx={{ mb: 2, minWidth: 200 }}>
					<InputLabel id="role-filter-label">Роль</InputLabel>
					<Select
						labelId="role-filter-label"
						id="role-filter"
						value={selectedRole}
						label="Роль"
						onChange={handleChange}
					>
						<MenuItem value="">Все</MenuItem>
						<MenuItem value="ADMIN">Администратор</MenuItem>
						<MenuItem value="MASTER">Мастер</MenuItem>
						<MenuItem value="REGULAR">Обычный пользователь</MenuItem>
					</Select>
				</FormControl>
			</Box>

			<Box sx={{ height: 600 }}>
				<DataGrid
					rows={filteredUsers}
					columns={columns}
					getRowId={row => row.id}
					disableRowSelectionOnClick
				/>
			</Box>
		</Box>
	);
}
