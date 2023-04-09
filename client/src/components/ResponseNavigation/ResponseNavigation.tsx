import React, { memo, useEffect, useRef, useState } from 'react';
import cn from 'clsx';
import { useOpenCloseNotMemo } from 'src/hooks/useOpenCloseNotMemo';
import { CloseOutlined, MenuOutlined } from '@ant-design/icons';
import s from './ResponseNavigation.sass';

export type ResponseNavigationItem = {
  key: string;
  horizontalElem: React.ReactNode;
  verticalElem: React.ReactNode;
};

export type ResponseNavigationProps = {
  className?: string;
  left?: ResponseNavigationItem[];
  right?: ResponseNavigationItem[];
  title?: React.ReactNode;
};

export const ResponseNavigation = memo<ResponseNavigationProps>(({ className, title, right, left }) => {
  const [opened, { open, close }] = useOpenCloseNotMemo();
  const [mobile, setMobile] = useState<boolean>(false);

  const root = useRef<HTMLDivElement>();

  useEffect(() => {
    const fn = () => setMobile(root.current && root.current.scrollHeight > root.current.offsetHeight);
    const mutation = new MutationObserver(fn);
    const resize = new ResizeObserver(fn);

    mutation.observe(root.current, { subtree: true, childList: true });
    resize.observe(root.current);
    return () => {
      mutation.disconnect();
      resize.disconnect();
    };
  }, []);

  return (
    <div className={cn(s.root, className)}>
      <nav ref={root} className={cn(s.wrapper, mobile && s.mobile)}>
        <ul className={s.elem}>
          {left.map((i) => (
            <li className={s.li} key={i.key}>
              {i.horizontalElem}
            </li>
          ))}
        </ul>
        <ul className={s.elem}>
          {right.map((i) => (
            <li className={s.li} key={i.key}>
              {i.horizontalElem}
            </li>
          ))}
        </ul>
      </nav>
      <button type="button" onClick={open} className={cn(s.menu, s.menuButton, mobile && s.mobile)}>
        <MenuOutlined />
      </button>
      <div className={cn(s.holder, opened && s.opened)}>
        <div className={s.closeHolder}>
          <div className={s.menuTitle}>{title}</div>
          <button type="button" onClick={close} className={s.menuButton}>
            <CloseOutlined />
          </button>
        </div>
        <nav>
          <ul>
            {left.map((i) => (
              <li role="presentation" onClick={close} className={s.li} key={i.key}>
                {i.verticalElem}
              </li>
            ))}
          </ul>
          <ul>
            {right.map((i) => (
              <li role="presentation" onClick={close} className={s.li} key={i.key}>
                {i.verticalElem}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
});

ResponseNavigation.displayName = 'ResponseNavigation';
