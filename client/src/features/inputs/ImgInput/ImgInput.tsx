/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { FC, useState } from 'react';
import cn from 'clsx';
import { UploadOutlined } from '@ant-design/icons';
import { message } from 'antd';
import { myCustomXHR } from 'src/app/client/myCustomFetch';
import { URL } from 'src/app/client/config';
import s from './ImgInput.sass';

export type ImgInputProps = {
  className?: string;
  value: string;
  onChange: (value: string) => void;
};

export const ImgInput: FC<ImgInputProps> = ({ className, value, onChange }) => {
  const [progress, setProgress] = useState<number>(0);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [file] = e.target.files;
    const data = new FormData();
    data.append('file', file);
    myCustomXHR<{ url: string }>(data, {
      onProgress: (loaded, total) => setProgress(Math.round((loaded / total) * 100)),
    })
      .then(({ url }) => onChange(`${URL}${url}`))
      .catch((err) => {
        console.error(err); // eslint-disable-line no-console
        message.error(err.message);
      })
      .finally(() => setProgress(0));
  };

  return (
    <div className={cn(s.root, className)}>
      <div className={s.overlay} />
      {value && <img className={s.img} src={value} alt="" />}
      <label className={s.label}>
        <input className={s.input} name="img" type="file" onChange={handleChange} />
        {progress ? <div className={s.progress} style={{ width: `${progress}%` }} /> : <UploadOutlined />}
      </label>
    </div>
  );
};
