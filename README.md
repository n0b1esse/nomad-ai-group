# Nomad AI Group — корпоративный сайт

Production-домен: **https://nomadaigroup.com**

Многостраничный сайт (Vite MPA) с Node.js API для отправки заявок через SMTP.

## Структура

| Путь | Назначение |
|------|------------|
| `src/` | HTML, CSS, JS, изображения (исходники фронтенда) |
| `public/` | `robots.txt`, `sitemap.xml`, `.htaccess`, `_redirects`, favicon |
| `server/` | Express API (`/api/health`, `/api/send-email`) |
| `dist/` | Production-сборка (генерируется, в git не коммитится) |

## Локальный запуск

```bash
npm install
cp .env.example .env
# заполните SMTP-переменные в .env

# терминал 1 — API
npm run server

# терминал 2 — фронтенд (прокси /api → :3000)
npm run dev
```

Сайт: http://localhost:5173  
API: http://localhost:3000/api/health

## Сборка

```bash
npm run build
npm run preview
```

Артефакты появляются в `dist/`.

## Переменные окружения

См. `.env.example`:

- `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, `EMAIL_PASS` — SMTP
- `RECEIVER_EMAIL` — ящик для заявок с сайта
- `PORT` — порт API (по умолчанию `3000`)

## Деплой на nomadaigroup.com

Форма отправляет `POST /api/send-email`. Нужна одна из схем:

### Вариант A — один VPS (рекомендуется)

1. `npm run build`
2. Запустить Express с раздачей `dist/` и API (настроить reverse proxy nginx: `nomadaigroup.com` → Node).
3. Задать `.env` на сервере.
4. Включить SSL (Let's Encrypt).
5. Проверить: страницы, `https://nomadaigroup.com/robots.txt`, `https://nomadaigroup.com/sitemap.xml`, форма.

### Вариант B — статика + отдельный API

1. Загрузить содержимое `dist/` на статический хостинг.
2. API на поддомене или отдельном порту; nginx проксирует `/api` на backend.
3. Без прокси форма на статике **не заработает**.

### DNS

- `A` / `AAAA` записи домена `nomadaigroup.com` → IP хостинга.
- После деплоя: Search Console, проверка `sitemap.xml`.

## Страницы

| URL | Файл |
|-----|------|
| https://nomadaigroup.com/ | `index.html` |
| https://nomadaigroup.com/services.html | услуги |
| https://nomadaigroup.com/cases.html | кейсы |
| https://nomadaigroup.com/contacts.html | контакты |
| https://nomadaigroup.com/portfolio.html | о компании |

Подробный аудит: `audit_report.md`.
