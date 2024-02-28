import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from 'src/shared/ui/Page';
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
