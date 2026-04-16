# `@sorbent/ui-kit`

`shared-ui-kit` это библиотека общих UI-компонентов, выделяемая из `new-main-server` для повторного использования в других проектах.

Сейчас пакет находится на первом этапе миграции:

- уже вынесен базовый набор компонентов;
- добавлен минимальный `UiKitProvider`;
- выделены light/dark theme tokens;
- обратная интеграция в `new-main-server` еще не начата.

Подробный контекст миграции находится в [MIGRATION.md](./MIGRATION.md).

## Текущий стек

- `React 19`
- `MUI 7`
- `Emotion 11`
- `TypeScript`
- `SCSS`
- `Vite` как сборщик библиотеки

## Текущий публичный API

Публичные экспорты описаны в `src/index.ts`:

- `CustomButton`
- `CustomTooltip`
- `IconButton`
- `Loader`
- `Skeleton`
- `UiKitProvider`
- `themeTokens`
- `UiKitThemeMode`

На текущем этапе поддерживается только импорт из корня пакета. Deep-import'ы считаются нестабильными.

```ts
import { CustomButton, CustomTooltip, IconButton, Loader, Skeleton, UiKitProvider } from '@sorbent/ui-kit';
```

## Быстрый старт

### 1. Установить пакет и peer dependencies

Пакет ожидает наличие:

- `react`
- `react-dom`
- `@mui/material`
- `@mui/icons-material`
- `@emotion/react`
- `@emotion/styled`

### 2. Обернуть приложение в `UiKitProvider`

```tsx
import { UiKitProvider } from '@sorbent/ui-kit';

export function AppRoot() {
  return <UiKitProvider theme="light">{/* app */}</UiKitProvider>;
}
```

### 3. Использовать компоненты из пакета

```tsx
import { CustomButton, Loader } from '@sorbent/ui-kit';

export function Example() {
  return (
    <>
      <CustomButton>Сохранить</CustomButton>
      <Loader size="small" />
    </>
  );
}
```

### 4. Подключение стилей

Пакет экспортирует собранный CSS как `@sorbent/ui-kit/styles.css`.

Если потребительская сборка не подтягивает CSS автоматически через импорт компонентов, подключай его явно:

```ts
import '@sorbent/ui-kit/styles.css';
```

## Темизация

Сейчас пакет поддерживает только 2 режима:

- `light`
- `dark`

`UiKitProvider` делает две вещи:

- подключает MUI `ThemeProvider` и `CssBaseline`;
- выставляет CSS variables на `document.documentElement` через атрибут `data-ui-kit-theme`.

Это важно учитывать, потому что тема кита сейчас имеет глобальный side effect на root-элемент документа.

Источник текущих токенов:

- TS tokens: `src/theme/themeTokens.ts`
- CSS variables: `src/theme/theme.scss`
- MUI bridge: `src/theme/createMuiTheme.ts`

Минимальный набор токенов первого этапа:

- `hulk`
- `white`
- `black`
- `carbon`
- `surface-elevated`
- `surface-hover`
- `shadow-soft`
- `icon-hover-bg`
- `mui-tooltip-bg`
- `mui-tooltip-fg`

## Scope пакета

В `shared-ui-kit` сейчас допустимо выносить:

- базовые UI-компоненты;
- theme/tokens/provider;
- thin wrappers над MUI;
- стили, которые не завязаны на конкретное приложение.

Пока не нужно класть сюда:

- бизнес-логику;
- API;
- feature hooks;
- роутинг;
- store;
- app-specific runtime и стили из `new-main-server`.

## Что уже перенесено

Из `new-main-server` в пакет уже перенесены:

- `CustomButton`
- `CustomTooltip`
- `IconButton`
- `Loader`
- `Skeleton`
- минимальный `UiKitProvider`
- light/dark tokens первого этапа

## Ограничения текущего этапа

Сейчас сознательно не сделано:

- интеграция обратно в `new-main-server`;
- `localStorage` persistence темы;
- подписка на `prefers-color-scheme`;
- перенос полного набора design tokens;
- перенос app-wide global styles;
- перенос feature-level и business-level кода.

Также в репозитории могут оставаться шаблонные или demo-файлы от исходного Vite-проекта. Они не считаются частью публичного API.

## Скрипты

```bash
npm run build
npm run lint
npm run format
```

## Что читать дальше

- [MIGRATION.md](./MIGRATION.md) — зачем начат перенос, что уже вынесено и что будет следующим шагом.
