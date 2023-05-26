import React, { FC } from 'react';
import { Frame } from 'src/components/Frame';
import { SettingsBlock } from './SettingsBlock';
import { useTranslation } from 'react-i18next';
import s from './ProfileScreen.sass';

export const ProfileScreen: FC = () => {
  const { t } = useTranslation();
  return (
    <Frame className={s.frame}>
      <h1 className={s.title}>{t`screens.ProfileScreen.title`}</h1>
      <div className={s.page}>
        <SettingsBlock className={s.block} />
      </div>
    </Frame>
  );
};

export default ProfileScreen;
