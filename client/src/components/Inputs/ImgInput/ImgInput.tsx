/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { FC } from 'react';
import cn from 'clsx';
import { UploadOutlined } from '@ant-design/icons';
import { myCustomFetch } from 'src/client/myCustomFetch';
import { URL } from 'src/client/config';
import s from './ImgInput.sass';

export type ImgInputProps = {
  className?: string;
  value: string;
  onChange: (value: string) => void;
};

export const ImgInput: FC<ImgInputProps> = ({ className, value, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [file] = e.target.files;
    const data = new FormData();
    data.append('file', file);
    myCustomFetch<{ url: string }>('/upload', {
      method: 'POST',
      body: data,
    }).then(({ url }) => onChange(`${URL}${url}`));
  };
  return (
    <div className={cn(s.root, className)}>
      <div className={s.overlay} />
      {value && <img className={s.img} src={value} alt="" />}
      <label className={s.label}>
        <input className={s.input} name="img" type="file" onChange={handleChange} />
        <UploadOutlined />
      </label>
    </div>
  );
};
