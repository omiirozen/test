# News App - Mobile Application

Кроссплатформенное мобильное приложение для просмотра новостей с поддержкой биометрической аутентификации, push-уведомлений и управления избранными статьями.

## Описание проекта

Приложение предоставляет:
- Загрузку и отображение списка новостей с публичного API
- Поиск статей
- Детальный просмотр статей через встроенный WebView
- Сохранение избранных статей в локальном хранилище
- Push-уведомления о новых новостях
- Отправку файлов
- Управление профилем пользователя с функцией logout

## Технологический стек

### Mobile
- **React Native** - кроссплатформенная разработка
- **TypeScript** - типизация
- **Redux** - управление состоянием приложения
- **RTK Query** - работа с API и кэшированием
- **React Navigation** - навигация между экранами
- **AsyncStorage** - локальное хранилище данных

### Web (Admin Panel)
- **Next.js** - фреймворк для веб-приложения
- **Tailwind CSS** - стилизация
- **Shadcn** - компоненты UI

### Архитектура
- **Feature-Sliced Design (FSD)** - модульная структура проекта

## Структура проекта

```
project-root/
├── mobile/                    # React Native приложение
│   ├── src/
│   │   ├── features/         # Бизнес-логика по доменам (FSD)
│   │   │   ├── news/         # Функционал новостей
│   │   │   ├── auth/         # Аутентификация
│   │   │   ├── favorites/    # Управление избранным
│   │   │   └── files/        # Отправка и скачивание файлов
│   │   ├── shared/           # Общие компоненты и утилиты
│   │   │   ├── components/   # Переиспользуемые компоненты
│   │   │   ├── hooks/        # Кастомные хуки
│   │   │   ├── api/          # Конфигурация API
│   │   │   └── utils/        # Утилиты и помощники
│   │   ├── app/              # Точка входа приложения
│   │   └── store/            # Redux store конфигурация
│   ├── App.tsx               # Root компонент
│   ├── package.json
│   ├── tsconfig.json
│   └── app.json              # Expo конфигурация
├── web/                       # Next.js администраторская панель
│   ├── src/
│   │   ├── app/              # App router
│   │   ├── components/       # React компоненты
│   │   └── pages/
│   ├── package.json
│   └── tsconfig.json
├── README.md
└── .gitignore
```

## Установка и запуск

### Предварительные требования

- **Node.js** (версия 16+)
- **npm** или **yarn**
- **Expo CLI** (для мобильного приложения)
- **Android Studio** или **Xcode** (для эмуляции)

### Установка зависимостей

#### Mobile приложение
```bash
cd mobile
npm install
# или
yarn install
```

#### Web приложение
```bash
cd web
npm install
# или
yarn install
```

### Запуск приложения

#### React Native (Expo)
```bash
cd mobile
npm start
# или
expo start
```

**На Android:**
```bash
npm run android
```

**На iOS:**
```bash
npm run ios
```

#### Web приложение
```bash
cd web
npm run dev
```

Приложение будет доступно на `http://localhost:3000`

## ⚙️ Конфигурация

### API Ключ NewsAPI

1. Перейдите на сайт [NewsAPI.org](https://newsapi.org)
2. Зарегистрируйтесь и получите API ключ
3. Создайте файл `.env.local` в папке `mobile/`:

```env
EXPO_PUBLIC_NEWS_API_KEY=your_api_key_here
EXPO_PUBLIC_API_BASE_URL=https://newsapi.org/v2
```

### Push-уведомления

Приложение использует **Expo Notifications** для push-уведомлений. Конфигурация автоматическая через app.json.

### Биометрическая аутентификация

Приложение поддерживает:
- **Touch ID** (iOS, Android)
- **Face ID** (iOS)
- **Biometric API** (Android)

## Основные функции

### 1. Аутентификация
- авторизация при запуске
- Функция logout с очисткой кэша и сессии
- Сохранение статуса аутентификации

### 2. Список новостей
- Бесконечная прокрутка (pagination)
- Поиск по заголовкам и ключевым словам

### 3. Детальный просмотр
- Встроенный WebView для полной статьи
- Кнопка добавления в избранное
- Навигация назад к списку

### 4. Избранное
- Сохранение в AsyncStorage
- Удаление из избранного
- Синхронизация со списком

### 5. Файловые операции
- Отправка фотографий и документов
- Обработка ошибок при загрузке

### 6. Push-уведомления
- Уведомления о новых статьях
- Обработка нажатия на уведомление
- Навигация к статье из уведомления

## Тестирование

### Запуск тестов
```bash
cd mobile
npm test
```

### Юнит-тесты
```bash
npm run test:unit
```

### Интеграционные тесты
```bash
npm run test:e2e
```

## Commits и Git Flow

Проект следует **Git Flow** подходу:

```bash
# Для новой функции
git checkout -b feature/feature-name

# Для багфиксов
git checkout -b bugfix/bug-name

# Коммиты должны быть описательными
git commit -m "feat: add biometric authentication"
git commit -m "fix: resolve WebView rendering issue"
```

## Стиль кода

- **ESLint** - линтер кода
- **TypeScript** - строгая типизация

### Проверка кода
```bash
npm run lint
npm run format
```

## Архитектурные решения

### Feature-Sliced Design (FSD)
Каждая функция (feature) полностью независима и содержит все необходимое:
- UI компоненты
- API логику
- Redux слайсы
- Тесты
- Типы

Это обеспечивает масштабируемость и удобство разработки в команде.

### Redux + RTK Query
- **Redux** управляет глобальным состоянием (аутентификация, UI)
- **RTK Query** управляет серверным состоянием и кэшем

### Асинхронные операции
Используется `createAsyncThunk` для обработки асинхронных операций с правильной обработкой ошибок.

## Обработка ошибок

Приложение корректно обрабатывает:
- Ошибки сетевого соединения
- Ошибки API
- Ошибки файловых операций
- Таймауты запросов

Пользователь получает понятные сообщения об ошибках с возможностью повтора операции.

## Дополнительные ресурсы

- [React Native Documentation](https://reactnative.dev)
- [Expo Documentation](https://docs.expo.dev)
- [Redux Documentation](https://redux.js.org)
- [Feature-Sliced Design](https://feature-sliced.design)
- [Next.js Documentation](https://nextjs.org/docs)

## Автор

omiirozen

## Лицензия

MIT

---

## ⚡ Быстрый старт

```bash
# 1. Клонировать репозиторий
git clone https://github.com/omiirozen/test.git
cd test

# 2. Установить зависимости мобильного приложения
cd mobile
npm install

# 3. Создать .env.local с API ключом
echo "EXPO_PUBLIC_NEWS_API_KEY=your_key" > .env.local

# 4. Запустить приложение
npm start

# На Android
npm run android

# На iOS
npm run ios
```
