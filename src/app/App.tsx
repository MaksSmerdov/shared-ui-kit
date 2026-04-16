import { useState } from 'react';
import { Button, Tooltip, IconButton, Loader, Skeleton, UiKitProvider } from '../index';
import type { UiKitThemeMode } from '../index';
import './App.css';

function App() {
  const [theme, setTheme] = useState<UiKitThemeMode>('light');

  return (
    <UiKitProvider theme={theme}>
      <main className="ui-kit-demo">
        <section className="ui-kit-demo__header">
          <div>
            <p className="ui-kit-demo__eyebrow">@sorbent/ui-kit</p>
            <h1 className="ui-kit-demo__title">Локальный playground компонентов</h1>
            <p className="ui-kit-demo__description">
              Эта страница нужна только для локальной проверки UI-kit во время разработки.
            </p>
          </div>

          <div className="ui-kit-demo__theme-switcher">
            <Button
              type="button"
              variant={theme === 'light' ? 'primary' : 'secondary'}
              isActive={theme === 'light'}
              onClick={() => {
                setTheme('light');
              }}
            >
              Light
            </Button>
            <Button
              type="button"
              variant={theme === 'dark' ? 'primary' : 'secondary'}
              isActive={theme === 'dark'}
              onClick={() => {
                setTheme('dark');
              }}
            >
              Dark
            </Button>
          </div>
        </section>

        <section className="ui-kit-demo__grid">
          <article className="ui-kit-demo__card">
            <h2 className="ui-kit-demo__card-title">Buttons</h2>
            <div className="ui-kit-demo__row">
              <Button type="button">Primary</Button>
              <Button type="button" variant="secondary">
                Secondary
              </Button>
              <Button type="button" variant="mui">
                MUI
              </Button>
            </div>
          </article>

          <article className="ui-kit-demo__card">
            <h2 className="ui-kit-demo__card-title">Loader и Skeleton</h2>
            <div className="ui-kit-demo__row">
              <Loader size="small" />
              <Loader size="medium" />
            </div>
            <div className="ui-kit-demo__skeletons">
              <Skeleton width={180} height={16} variant="text" />
              <Skeleton width={180} height={40} />
              <Skeleton width={48} height={48} variant="circle" />
            </div>
          </article>

          <article className="ui-kit-demo__card">
            <h2 className="ui-kit-demo__card-title">Tooltip и IconButton</h2>
            <div className="ui-kit-demo__row">
              <IconButton
                aria-label="Information"
                icon={<span className="ui-kit-demo__icon">i</span>}
                tooltip="Пример tooltip из UI-kit"
              />
              <Tooltip title="Tooltip без оберток">
                <span className="ui-kit-demo__tooltip-target">Наведи курсор</span>
              </Tooltip>
            </div>
          </article>
        </section>
      </main>
    </UiKitProvider>
  );
}

export default App;
