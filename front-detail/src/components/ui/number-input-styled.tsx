import React from 'react';

const inputStyle: React.CSSProperties = {
	width: '100%',
	padding: '16.5px 14px',
	fontSize: '1rem',
	fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
	borderRadius: 4,
	borderWidth: '1px', // Заменяем border на отдельные свойства
	borderStyle: 'solid',
	borderColor: 'rgba(0, 0, 0, 0.23)', // Указываем начальный цвет
	outline: 'none',
	boxSizing: 'border-box',
	transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
};

const inputFocusStyle: React.CSSProperties = {
	borderColor: '#1976d2', // Теперь нет конфликта
	boxShadow: '0 0 0 2px rgba(25, 118, 210, 0.2)',
};

export default function NumberInputStyled(props: {
	value: string | number | undefined;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	error?: boolean;
	helperText?: string;
	min?: number;
	max?: number;
	label?: string;
}) {
	const [focused, setFocused] = React.useState(false);

	return (
		<div style={{ marginBottom: 24 }}>
			{props.label && (
				<label
					style={{
						display: 'block',
						marginBottom: 4,
						fontSize: 12,
						color: props.error ? '#d32f2f' : 'rgba(0, 0, 0, 0.6)',
						fontWeight: 400,
						fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
					}}
				>
					{props.label}
				</label>
			)}
			<input
				type="number"
				value={props.value}
				onChange={props.onChange}
				min={props.min}
				max={props.max}
				style={focused ? { ...inputStyle, ...inputFocusStyle } : inputStyle}
				onFocus={() => setFocused(true)}
				onBlur={() => setFocused(false)}
				aria-invalid={props.error ? true : undefined}
				aria-describedby={props.error ? 'helper-text' : undefined}
			/>
			{props.error && props.helperText && (
				<p
					id="helper-text"
					style={{
						color: '#d32f2f',
						fontSize: 12,
						marginTop: 4,
						fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
					}}
				>
					{props.helperText}
				</p>
			)}
		</div>
	);
}
