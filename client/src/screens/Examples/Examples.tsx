import React, { FC } from 'react';
import { Page } from 'src/components/Page';
import s from './Examples.sass';

export const Examples: FC = () => (
  <Page title="Examples" className={s.root}>
    Examples
  </Page>
);

export default Examples;
