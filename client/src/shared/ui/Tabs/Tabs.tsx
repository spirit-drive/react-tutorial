import React, { FC, Key, useEffect, useRef } from 'react';
import cn from 'clsx';
import s from './Tabs.sass';

export type TabsItem = {
  key: Key;
  content: React.ReactNode;
};

export type TabsProps = {
  className?: string;
  activeKey?: Key;
  onTab: (key: Key) => void;
  tabs: TabsItem[];
};

export const Tabs: FC<TabsProps> = ({ className, tabs, activeKey, onTab }) => {
  const root = useRef<HTMLDivElement>();
  const runner = useRef<HTMLDivElement>();
  useEffect(() => {
    const activeElem = root.current?.querySelector('button[data-active="true"]');
    const fn = () => {
      if (activeElem && root.current) {
        const rootRect = root.current.getBoundingClientRect();
        const activeRect = activeElem.getBoundingClientRect();
        const y = activeRect.y - rootRect.y;
        const x = activeRect.x - rootRect.x;
        runner.current.style.transform = `translate(${x}px, ${y}px)`;
      }
    };

    const resizerRoot = new ResizeObserver(fn);
    const resizerActive = new ResizeObserver(fn);

    if (root.current) resizerRoot.observe(root.current);
    if (activeElem) resizerActive.observe(activeElem);

    return () => {
      resizerActive.disconnect();
      resizerRoot.disconnect();
    };
  }, [activeKey]);
  return (
    <div ref={root} className={cn(s.root, className)}>
      <div ref={runner} className={s.runner} />
      {tabs.map((tab) => (
        <button
          data-active={activeKey === tab.key}
          className={s.tab}
          type="button"
          key={tab.key}
          onClick={() => onTab(tab.key)}
        >
          {tab.content}
        </button>
      ))}
    </div>
  );
};
