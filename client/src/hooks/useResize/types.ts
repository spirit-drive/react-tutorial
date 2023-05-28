import React from 'react';

export type Sizes = {
  width: string;
  height: string;
};

export type ResizeData = {
  edges: React.ReactElement;
  style: Sizes;
};

export type Position = {
  x: number;
  y: number;
};

export type Limits = {
  min?: number;
  max?: number;
};

export enum Type {
  top = 'top',
  right = 'right',
  bottom = 'bottom',
  left = 'left',
}
