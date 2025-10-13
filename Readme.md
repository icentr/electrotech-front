# Инструкция по настройке и запуску проекта

## Шаг 1: Создание `.env` файла

В корневой директории проекта создайте файл с именем `.env` и добавьте в него следующую строку:

```bash
NUXT_API_BASE_URL=http://localhost:1488/api/
PORT=80
```

Замените `http://адрес:Порт/api/` на актуальный адрес вашего API-сервера. Символ `/` в конце ссылки **обязателен**.

## Шаг 2: Установка и запуск проекта

Откройте Bash-терминал и выполните следующие команды по порядку:

```bash
npm i
npm run build
node .output/server/index.mjs
```

После выполнения этих команд проект будет собран и запущен.

## Docker

Test build:

```bash
docker build -t electrotech-front .
```

Test run:

```bash
docker run -p 4000:3000 electrotech-front
```
