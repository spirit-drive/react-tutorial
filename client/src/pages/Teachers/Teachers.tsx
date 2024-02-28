import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from 'src/shared/ui/Page';
import { MarkdownView } from '../MarkdownView';
import s from './Teachers.sass';

export const Teachers: FC = () => {
  const { t } = useTranslation();

  return (
    <Page title={t`screens.TeachersScreen.title`} className={s.root}>
      <MarkdownView className={s.main} data={t`screens.TeachersScreen.desc`} />
    </Page>
  );
};

export default Teachers;
