# Отчёт для сдачи сайта NOMAD AI GROUP

**Production-домен:** https://nomadaigroup.com  
**Дата:** 15 мая 2026

## Статус проекта

**Текущий статус: сайт подготовлен к деплою на nomadaigroup.com; публикация ожидает доступов к хостингу.**

Фронтенд собран под Vite MPA, backend для формы обратной связи реализован, SEO-файлы и мета-теги привязаны к домену `nomadaigroup.com`. Финальный запуск в production не выполнён — нет размещения на сервере и smoke-проверки на боевом домене.

## Что выполнено

- Многостраничный frontend (5 страниц): главная, услуги, кейсы, контакты, о нас.
- Production-сборка в `dist/` (`npm run build` — проверена).
- Backend Node.js / Express: `/api/health`, `/api/send-email` (SMTP).
- Служебные файлы:
  - `public/robots.txt` — Sitemap: https://nomadaigroup.com/sitemap.xml
  - `public/sitemap.xml` — все страницы домена
  - `public/.htaccess`, `public/_redirects`
- SEO на страницах: canonical, Open Graph, Twitter Cards; Schema.org на главной.
- `.env.example`, `.gitignore`, `README.md` с инструкцией деплоя.
- Legacy `frontend/` убран; единый источник — `src/`.
- Технический аудит: `audit_report.md` (~68% готовности).

## Подтверждённые ресурсы

- **Домен:** nomadaigroup.com (записи DNS — на этапе хостинга).
- **Корпоративная почта:** создана, доступы есть.
- **Доступы к хостингу:** ожидаются.

## Что мешает завершить релиз

- Нет размещения `dist/` и API на сервере.
- Нет production `.env` (SMTP) на хостинге.
- Нет SSL и финальной проверки на https://nomadaigroup.com.

## Действия после получения хостинга

1. Собрать: `npm run build`.
2. Разместить `dist/` и настроить nginx (статика + прокси `/api` → Express).
3. Задать `.env` (SMTP) на сервере, запустить `npm run server` (или PM2).
4. DNS: `nomadaigroup.com` → IP хостинга; при необходимости редирект `www`.
5. SSL (Let's Encrypt).
6. Smoke-тест:
   - https://nomadaigroup.com/
   - все внутренние страницы;
   - https://nomadaigroup.com/robots.txt
   - https://nomadaigroup.com/sitemap.xml
   - форма обратной связи → письмо в корпоративный ящик.
7. Google Search Console: отправить sitemap.

## Оценка готовности

| Критерий | Статус |
|----------|--------|
| Дизайн и контент | ✅ |
| Сборка и исходники | ✅ |
| SEO под домен | ✅ |
| API формы (код) | ✅ |
| Деплой на nomadaigroup.com | ⏳ ожидает хостинг |
| Проверка в production | ⏳ после деплоя |

**Формулировка для сдачи:**

> Сайт разработан и подготовлен к размещению на https://nomadaigroup.com. Домен и корпоративная почта готовы. Финальная публикация зависит от доступов к хостингу и настройки SSL/DNS.

## Риски перед публикацией

См. `audit_report.md`:

- обязательна связка статики и `/api` (иначе форма не работает);
- рекомендуется rate limiting и CORS для API;
- проверить доставку SMTP и HTTPS-редиректы.

## Итог

Проект в **высокой степени готовности** к деплою на **nomadaigroup.com**. Для полного завершения нужны только хостинг, настройка сервера и контрольная проверка на боевом домене.
