import Box from '@mui/material/Box';

import { StartScreen } from '../../../components/client/start-screen/start-screen.tsx';

export const Home = () => {
	return (
		<Box>
			<StartScreen
				main_title={'Качественный детейлинг в Кыргызстане'}
				second_text={'по доступным ценам'}
				description={
					'Делать автомобиль красивым, радовать клиента отличным качеством, всегда помогать в правильном выборе и получать от этого только удовольствие!\n' +
					'Положительные эмоции наших клиентов — это успех!'
				}
			/>
		</Box>
	);
};
