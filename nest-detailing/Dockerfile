FROM node:20-alpine

WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости включая devDependencies
RUN npm install --legacy-peer-deps

# Копируем весь код
COPY . .

# Компилируем проект (если у тебя build-команда компилирует TS)
RUN npm run build

# Для продакшена обычно запускаем без сидов
# Но если хочешь, можно запускать сиды отдельно

CMD ["npm", "run", "start:prod"]
