# `@sorbent/ui-kit`

`shared-ui-kit` это библиотека общих UI-компонентов, выделенная из `new-main-server` для повторного использования в других проектах.

На текущем этапе:

- уже перенесены 3 волны UI-компонентов;
- пакет обратно интегрирован в `new-main-server/frontend`;
- внутри пакета живут light/dark theme tokens и минимальный `UiKitProvider`;
- для локальной разработки `new-main-server` временно подключает пакет через локальный tarball.

Подробный контекст миграции находится в [MIGRATION.md](./src/docs/MIGRATION.md).

## Стек

- `React 19`
- `MUI 7`
- `Emotion 11`
- `TypeScript`
- `SCSS`
- `Vite`

## Публичный API

Публичные экспорты описаны в `src/index.ts`:

- `Button`
- `Modal`
- `Input`
- `inputClassNames`
- `Checkbox`
- `DatePicker`
- `SearchInput`
- `ErrorMessage`
- `Select`
- `DropdownMenu`
- `Accordion`
- `FullscreenOverlay`
- `Tooltip`
- `IconButton`
- `Loader`
- `Skeleton`
- `UiKitProvider`
- `themeTokens`
- `UiKitThemeMode`

Поддерживается только импорт из корня пакета. Deep-import'ы считаются нестабильными.

```ts
import {
  Button,
  Modal,
  Input,
  Checkbox,
  DatePicker,
  SearchInput,
  ErrorMessage,
  Select,
  DropdownMenu,
  Accordion,
  FullscreenOverlay,
  Tooltip,
  IconButton,
  Loader,
  Skeleton,
  UiKitProvider,
} from '@sorbent/ui-kit';
```

## Установка

### Peer dependencies

Пакет ожидает наличие:

- `react`
- `react-dom`
- `@mui/material`
- `@mui/icons-material`
- `@mui/x-date-pickers`
- `@emotion/react`
- `@emotion/styled`
- `dayjs`
- `react-hook-form`
- `react-select`

### Подключение стилей

Пакет экспортирует собранный CSS как `@sorbent/ui-kit/styles.css`.

```ts
import '@sorbent/ui-kit/styles.css';
```

## Быстрый старт

### Использование компонентов

```tsx
import { Button, Input, Loader } from '@sorbent/ui-kit';

export function Example() {
  return (
    <>
      <Input label="Название" value="" onChange={() => {}} />
      <Button>Сохранить</Button>
      <Loader size="small" />
    </>
  );
}
```

### `UiKitProvider`

`UiKitProvider` нужен, если consumer хочет использовать theme contract пакета как самостоятельный слой:

```tsx
import { UiKitProvider } from '@sorbent/ui-kit';

export function AppRoot() {
  return <UiKitProvider theme="light">{/* app */}</UiKitProvider>;
}
```

Важно: в `new-main-server` пакетные компоненты сейчас используются без глобального `UiKitProvider`, чтобы не конфликтовать с существующей темой приложения.

## Темизация

Сейчас пакет поддерживает 2 режима:

- `light`
- `dark`

`UiKitProvider`:

- подключает MUI `ThemeProvider` и `CssBaseline`;
- выставляет CSS variables на `document.documentElement`;
- использует атрибут `data-ui-kit-theme`.

Это значит, что theme layer пакета по-прежнему имеет глобальный side effect на root-элемент документа.

Источники темы:

- TS tokens: `src/theme/themeTokens.ts`
- CSS variables: `src/theme/theme.scss`
- MUI bridge: `src/theme/createMuiTheme.ts`
- provider: `src/providers/UiKitProvider.tsx`

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

## Scope пакета

В `shared-ui-kit` допустимо выносить:

- базовые UI-компоненты;
- UI wrappers и reusable visual patterns;
- theme/tokens/provider;
- thin wrappers над MUI;
- стили, не завязанные на конкретный consumer.

Пока не нужно класть сюда:

- бизнес-логику;
- API;
- feature hooks;
- роутинг;
- store;
- app-specific runtime;
- app-specific providers;
- layout, который знает про конкретное приложение.

На текущем этапе сознательно не вынесены:

- `Snackbar`
- `Sidebar`

## Локальная разработка

Сейчас `new-main-server/frontend` временно использует пакет через локальный tarball:

- `file:../../shared-ui-kit/sorbent-ui-kit-0.3.0.tgz`

Это временная dev-схема, введенная для избежания проблем с symlink и дублированием runtime-зависимостей во время локальной разработки.

Финальная целевая схема:

- публикация `@sorbent/ui-kit` в registry;
- установка в consumer-проекты обычным `npm i`.

## Release / Publish Workflow

### Текущий локальный workflow

Пока пакет не публикуется в registry, локальный цикл разработки такой:

1. внести изменения в `shared-ui-kit`;
2. выполнить:

```bash
npm run build
npm pack
```

3. обновить пакет в consumer-проекте:

```bash
npm install ../../shared-ui-kit/sorbent-ui-kit-0.3.0.tgz --force
```

4. в consumer-проекте прогнать проверки:

```bash
npm run typecheck
npm run lint
npm run build
```

Если запущен dev-сервер consumer-приложения, его лучше перезапустить после обновления tarball.

### Целевой workflow через registry

После настройки публикации желаемый процесс должен быть таким:

1. внести изменения в `shared-ui-kit`;
2. обновить версию в `package.json`;
3. прогнать:

```bash
npm run build
npm run lint
npm run format
```

4. опубликовать пакет в registry;
5. в consumer-проекте установить новую версию:

```bash
npm install @sorbent/ui-kit@latest
```

или фиксированную:

```bash
npm install @sorbent/ui-kit@0.3.0
```

Цель этой схемы:

- убрать зависимость от `.tgz`;
- убрать ручное локальное переподключение пакета;
- перейти к обычному `npm i` в каждом consumer-проекте.

## Скрипты

```bash
npm run build
npm run lint
npm run format
```

## Что читать дальше

- [src/docs/MIGRATION.md](./src/docs/MIGRATION.md) — история миграции, принятые решения и текущее состояние.
