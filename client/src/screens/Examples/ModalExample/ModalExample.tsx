import React, { FC, useState } from 'react';
import cn from 'clsx';
import { Modal } from '../../../components/Modal';
import { Button } from 'antd';
import s from './ModalExample.sass';

export type ModalExampleProps = {
  className?: string;
};

export const ModalExample: FC<ModalExampleProps> = ({ className }) => {
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  return (
    <div className={cn(s.root, className)}>
      <Button onClick={() => setVisible1(true)}>Открыть</Button>
      <Modal visible={visible2} onClose={() => setVisible2(false)}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt est et eveniet impedit ipsam libero nulla
        possimus suscipit! Adipisci aperiam consequuntur dignissimos illo odit pariatur soluta tempora ullam voluptates
        voluptatum.
      </Modal>
      <Modal visible={visible1} onClose={() => setVisible1(false)}>
        Какой-то контент
        <div>
          <Button onClick={() => setVisible2(true)}>Открыть вторую модалку</Button>
        </div>
      </Modal>
    </div>
  );
};
