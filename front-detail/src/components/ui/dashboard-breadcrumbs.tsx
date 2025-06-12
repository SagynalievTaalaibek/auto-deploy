import React from 'react';

import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

interface BreadcrumbItem {
	label: string;
	href?: string; // если href отсутствует — значит активный элемент (текущий)
}

interface OrderBreadcrumbsProps {
	items: BreadcrumbItem[];
}

const DashboardBreadcrumbs: React.FC<OrderBreadcrumbsProps> = ({ items }) => {
	return (
		<Breadcrumbs
			separator={<NavigateNextIcon fontSize="small" />}
			sx={{ mb: 3 }}
		>
			{items.map((item, index) =>
				item.href ? (
					<Link key={index} underline="hover" color="inherit" href={item.href}>
						{item.label}
					</Link>
				) : (
					<Typography key={index} color="text.primary">
						{item.label}
					</Typography>
				),
			)}
		</Breadcrumbs>
	);
};

export default DashboardBreadcrumbs;
