import React, { memo } from 'react';
import cn from 'clsx';
import ReactMarkdown from 'react-markdown';
import s from './MarkdownView.sass';

export type Props = {
  className?: string;
  children?: string;
  data?: string;
};

export const MarkdownView = memo<Props>(({ className, data, children }) => (
  <ReactMarkdown className={cn(s.root, className)}>{data || children}</ReactMarkdown>
));

MarkdownView.displayName = 'MarkdownView';
