import React, { memo } from 'react';
import { Helmet } from 'react-helmet';

export const defaultSetting = {
  titleTemplate: '%s - React Otus',
  defaultTitle: 'React Otus',
};

export const Head = memo(() => (
  <Helmet {...defaultSetting}>
    <meta name="description" content="Курс react.js для новичков и профессионалов" />
  </Helmet>
));

Head.displayName = 'Head';
