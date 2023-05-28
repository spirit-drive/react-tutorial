import React, { FC } from 'react';
import cn from 'clsx';
import { WaveSlider } from '../../../components/WaveSlider';
import s from './WaveSliderExample.sass';

export type ModalExampleProps = {
  className?: string;
};

export const WaveSliderExample: FC<ModalExampleProps> = ({ className }) => (
  <div className={cn(s.root, className)}>
    <WaveSlider>
      <div
        className={s.item}
        style={{
          backgroundImage: 'url(https://www.nastol.com.ua/pic/201404/2560x1600/nastol.com.ua-92859.jpg)',
        }}
      >
        1
      </div>
      <div
        className={s.item}
        style={{
          backgroundImage: 'url(https://img2.goodfon.ru/original/2048x1365/2/92/priroda-nebo-oblaka-ozero.jpg)',
        }}
      >
        2
      </div>
      <div className={s.item} style={{ backgroundImage: 'url(https://arte1.ru/images/detailed/4/23377.jpg)' }}>
        3
      </div>
    </WaveSlider>
  </div>
);
