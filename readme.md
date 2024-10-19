Вот пример документации для вашего backend на Express, включая инструкции по клонированию репозитория, инициализации проекта и установке зависимостей, а также настройки Nginx.

---

# Документация по настройке Telegram mini app BOT

## Создание и настройка Telegram-бота

1. Откройте Telegram и найдите бота [BotFather](https://t.me/botfather).
2. Создайте нового бота, используя команду `/newbot`, и следуйте инструкциям.
3. Скопируйте **токен** вашего бота, он понадобится для настройки.


## Предварительные требования

- Установленный [Node.js](https://nodejs.org/) (рекомендуемая версия: 14.x и выше)
- Установленный [npm](https://www.npmjs.com/) (обычно идет в комплекте с Node.js)
- Установленный [Git](https://git-scm.com/)
- Установленный [Nginx](https://www.nginx.com/)

## Клонирование репозитория

1. Откройте терминал.
2. Перейдите в директорию, в которую вы хотите клонировать проект.
3. Выполните следующую команду:

```
sudo apt update && sudo apt install -y nginx nodejs npm
```

```
git clone https://github.com/IgorBlink/Decentrathon-mini-apps.git
```

Замените ваш_пользователь и ваш_репозиторий на соответствующие значения.

## Инициализация проекта

1. Перейдите в папку фронта проекта:
```
   cd frontend/
```
2. Установите зависимости:
```
   npm install
```
3. Соберите проект:
```
   npm run build
```
4. Перейдите в директорию с бэкэндом:
```
   cd ../backend
```
5. Установите зависимости:
```
   npm install
```

## Зависимости, которые будут установлены:

- axios: Библиотека для HTTP-запросов.
- cors: Middleware для работы с кросс-доменными запросами.
- dotenv: Для загрузки переменных окружения из файла .env.
- express: Фреймворк для создания веб-приложений.
- express-fileupload: Middleware для загрузки файлов.
- mongoose: ORM для работы с MongoDB.
- node-fetch: Библиотека для выполнения HTTP-запросов.
- qs: Библиотека для работы с параметрами URL.
- telegraf: Библиотека для создания ботов Telegram.

## Настройка Nginx

1. Перейдите в каталог с конфигурациями nginx

```bash
cd /etc/nginx/
```

2. Создайте файл конфигурации для вашего Nginx. Например, создайте файл /etc/nginx/sites-available/mytestshop и добавьте следующий код:

```
server {
listen 443 ssl;
server_name mytestshop.kz www.mytestshop.kz;

    ssl_certificate /etc/letsencrypt/live/mytestshop.kz/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/mytestshop.kz/privkey.pem;
    ssl_trusted_certificate /etc/letsencrypt/live/mytestshop.kz/chain.pem;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;

    root /var/www/html/frontend/build;  # Папка с собранным React-приложением
    index index.html;

    # Обработка запросов на фронтенд
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Проксирование запросов на backend (например, через /api)
    location /api/ {
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_pass http://localhost:5000;
    }

    # Проксирование для деплоя через git
    location /git-deploy {
        alias /var/www/html/git.php;
        fastcgi_pass unix:/var/run/php/php8.1-fpm.sock;
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME $document_root/git.php;
    }

    error_page  405     =200 $uri;
}

# Перенаправление HTTP на HTTPS
server {
listen 80;
server_name mytestshop.kz www.mytestshop.kz;
return 301 https://$host$request_uri;
}
```
После добавления конфигурации выполните следующие команды для активации конфигурации и перезапуска Nginx:

```bash
sudo ln -s /etc/nginx/sites-available/mytestshop /etc/nginx/sites-enabled/
```
```bash
sudo nginx -t
```
```bash
sudo systemctl restart nginx
```

## Запуск сервера

Чтобы запустить сервер, перейдите в директорию с бэкендом
```bash
cd /var/www/html/backend
```
используйте команду:
```bash
npm start
```
Теперь ваше телеграм приложение готово к работе!

---

Если у вас есть дополнительные вопросы или требуется помощь, дайте знать!
