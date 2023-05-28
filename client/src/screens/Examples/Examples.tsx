import React, { FC, useState, Key, useEffect } from 'react';
import { Page } from 'src/components/Page';
import { Tabs, TabsItem } from '../../components/Tabs';
import { useTranslation } from 'react-i18next';
import { ModalExample } from './ModalExample';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { MovableExample } from './MovableExample';
import { SortableListExample } from './SortableListExample';
import { WaveSliderExample } from './WaveSliderExample';
import s from './Examples.sass';

export enum ExampleKey {
  modal = 'modal',
  movable = 'movable',
  sortableList = 'sortableList',
  waveSlider = 'waveSlider',
}

const examples = {
  [ExampleKey.modal]: <ModalExample />,
  [ExampleKey.movable]: <MovableExample />,
  [ExampleKey.sortableList]: <SortableListExample />,
  [ExampleKey.waveSlider]: <WaveSliderExample />,
};

const getContent = (key: string) => () => {
  const { t } = useTranslation();

  return t(`enums.ExampleKey.${key}`);
};

const tabs: TabsItem[] = Object.keys(examples).map((key) => {
  const Content = getContent(key);
  return { key, content: <Content /> };
});

export const Examples: FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [activeKey, setActiveKey] = useState<Key>(ExampleKey.modal);
  useEffect(() => {
    navigate(activeKey.toString());
  }, [navigate, activeKey]);
  return (
    <Page title={t`screens.ExamplesScreen.title`} className={s.root}>
      <Tabs tabs={tabs} onTab={setActiveKey} activeKey={activeKey} />
      <div>
        <Routes>
          {Object.keys(ExampleKey).map((key) => (
            <Route path={key} element={examples[key]} />
          ))}
        </Routes>
      </div>
    </Page>
  );
};

export default Examples;
