# NOMAD AI GROUP — Production Audit

**Дата актуализации:** 15 мая 2026  
**Production-домен:** https://nomadaigroup.com

## Итоговая оценка

**Готовность к продакшену: ~68%**

Проект выше уровня черновика: Vite MPA, production-сборка проходит, Express SMTP API, 5 страниц с контентом, SEO-мета и `sitemap.xml` для `nomadaigroup.com`, `README.md` с инструкциями.

До полноценного production остаётся: **фактический деплой**, **единая схема фронт+API на сервере**, **усиление безопасности email endpoint**.

## Инвентарь (что есть)

### Фронтенд

| Элемент | Статус |
|---------|--------|
| 5 страниц: главная, услуги, кейсы, контакты, о нас | ✅ |
| `src/styles.css`, `src/script.js` | ✅ |
| 6 кейсов WebP, модальные окна | ✅ |
| Мобильное меню, scroll progress, reveal-анимации | ✅ |
| Формы на 4 страницах (index, services, contacts, portfolio) | ✅ |
| Блокировка gmail/yahoo/outlook на клиенте | ✅ |
| `lang="ru"`, aria, `h1` на каждой странице | ✅ |
| canonical, Open Graph, Twitter Cards | ✅ |
| Schema.org Organization (главная) | ✅ |

### Инфраструктура

| Файл / каталог | Назначение |
|----------------|------------|
| `vite.config.js` | MPA, proxy `/api`, сборка в `dist/` |
| `public/robots.txt` | Allow + Sitemap для nomadaigroup.com |
| `public/sitemap.xml` | 5 URL боевого домена |
| `public/.htaccess` | HTTPS redirect, кэш (Apache) |
| `public/_redirects` | Заготовка Netlify |
| `.env.example`, `.gitignore` | SMTP env, исключение секретов |
| `README.md` | Запуск, env, деплой на nomadaigroup.com |

### Backend

- `GET /api/health`
- `POST /api/send-email` (Nodemailer, escape HTML в письме)
- Переменные: `EMAIL_*`, `RECEIVER_EMAIL`, `PORT`

### Структура репозитория (актуально)

- **Канонический фронтенд:** `src/` (legacy `frontend/` удалён из дерева)
- **Сборка:** `dist/` (в `.gitignore`, генерируется `npm run build`)
- **Проверка сборки:** `npm run build` — успешно (~650 ms, ~700 KB)

## Чего не хватает

### Критично (до/во время деплоя)

| Проблема | Риск |
|----------|------|
| Нет единого процесса: Express не раздаёт `dist/` | Форма `/api/send-email` не работает на чисто статическом хостинге |
| API без rate limit, strict CORS, helmet, лимита body | Злоупотребление SMTP |
| Нет серверной валидации формата email и длины полей | Обход клиентских проверок |
| 500-ответ с `missing: [...]` env-ключей | Утечка конфигурации |
| Деплой на nomadaigroup.com не выполнен | Сайт не в production |

### SEO (оставшееся)

- `og:image` — не задан (можно добавить корпоративное изображение 1200×630)
- Search Console / Яндекс.Вебмастер — после деплоя
- Редирект `www` ↔ apex — настроить на DNS/хостинге

### Инженерная зрелость

- CI (GitHub Actions)
- Автотесты
- `engines` в `package.json`, `.nvmrc`
- Dockerfile / platform manifest
- `LICENSE`
- Рефакторинг монолитов `server/index.js`, `src/script.js`

## Оценка по направлениям

| Направление | Балл | Комментарий |
|-------------|------|-------------|
| Сборка (Vite) | 17/20 | MPA, minify, proxy, build OK |
| Фронтенд / UI | 16/20 | Корпоративный сайт, базовая a11y |
| SEO и meta | 14/15 | canonical, OG, sitemap, robots, schema на главной |
| Безопасность | 10/20 | Секреты в env; API открыт |
| Backend / API | 11/20 | Работает; нет static serve и hardening |
| DevOps / деплой | 6/15 | README + htaccess; нет CI/Docker |
| Документация | 6/10 | README есть; CI и LICENSE — нет |
| **Итого** | **~68%** | |

## Production-домен nomadaigroup.com

### URL-карта

| Страница | Canonical |
|----------|-----------|
| Главная | https://nomadaigroup.com/ |
| Услуги | https://nomadaigroup.com/services.html |
| Кейсы | https://nomadaigroup.com/cases.html |
| Контакты | https://nomadaigroup.com/contacts.html |
| О нас | https://nomadaigroup.com/portfolio.html |

### Служебные URL (после деплоя)

- https://nomadaigroup.com/robots.txt
- https://nomadaigroup.com/sitemap.xml
- https://nomadaigroup.com/api/health (при поднятом API)

### DNS (ожидается на хостинге)

- `A` / `AAAA` для `nomadaigroup.com` → IP сервера
- При необходимости: `www.nomadaigroup.com` → редирект на apex

## Критические замечания

### 1. Frontend и backend не сведены в один процесс

Форма шлёт `POST /api/send-email`. `server/index.js` не раздаёт `dist/`.

**Решение:** Express + `express.static('dist')` на VPS **или** nginx: статика + `location /api` → Node.

### 2. Email API не защищён от abuse

Нужны: `express-rate-limit`, CORS whitelist (`https://nomadaigroup.com`), валидация email, лимит JSON body, не отдавать `missing` в production.

### 3. Production `.env` на сервере

Без SMTP-переменных форма вернёт 500; визуально форма останется на месте.

## Схема деплоя (рекомендация)

```
Пользователь → https://nomadaigroup.com
                    ↓
              nginx (SSL)
                    ↓
         ┌──────────┴──────────┐
         │                     │
    статика dist/        /api/* → Express :3000
    (HTML, CSS, JS)            → SMTP
```

## Чеклист перед сдачей на nomadaigroup.com

- [ ] `npm run build`, загрузка `dist/` + `public/` артефактов
- [ ] Запуск API, `.env` на сервере
- [ ] nginx: `/api` → backend, остальное → `dist/`
- [ ] SSL (Let's Encrypt)
- [ ] Smoke: все 5 страниц, форма, письмо в inbox
- [ ] `robots.txt`, `sitemap.xml` доступны по HTTPS
- [ ] Search Console: добавить sitemap

## Список файлов (статус)

| Файл | Статус |
|------|--------|
| `README.md` | ✅ добавлен |
| `public/sitemap.xml` | ✅ nomadaigroup.com |
| `public/robots.txt` | ✅ обновлён |
| canonical + OG на страницах | ✅ |
| `.github/workflows/` | ❌ |
| `Dockerfile` | ❌ |
| `LICENSE` | ❌ |

## Итоговый вердикт

Проект **готов к этапу публикации на nomadaigroup.com** при наличии хостинга и настройке reverse proxy / единого Node-процесса.

**Главные блокеры:** деплой, связка фронт+API, hardening `/api/send-email`.

После деплоя и защиты API реалистичная оценка: **78–85%** production readiness.
