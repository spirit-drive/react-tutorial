import React, { FC } from 'react';
import cn from 'clsx';
import { Page } from 'src/components/Page';
import { Skeleton } from 'src/components/Skeleton';
import s from './PageSkeleton.sass';

export type PageSkeletonProps = {
  className?: string;
};

export const PageSkeleton: FC<PageSkeletonProps> = ({ className }) => (
  <Page title={<Skeleton className={s.title} />} className={cn(s.root, className)}>
    <div className={s.block}>
      <Skeleton className={s.main} />
      <Skeleton className={s.text} />
      <Skeleton className={s.text} />
    </div>
    <div className={s.block}>
      <Skeleton className={s.main} />
      <Skeleton className={s.text} />
      <Skeleton className={s.text} />
    </div>
    <div className={s.block}>
      <Skeleton className={s.main} />
      <Skeleton className={s.text} />
      <Skeleton className={s.text} />
    </div>
  </Page>
);
