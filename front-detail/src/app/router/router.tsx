import { createBrowserRouter } from 'react-router-dom';

import NotFound from '../../components/ui/not-found/not-found.tsx';
import { Login } from '../../pages/auth/login/login.tsx';
import { NewVerificationPage } from '../../pages/auth/new-verification/new-verification.tsx';
import { Register } from '../../pages/auth/register/register.tsx';
import { About } from '../../pages/client/about/about.tsx';
import { Contacts } from '../../pages/client/contacts/contacts.tsx';
import { Home } from '../../pages/client/home/home.tsx';
import { OrderProfile } from '../../pages/client/profile/order/order-profile.tsx';
import { Profile } from '../../pages/client/profile/profile.tsx';
import { OneService } from '../../pages/client/services/one-service/one-service.tsx';
import { Services } from '../../pages/client/services/services.tsx';
import { DashboardAnalytics } from '../../pages/crm/dashboard/dashboard-analytics/dashboard-analytics.tsx';
import { DashboardInventory } from '../../pages/crm/dashboard/dashboard-inventory/dashboard-inventory.tsx';
import { InventoryAdd } from '../../pages/crm/dashboard/dashboard-inventory/inventory-add/inventory-add.tsx';
import { DashboardOrdersAdd } from '../../pages/crm/dashboard/dashboard-orders/dashboard-orders-add/dashboard-orders-add.tsx';
import { DashboardOrdersEdit } from '../../pages/crm/dashboard/dashboard-orders/dashboard-orders-edit/dashboard-orders-edit.tsx';
import { DashboardOrdersInfo } from '../../pages/crm/dashboard/dashboard-orders/dashboard-orders-info/dashboard-orders-info.tsx';
import { DashboardOrdersMy } from '../../pages/crm/dashboard/dashboard-orders/dashboard-orders-my/dashboard-orders-my.tsx';
import { DashboardOrders } from '../../pages/crm/dashboard/dashboard-orders/dashboard-orders.tsx';
import { DashboardReports } from '../../pages/crm/dashboard/dashboard-reports/dashboard-reports.tsx';
import { DashboardServicesAdd } from '../../pages/crm/dashboard/dashboard-services/dashboard-services-add/dashboard-services-add.tsx';
import { DashboardServicesInfo } from '../../pages/crm/dashboard/dashboard-services/dashboard-services-info/dashboard-services-info.tsx';
import { DashboardServicesMainEdit } from '../../pages/crm/dashboard/dashboard-services/dashboard-services-main-edit/dashboard-services-main-edit.tsx';
import { DashboardServicesSubEdit } from '../../pages/crm/dashboard/dashboard-services/dashboard-services-sub-edit/dashboard-services-sub-edit.tsx';
import { DashboardServices } from '../../pages/crm/dashboard/dashboard-services/dashboard-services.tsx';
import { DashboardSettings } from '../../pages/crm/dashboard/dashboard-settings/dashboard-settings.tsx';
import { DashboardStaff } from '../../pages/crm/dashboard/dashboard-staff/dashboard-staff.tsx';
import { Dashboard } from '../../pages/crm/dashboard/dashboard.tsx';
import { Logout } from '../../pages/crm/logout/logout.tsx';
import { ROUTES } from '../../shared/constants/constants.ts';
import ClientLayout from '../layout/client-layout.tsx';
import CrmLayout from '../layout/crm-layout.tsx';
import RootLayout from '../layout/root-layout.tsx';
import { ProtectedRoute } from '../protect/protect-route.tsx';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <RootLayout />,
		children: [
			{
				path: '/',
				element: <ClientLayout />,
				children: [
					{ index: true, element: <Home /> },
					{ path: ROUTES.ABOUT, element: <About /> },
					{ path: ROUTES.SERVICES_CLIENT, element: <Services /> },
					{ path: `${ROUTES.SERVICES_CLIENT}/:id`, element: <OneService /> },
					{ path: ROUTES.CONTACTS, element: <Contacts /> },
					{ path: ROUTES.LOGIN, element: <Login /> },
					{ path: ROUTES.REGISTER, element: <Register /> },
					{ path: 'logout', element: <Logout /> },
					{
						path: ROUTES.PROFILE,
						element: (
							<ProtectedRoute>
								<Profile />
							</ProtectedRoute>
						),
					},
					{
						path: ROUTES.PROFILE_ORDER,
						element: (
							<ProtectedRoute>
								<OrderProfile />
							</ProtectedRoute>
						),
					},
				],
			},

			{
				path: `${ROUTES.NEW_VERIFICATION}/:token`,
				element: <NewVerificationPage />,
			},

			// Admin route

			{
				path: ROUTES.DASHBOARD,
				element: <CrmLayout />,
				children: [
					{
						index: true,
						element: (
							<ProtectedRoute roles={['ADMIN', 'MASTER']}>
								<Dashboard />
							</ProtectedRoute>
						),
					},
					{
						path: ROUTES.DASHBOARD_SERVICES,
						element: (
							<ProtectedRoute roles={['ADMIN', 'MASTER']}>
								<DashboardServices />
							</ProtectedRoute>
						),
					},
					{
						path: `${ROUTES.DASHBOARD_SERVICES_INFO}/:id`,
						element: (
							<ProtectedRoute roles={['ADMIN', 'MASTER']}>
								<DashboardServicesInfo />
							</ProtectedRoute>
						),
					},
					{
						path: ROUTES.DASHBOARD_SERVICES_ADD,
						element: (
							<ProtectedRoute roles={['ADMIN', 'MASTER']}>
								<DashboardServicesAdd />
							</ProtectedRoute>
						),
					},
					{
						path: `${ROUTES.DASHBOARD_SERVICES_MAIN_EDIT}/:id`,
						element: (
							<ProtectedRoute roles={['ADMIN', 'MASTER']}>
								<DashboardServicesMainEdit />
							</ProtectedRoute>
						),
					},
					{
						path: `${ROUTES.DASHBOARD_SERVICES_SUB_EDIT}/:id`,
						element: (
							<ProtectedRoute roles={['ADMIN', 'MASTER']}>
								<DashboardServicesSubEdit />
							</ProtectedRoute>
						),
					},

					{
						path: ROUTES.DASHBOARD_INVENTORY,
						element: (
							<ProtectedRoute roles={['ADMIN', 'MASTER']}>
								<DashboardInventory />
							</ProtectedRoute>
						),
					},

					{
						path: ROUTES.DASHBOARD_INVENTORY_ADD,
						element: (
							<ProtectedRoute roles={['ADMIN', 'MASTER']}>
								<InventoryAdd />
							</ProtectedRoute>
						),
					},
					{
						path: ROUTES.DASHBOARD_ORDER,
						element: (
							<ProtectedRoute roles={['ADMIN', 'MASTER']}>
								<DashboardOrders />
							</ProtectedRoute>
						),
					},
					{
						path: `${ROUTES.DASHBOARD_ORDER_EDIT}/:id`,
						element: (
							<ProtectedRoute roles={['ADMIN', 'MASTER']}>
								<DashboardOrdersEdit />
							</ProtectedRoute>
						),
					},
					{
						path: `${ROUTES.DASHBOARD_ORDER_INFO}/:id`,
						element: (
							<ProtectedRoute roles={['ADMIN', 'MASTER']}>
								<DashboardOrdersInfo />
							</ProtectedRoute>
						),
					},
					{
						path: ROUTES.DASHBOARD_ORDER_ADD,
						element: (
							<ProtectedRoute roles={['ADMIN', 'MASTER']}>
								<DashboardOrdersAdd />
							</ProtectedRoute>
						),
					},
					{
						path: ROUTES.DASHBOARD_ORDER_MY,
						element: (
							<ProtectedRoute roles={['ADMIN', 'MASTER']}>
								<DashboardOrdersMy />
							</ProtectedRoute>
						),
					},
					{
						path: ROUTES.DASHBOARD_STAFF,
						element: (
							<ProtectedRoute roles={['ADMIN']}>
								<DashboardStaff />
							</ProtectedRoute>
						),
					},
					{
						path: ROUTES.DASHBOARD_ANALYTICS,
						element: (
							<ProtectedRoute roles={['ADMIN']}>
								<DashboardAnalytics />
							</ProtectedRoute>
						),
					},
					{
						path: ROUTES.DASHBOARD_REPORTS,
						element: (
							<ProtectedRoute roles={['ADMIN']}>
								<DashboardReports />
							</ProtectedRoute>
						),
					},
					{
						path: ROUTES.DASHBOARD_SETTINGS,
						element: (
							<ProtectedRoute roles={['ADMIN']}>
								<DashboardSettings />
							</ProtectedRoute>
						),
					},
				],
			},

			{ path: '*', element: <NotFound /> },
		],
	},
]);
