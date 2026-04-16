# Миграция UI из `new-main-server`

## Зачем начата миграция

Цель `shared-ui-kit` — вынести общий UI-слой из `new-main-server` в отдельный пакет, который потом можно использовать:

- в `new-main-server`;
- в других серверах;
- в новых проектах без копирования компонентов между репозиториями.

На текущем этапе уже выполнены 3 волны переноса, а пакет обратно подключен в `new-main-server/frontend`.

## Источники миграции

Основные исходные точки в `new-main-server`:

- `C:/web/new-main-server/frontend/src/shared/ui`
- `C:/web/new-main-server/frontend/src/app/styles/themes/_maps.scss`
- `C:/web/new-main-server/frontend/src/app/styles/global.scss`
- `C:/web/new-main-server/frontend/src/shared/theme/mui/createAppMuiTheme.ts`

Эти файлы были исходной базой для:

- первых компонентов;
- theme tokens;
- CSS variables;
- минимального MUI bridge.

## Что уже перенесено

### Волна 1

- `Button`
- `Tooltip`
- `IconButton`
- `Loader`
- `Skeleton`

### Волна 2

- `Input`
- `Checkbox`
- `DatePicker`
- `Select`
- `Accordion`

### Волна 3

- `Modal`
- `SearchInput`
- `ErrorMessage`
- `DropdownMenu`
- `FullscreenOverlay`

Также перенесены:

- `UiKitProvider`
- light/dark theme tokens

Текущий публичный вход пакета:

- `C:/web/shared-ui-kit/src/index.ts`

Основные внутренние слои пакета:

- `C:/web/shared-ui-kit/src/components`
- `C:/web/shared-ui-kit/src/providers`
- `C:/web/shared-ui-kit/src/theme`

## Какие решения уже приняты

На текущем этапе приняты следующие решения:

- пакет используется как библиотека переиспользуемых UI-компонентов и UI-patterns, а не как место для бизнес-логики;
- пакет уже интегрирован обратно в `new-main-server/frontend`;
- в `new-main-server` компоненты пакета сейчас используются без глобального `UiKitProvider`;
- для локальной разработки `new-main-server` временно подключает пакет через локальный tarball, а не через symlink на директорию;
- не переносить `localStorage` persistence темы;
- не переносить подписку на `prefers-color-scheme`;
- не переносить app-specific global styles из `new-main-server`;
- не переносить бизнес-логику, API, feature hooks и app runtime;
- не переносить `Snackbar` и `Sidebar` до отдельного аудита, потому что они сильнее привязаны к приложению.

Также пакет сейчас остается библиотекой поверх `MUI`, а не отдельной UI-системой без внешних зависимостей.

## Theme contract текущего этапа

Сейчас поддерживаются только режимы:

- `light`
- `dark`

Источник темы на стороне пакета:

- TS tokens: `C:/web/shared-ui-kit/src/theme/themeTokens.ts`
- CSS variables: `C:/web/shared-ui-kit/src/theme/theme.scss`
- MUI bridge: `C:/web/shared-ui-kit/src/theme/createMuiTheme.ts`
- provider: `C:/web/shared-ui-kit/src/providers/UiKitProvider.tsx`

`UiKitProvider` на текущем этапе:

- подключает `ThemeProvider` из MUI;
- подключает `CssBaseline`;
- пишет CSS variables в `document.documentElement`;
- выставляет атрибут `data-ui-kit-theme`.

Это значит, что тема пока имеет глобальный side effect и должна использоваться осознанно при интеграции в consumer-проект.

## Что именно было важно разорвать при переносе

Во время миграции была цель убрать зависимости на app-specific слой `new-main-server`:

- импорты из `@/app/styles/*`;
- зависимость от app-wide global styles;
- зависимость от глобального `btn-reset`;
- зависимость от app runtime темы.

Итоговая идея:

- компонент должен зависеть только от самого `shared-ui-kit`;
- theme слой должен жить внутри пакета;
- UI-слой не должен тянуть бизнес-часть исходного приложения.

## Что уже сделано в consumer

В `new-main-server/frontend` уже сделано:

- подключен `@sorbent/ui-kit/styles.css`;
- локальные импорты перенесенных компонентов заменены на пакетные;
- локальные реализации трех волн удалены;
- для локальной разработки используется tarball-подключение пакета.

Текущая dev-схема подключения:

- `file:../../shared-ui-kit/sorbent-ui-kit-0.3.0.tgz`

Эта схема временная. Целевая модель на будущее:

- публикация `@sorbent/ui-kit` в registry;
- установка в consumer-проекты как обычной npm-зависимости.

## Что делать следующим шагом

Следующие логичные шаги:

- отдельно проаудировать `Snackbar`;
- отдельно проаудировать `Sidebar`;
- решить, что из remaining shared UI стоит считать частью `ui-kit`, а что отдельным app-specific слоем;
- описать финальный процесс публикации пакета в registry.

## Что еще остается временным

Текущее состояние пакета еще не финальное:

- theme contract еще неполный и все еще отражает subset исходной темы;
- public API уже шире базового UI-kit и включает несколько reusable UI-patterns;
- процесс публикации пакета в registry пока не настроен;
- локальная схема через `.tgz` не является финальной production-моделью.

## Как использовать этот файл в новом чате

Если в новом чате потеряется контекст, достаточно открыть:

- `README.md` — чтобы быстро понять, что это за пакет и как он должен использоваться;
- `MIGRATION.md` — чтобы восстановить, откуда идет миграция, что уже сделано и что является следующим шагом.
