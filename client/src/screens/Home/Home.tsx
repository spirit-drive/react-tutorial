import React, { FC } from 'react';
import { Page } from 'src/components/Page';
import { useTranslation } from 'react-i18next';
import { MarkdownView } from '../MarkdownView';
import s from './Home.sass';

export const Home: FC = () => {
  const { t } = useTranslation();
  return (
    <Page title={t`screens.HomeScreen.title`} className={s.root}>
      <MarkdownView className={s.main} data={t`screens.HomeScreen.desc`} />
    </Page>
  );
};

export default Home;
