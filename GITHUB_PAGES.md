# Публикация на GitHub Pages

Репозиторий уже настроен для деплоя через GitHub Actions. Осталось создать репозиторий на GitHub и отправить код.

## 1. Создайте репозиторий на GitHub

1. Откройте [github.com/new](https://github.com/new).
2. **Repository name:** `nomad-ai-group` (обязательно такое имя — от него зависит адрес сайта).
3. Описание: `Nomad AI Group — Premium B2B Investment Platform`.
4. Выберите **Public**, не добавляйте README, .gitignore и лицензию.
5. Нажмите **Create repository**.

## 2. Подключите репозиторий и отправьте код

В терминале в папке проекта выполните (подставьте свой логин GitHub вместо `YOUR_USERNAME`):

```bash
cd "/home/noblesse/Nomad AI group"
git remote add origin https://github.com/YOUR_USERNAME/nomad-ai-group.git
git push -u origin main
```

Если используете SSH:

```bash
git remote add origin git@github.com:YOUR_USERNAME/nomad-ai-group.git
git push -u origin main
```

## 3. Включите GitHub Pages

1. В репозитории откройте **Settings** → **Pages**.
2. В блоке **Build and deployment**:
   - **Source:** GitHub Actions.
3. После первого пуша в ветку `main` запустится workflow **Deploy to GitHub Pages**. Дождитесь зелёной галочки во вкладке **Actions**.

## 4. Адрес сайта

Сайт будет доступен по адресу:

**https://YOUR_USERNAME.github.io/nomad-ai-group/**

(обязательно со слэшем в конце для главной страницы)

---

Если репозиторий будет называться иначе (не `nomad-ai-group`), в файле `frontend/next.config.mjs` замените `nomad-ai-group` в `basePath` на имя вашего репозитория.
