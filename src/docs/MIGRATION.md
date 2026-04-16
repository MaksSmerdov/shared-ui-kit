# Миграция UI из `new-main-server`

## Зачем начата миграция

Цель `shared-ui-kit` — вынести общий UI-слой из `new-main-server` в отдельный пакет, который потом можно использовать:

- в `new-main-server`;
- в других серверах;
- в новых проектах без копирования компонентов между репозиториями.

На текущем этапе задача ограничена только переносом первых базовых компонентов и минимального слоя темы. Интеграция обратно в приложения будет следующим шагом.

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

Первая волна миграции уже включает:

- `Button`
- `Tooltip`
- `IconButton`
- `Loader`
- `Skeleton`
- `UiKitProvider`
- light/dark theme tokens

Текущий публичный вход пакета:

- `C:/web/shared-ui-kit/src/index.ts`

Основные внутренние слои пакета:

- `C:/web/shared-ui-kit/src/components`
- `C:/web/shared-ui-kit/src/providers`
- `C:/web/shared-ui-kit/src/theme`

## Какие решения уже приняты

На первом этапе принято следующее:

- не интегрировать пакет обратно в `new-main-server`;
- не переносить `localStorage` persistence темы;
- не переносить подписку на `prefers-color-scheme`;
- использовать только минимальный subset theme tokens;
- не переносить app-specific global styles из `new-main-server`;
- не переносить бизнес-логику, API, feature hooks и app runtime.

Также пакет сейчас остается библиотекой поверх `MUI`, а не отдельной UI-системой без внешних зависимостей.

## Theme contract первого этапа

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

Во время первого этапа была цель убрать зависимости на app-specific слой `new-main-server`:

- импорты из `@/app/styles/*`;
- зависимость от app-wide global styles;
- зависимость от глобального `btn-reset`;
- зависимость от app runtime темы.

Итоговая идея первого этапа:

- компонент должен зависеть только от самого `shared-ui-kit`;
- theme слой должен жить внутри пакета;
- UI-слой не должен тянуть бизнес-часть исходного приложения.

## Что делать следующим шагом

Следующий этап после этой документации:

- подключить `@sorbent/ui-kit` в `new-main-server`;
- заменить локальные импорты перенесенных компонентов на пакетные;
- проверить, как тема кита сочетается с темой приложения;
- определить правила подключения `@sorbent/ui-kit/styles.css` в consumer;
- переносить следующую волну компонентов.

Кандидаты на следующий перенос после текущей пятерки:

- `Input`
- `Checkbox`
- `DatePicker`
- `Select`
- `Accordion`

## Что еще остается временным

Текущее состояние пакета еще не финальное:

- возможны шаблонные или demo-файлы от исходного Vite-проекта;
- theme contract еще минимальный;
- public API еще небольшой;
- процесс публикации пакета и интеграции в другие серверы пока не настроен.

## Как использовать этот файл в новом чате

Если в новом чате потеряется контекст, достаточно открыть:

- `README.md` — чтобы быстро понять, что это за пакет и как он должен использоваться;
- `MIGRATION.md` — чтобы восстановить, откуда идет миграция, что уже сделано и что является следующим шагом.
