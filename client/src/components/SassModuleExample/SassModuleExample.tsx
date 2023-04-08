import React, { FC, useState } from 'react';
import cn from 'clsx';
import s from './SassModuleExample.sass';

export type ButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  className?: string;
};

export const SassModuleExample: FC<ButtonProps> = ({ className, ...props }) => {
  const [opened, setOpened] = useState<boolean>(false);
  return (
    <div className={cn(s.root, className)}>
      <button className={s.button} {...props} onClick={() => setOpened(v => !v)} />
      <div className={cn(s.text, opened ? s.opened : s.closed)}>Test</div>
      <div className={cn(s.text, !opened && s.closed)}>Test</div>
      <div className="some-global-class">Global</div>
      <div>Import Variable</div>
    </div>
  );
}