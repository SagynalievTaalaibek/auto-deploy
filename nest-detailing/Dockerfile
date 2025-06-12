FROM node:20-alpine

# Устанавливаем зависимости для сборки
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости (и Prisma CLI)
RUN npm install --legacy-peer-deps

# Копируем весь проект
COPY . .

# Копируем схемы Prisma (важно, если они в /prisma)
COPY prisma ./prisma

# Генерируем Prisma Client
RUN npx prisma generate

# (по желанию) Применить миграции, если используешь migrate deploy
# RUN npx prisma migrate deploy

# Собираем NestJS
RUN npm run build

# Старт
CMD ["npm", "run", "start:prod"]
