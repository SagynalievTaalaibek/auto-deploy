export type UserRole = 'REGULAR' | 'ADMIN' | 'MASTER';

export interface IUser {
	id: string;
	email: string;
	password: string;
	name: string;
	phone: string;
	role: UserRole;

	isVerified: boolean;
	isTwoFactorEnabled: boolean;

	specialization?: string;
	avatarUrl?: string;

	createdAt: string; // ISO string
	updatedAt: string;
}

export interface IUsersDataCRM {
	id: string;
	email: string;
	name: string;
	phone: string;
	role: UserRole;
	specialization: string;
}

export interface IMasterDataCRM {
	id: string;
	name: string;
	specialization: string;
}

export interface IAssignRole {
	email: string;
	role: string;
	specialization?: string;
}

export type TokenType = 'VERIFICATION' | 'TWO_FACTOR' | 'PASSWORD_RESET';

export interface Token {
	id: string;
	email: string;
	token: string;
	type: TokenType;
	expiresIn: string;
	createdAt: string;
}
