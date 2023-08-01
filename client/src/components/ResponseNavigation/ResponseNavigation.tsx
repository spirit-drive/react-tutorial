import React, { memo, useLayoutEffect, useRef, useState } from 'react';
import cn from 'clsx';
import { CloseOutlined, MenuOutlined } from '@ant-design/icons';
import { useOpenCloseNotMemo } from 'src/hooks/useOpenCloseNotMemo';
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

  useLayoutEffect(() => {
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
    <div className={cn(s.root, className, 'response-navigation')}>
      <nav ref={root} className={cn(s.wrapper, mobile && s.mobile)}>
        <ul className={cn(s.elem, s.list, 'response-navigation__list_hor_left response-navigation__list_hor')}>
          {left?.map((i) => (
            <li
              className={`${s.li} response-navigation__list-item response-navigation__list-item_hor response-navigation__list-item_hor_left`}
              key={i.key}
            >
              {i.horizontalElem}
            </li>
          ))}
        </ul>
        <ul className={cn(s.elem, s.list, 'response-navigation__list_hor_right response-navigation__list_hor')}>
          {right?.map((i) => (
            <li
              className={`${s.li} response-navigation__list-item response-navigation__list-item_hor response-navigation__list-item_hor_right`}
              key={i.key}
            >
              {i.horizontalElem}
            </li>
          ))}
        </ul>
      </nav>
      <button
        type="button"
        onClick={open}
        className={`${cn(
          s.menu,
          s.menuButton,
          mobile && s.mobile
        )} response-navigation__icon response-navigation__icon_open`}
      >
        <MenuOutlined />
      </button>
      <div className={cn(s.holder, opened && s.opened)}>
        <div className={s.closeHolder}>
          <div className={s.menuTitle}>{title}</div>
          <button
            type="button"
            onClick={close}
            className={`${s.menuButton} response-navigation__icon response-navigation__icon_close`}
          >
            <CloseOutlined />
          </button>
        </div>
        <nav>
          <ul className={`${s.list} response-navigation__list_ver response-navigation__list_ver_left`}>
            {left?.map((i) => (
              <li
                role="presentation"
                onClick={close}
                className={`${s.li} response-navigation__list-item response-navigation__list-item_ver response-navigation__list-item_ver_left`}
                key={i.key}
              >
                {i.verticalElem}
              </li>
            ))}
          </ul>
          <ul className={`${s.list} response-navigation__list_ver response-navigation__list_ver_right`}>
            {right?.map((i) => (
              <li
                role="presentation"
                onClick={close}
                className={`${s.li} response-navigation__list-item response-navigation__list-item_ver response-navigation__list-item_ver_right`}
                key={i.key}
              >
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
