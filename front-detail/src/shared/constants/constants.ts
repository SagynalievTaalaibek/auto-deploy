export const ROUTES = {
	LOGIN: '/auth/login',
	REGISTER: '/auth/register',
	NEW_VERIFICATION: '/auth/new-verification',
	HOME: '/',
	PROFILE: '/profile',
	PROFILE_ORDER: '/profile/order',

	// CLIENTS
	ABOUT: '/about',
	SERVICES_CLIENT: '/services',
	CONTACTS: '/contacts',

	// ADMIN
	DASHBOARD: '/crm/dashboard',
	DASHBOARD_ORDER: '/crm/dashboard/orders',
	DASHBOARD_STAFF: '/crm/dashboard/staff',
	DASHBOARD_SERVICES: '/crm/dashboard/services',
	DASHBOARD_ANALYTICS: '/crm/dashboard/analytics',
	DASHBOARD_INVENTORY: '/crm/dashboard/inventory',
	DASHBOARD_REPORTS: '/crm/dashboard/reports',
	DASHBOARD_SETTINGS: '/crm/dashboard/settings',

	DASHBOARD_ORDER_INFO: '/crm/dashboard/orders/info',
	DASHBOARD_ORDER_EDIT: '/crm/dashboard/orders/edit',
	DASHBOARD_ORDER_MY: '/crm/dashboard/orders/my',
	DASHBOARD_ORDER_ADD: '/crm/dashboard/orders/add',

	DASHBOARD_SERVICES_ADD: '/crm/dashboard/services/add',
	DASHBOARD_SERVICES_INFO: '/crm/dashboard/services/info',
	DASHBOARD_SERVICES_MAIN_EDIT: '/crm/dashboard/services/main/edit',
	DASHBOARD_SERVICES_SUB_EDIT: '/crm/dashboard/services/sub/edit',

	DASHBOARD_INVENTORY_ADD: '/crm/dashboard/inventory/add',
};

export const API_ROUTES = {
	LOGIN: '/auth/login',
	REGISTER: '/auth/register',
	EMAIL_CONFIRMATION: 'auth/email-confirmation',
	LOGOUT: '/auth/logout',
	CHECK_USER: '/auth/me',

	SESSION_CHECK: '/users/session',

	CREATE_ORDER_CRM: '/orders/crm',
	CREATE_ORDER_CLIENT: '/orders/client',
	ORDER_GET_PROFILE: '/orders?profile=true',
	ORDER_GET_CRM: '/orders?crm=true',
	ORDER_GET_CRM_MASTER: '/orders?masterId=',
	ORDER_GET_ONE: '/orders',
	ORDER_UPDATE: '/orders',
	ORDER_UPDATE_STATUS: '/orders/status',

	USERS_GET_CRM: '/users',
	USERS_GET_MASTERS: '/users/master',
	ASSIGN_ROLE: '/users/admin/assign-role',

	MAIN_SERVICES_GET: '/services/main-services',
	MAIN_SERVICES_EDIT: '/services/main-service',
	MAIN_SERVICES_GET_ONE: '/services',
	MAIN_SERVICES_CREATE: '/services/main-services',
	SERVICES_CREATE: '/services',
	SERVICES_DELETE: '/services',
	SERVICES_EDIT: '/services',
	SERVICES_GET_ONE: '/services/service',

	CARS_GET: '/cars',
	CARS_BODY_TYPE_GET: '/cars/body-type',

	ANALYTICS_GET_PERIOD: '/analytics/period-stats?period=',
	ANALYTICS_GET_RANGE: '/analytics/revenue-chart?range=',
	ANALYTICS_GET_POPULAR_SERVICE: '/analytics/popular-services',
	ANALYTICS_GET_DASHBOARD_STATS: '/analytics/dashboard-stats',
	ANALYTICS_GET_DASHBOARD_ACTIVE: '/analytics/dashboard-active',

	REPORTS_GET: '/reports',
	INVENTORY_CREATE: '/inventory',
	INVENTORY_DEDUCT: '/inventory/deduct',
	INVENTORY_RECEIVE: '/inventory/receive',

	CONTACTS_INFO: '/contact',
};

export const NAVBAR_URL = [
	{ name: 'Домой', path: '/' },
	{ name: 'О нас', path: '/about' },
	{ name: 'Услуги', path: '/services' },
	{ name: 'Контакты', path: '/contacts' },
];
