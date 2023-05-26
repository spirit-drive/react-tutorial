import React, { FC } from 'react';
import { Page } from 'src/components/Page';
import s from './Home.sass';

export const Home: FC = () => (
  <Page title={'Home'} className={s.root}>
    Home
  </Page>
);

export default Home;
