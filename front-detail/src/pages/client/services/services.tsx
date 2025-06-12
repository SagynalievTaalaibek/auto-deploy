import { useEffect } from 'react';

import Box from '@mui/material/Box';

import { ServiceItem } from '../../../components/client/service-item/service-item.tsx';
import { StartScreen } from '../../../components/client/start-screen/start-screen.tsx';
import { LoadingScreen } from '../../../components/ui/loading-screen/loading-screen.tsx';
import {
	selectLoadingServices,
	selectMainServices,
} from '../../../features/services/services.slice.ts';
import { fetchMainServices } from '../../../features/services/services.thunks.ts';
import {
	useAppDispatch,
	useAppSelector,
} from '../../../shared/hooks/hooksStore.ts';

/*const images = [
	{ id: 1, image: 'https://i.postimg.cc/SKLTxzQV/image.jpg' },
	{ id: 2, image: 'https://i.postimg.cc/wTPbfpb5/image.webp' },
	{ id: 3, image: 'https://i.postimg.cc/wjm4nGSC/image.webp' },
	{ id: 4, image: 'https://i.postimg.cc/ZqzsmLmC/image.webp' },
	{ id: 5, image: 'https://i.postimg.cc/3NNn1SXb/image.jpg' },
	{ id: 6, image: 'https://i.postimg.cc/cHsDg4rW/image.jpg' },
	{ id: 7, image: 'https://i.postimg.cc/KjWQHPQc/image.jpg' },
	{ id: 8, image: 'https://i.postimg.cc/cHXFQynn/image.webp' },
	{ id: 9, image: 'https://i.postimg.cc/c1kDCWZq/image.jpg' },
];*/

export const Services = () => {
	const dispatch = useAppDispatch();
	const services = useAppSelector(selectMainServices);
	const loading = useAppSelector(selectLoadingServices);

	useEffect(() => {
		dispatch(fetchMainServices());
	}, [dispatch]);
	return (
		<Box>
			<StartScreen
				main_title={'НАШИ УСЛУГИ ДЕТЕЙЛИНГА'}
				second_text={'по доступным ценам в Бишкеке'}
				description={'Профессиональные мастера\n' + 'превосходное качество'}
			/>

			{loading ? (
				<LoadingScreen />
			) : (
				services.map((item, i) => (
					<ServiceItem
						key={item.id}
						id={item.id}
						name={item.name}
						description={item.description}
						img={item.img}
						services={item.services}
						index={i}
					/>
				))
			)}
		</Box>
	);
};
