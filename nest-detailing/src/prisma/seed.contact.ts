import { PrismaService } from '../prisma/prisma.service';

const prismaService = new PrismaService();

async function main() {
	await prismaService.contactInfo.create({
		data: {
			title: 'Контакты детейлинг-центра',
			subTitle: 'Всегда на связи — заботимся о вашем авто',
			address: 'Бишкек, ул. Тоголок Молдо 25',
			phone: '+996 700 123 456',
			email: 'contact@detailing.kg',
			workingHours: 'Пн–Сб: 9:00 – 20:00 / Вс: выходной',
			telegramUrl: 'https://t.me/thetechkz',
			whatsappUrl: 'https://web.whatsapp.com/',
			instagramUrl: 'https://www.instagram.com/',
			mapUrl:
				'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2925.320321368569!2d74.58490727654616!3d42.84496910432818!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x389ec9dbdc3d4eef%3A0x6a75a5244d9c79f8!2z0JrQk9Ci0KMg0LjQvC4g0JguINCg0LDQt9C30LDQutC-0LLQsA!5e0!3m2!1sru!2skg!4v1748156728783!5m2!1sru!2skg'
		}
	});
}

main()
	.then(() => {
		console.log('✅ Сидинг завершен.');
		return prismaService.$disconnect();
	})
	.catch(async e => {
		console.error('❌ Ошибка при сидинге:', e);
		await prismaService.$disconnect();
		process.exit(1);
	});
