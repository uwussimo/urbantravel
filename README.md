# Urban Travel — urban-travel.uz

Сайт туристического агентства Urban Travel (Ташкент): туры в Китай, RU/UZ.
Next.js 16 (App Router) + Tailwind CSS 4 + shadcn/ui. Работает на Netlify и Vercel.

## Разработка

```bash
npm install
cp .env.example .env.local   # заполните переменные
npm run dev                  # http://localhost:3000
```

## Переменные окружения

| Переменная | Обязательна | Назначение |
| --- | --- | --- |
| `TELEGRAM_BOT_TOKEN` | да | Бот, принимающий заявки с формы бронирования |
| `TELEGRAM_CHAT_ID` | да | Чат, куда бот шлёт заявки |
| `ADMIN_PASSWORD` | да | Пароль входа в админ-панель `/admin` |
| `ADMIN_SESSION_SECRET` | нет | Отдельный секрет для cookie-сессий (по умолчанию — `ADMIN_PASSWORD`) |
| `BLOB_READ_WRITE_TOKEN` | только на Vercel | Vercel Blob; на Netlify не нужен (используются Netlify Blobs) |
| `NEXT_PUBLIC_GA_ID` | нет | Google Analytics 4 |
| `NEXT_PUBLIC_YM_ID` | нет | Яндекс Метрика |

## Админ-панель

`/admin` — управление турами: создание, редактирование (RU/UZ), загрузка фото,
архивирование и удаление. Архивные туры скрываются из списков и sitemap, но их
страницы остаются доступны с пометкой «тур завершён» (noindex).

Данные туров хранятся одним JSON-документом; бэкенд выбирается автоматически:

- **Netlify:** встроенные Netlify Blobs — настраивать нечего. Загруженные фото
  раздаются через `/api/photos/...`. Добавьте только `ADMIN_PASSWORD`
  (Site configuration → Environment variables).
- **Vercel:** Vercel Blob (`data/tours.json`), фото — там же. В дашборде:
  Storage → Create Database → Blob (`BLOB_READ_WRITE_TOKEN` подставится сам),
  плюс `ADMIN_PASSWORD` в Settings → Environment Variables.
- **Локально:** файл `.data/tours.json` (в gitignore), фото — `public/uploads/`.

Если хранилище пусто, туры берутся из сида `lib/tours.ts` (`seedTours`).

## Структура

- `lib/tours.ts` — модель тура + сид-данные
- `lib/tour-store.ts` — чтение/запись туров (Blob или локальный файл)
- `app/admin/*`, `app/api/admin/*` — админ-панель и её API
- `app/api/book/route.ts` — заявки с формы → Telegram
- `PHOTO-CREDITS.md` — атрибуция стоковых фото (CC BY / CC BY-SA)
