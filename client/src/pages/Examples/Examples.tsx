import React, { FC, useState, Key, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
import { Page } from 'src/shared/ui/Page';
import { Tabs, TabsItem } from 'src/shared/ui/Tabs';
import { ModalExample } from './ModalExample';
import { MovableExample } from './MovableExample';
import { SortableListExample } from './SortableListExample';
import { WaveSliderExample } from './WaveSliderExample';
import { InputsExample } from './InputsExample';
import s from './Examples.sass';

export enum ExampleKey {
  modal = 'modal',
  movable = 'movable',
  sortableList = 'sortableList',
  waveSlider = 'waveSlider',
  inputs = 'inputs',
}

const examples = {
  [ExampleKey.modal]: <ModalExample />,
  [ExampleKey.movable]: <MovableExample />,
  [ExampleKey.sortableList]: <SortableListExample />,
  [ExampleKey.waveSlider]: <WaveSliderExample />,
  [ExampleKey.inputs]: <InputsExample />,
};

const getContent = (key: string) => () => {
  const { t } = useTranslation();

  return <>{t(`enums.ExampleKey.${key}`)}</>;
};

const tabs: TabsItem[] = Object.keys(examples).map((key) => {
  const Content = getContent(key);
  return { key, content: <Content /> };
});

export const Examples: FC = () => {
  const { mode } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [activeKey, setActiveKey] = useState<Key>(mode || ExampleKey.modal);
  useEffect(() => {
    navigate(activeKey.toString());
  }, [navigate, activeKey]);
  return (
    <Page title={t`screens.ExamplesScreen.title`} className={s.root}>
      <Tabs tabs={tabs} onTab={setActiveKey} activeKey={activeKey} />
      <div>
        <Routes>
          {Object.keys(ExampleKey).map((key: ExampleKey) => (
            <Route path={key} key={key} element={examples[key]} />
          ))}
        </Routes>
      </div>
    </Page>
  );
};

export default Examples;
