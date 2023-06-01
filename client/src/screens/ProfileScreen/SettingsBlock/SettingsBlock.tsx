import React, { memo } from 'react';
import cn from 'clsx';
import { Divider } from 'antd';
import { ProfileCompletedForm } from '../ProfileCompletedForm';
import { ChangePasswordCompletedForm } from '../ChangePasswordCompletedForm';
import s from './SettingsBlock.sass';

export type SettingsBlockProps = {
  className?: string;
};

export const SettingsBlock = memo<SettingsBlockProps>(({ className }) => (
  <div className={cn(s.root, className)}>
    <ProfileCompletedForm />
    <Divider />
    <ChangePasswordCompletedForm />
  </div>
));

SettingsBlock.displayName = 'SettingsBlock';
