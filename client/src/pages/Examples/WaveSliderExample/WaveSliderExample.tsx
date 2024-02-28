import React, { FC } from 'react';
import cn from 'clsx';
import { WaveSlider } from 'src/shared/ui/WaveSlider';
import s from './WaveSliderExample.sass';

export type ModalExampleProps = {
  className?: string;
};

const items = [
  'https://www.nastol.com.ua/pic/201404/2560x1600/nastol.com.ua-92859.jpg',
  'https://img2.goodfon.ru/original/2048x1365/2/92/priroda-nebo-oblaka-ozero.jpg',
  'https://arte1.ru/images/detailed/4/23377.jpg',
  'https://img1.goodfon.com/original/1024x768/9/87/priroda-gory-leto-svet-solnca.jpg',
  'https://cojo.ru/wp-content/uploads/2022/12/krasnoe-ozero-v-kanade-1-1.webp',
];

export const WaveSliderExample: FC<ModalExampleProps> = ({ className }) => (
  <div className={cn(s.root, className)}>
    <WaveSlider interval={4000}>
      {items.map((item, i) => (
        <div className={s.item} key={item} style={{ backgroundImage: `url(${item})` }}>
          {i}
        </div>
      ))}
    </WaveSlider>
  </div>
);
