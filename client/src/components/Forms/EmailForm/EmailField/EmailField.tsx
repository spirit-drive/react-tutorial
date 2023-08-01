import React, { memo } from 'react';
import cn from 'clsx';
import { Input } from 'antd';
import { FormikHandlers } from 'formik/dist/types';
import { UserOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { FormItem } from 'src/components/FormItem';
import { getValidates } from 'src/utils/validation';
import { EmailFormProps } from '../types';
import s from './EmailField.sass';

export type EmailFieldProps = Pick<EmailFormProps, 'className' | 'disabled' | 'autoFocusElement'> & {
  submitCount: number;
  touched: boolean;
  errors: string;
  value: string;
  onPressEnter: () => void;
  onChange: FormikHandlers['handleChange'];
  onBlur: FormikHandlers['handleBlur'];
};

const prefix = <UserOutlined />;

export const EmailField = memo<EmailFieldProps>(
  ({ className, onChange, onBlur, onPressEnter, autoFocusElement, touched, value, errors, disabled, submitCount }) => {
    const { t } = useTranslation();

    const { validateStatus, help } = getValidates(errors, touched, submitCount);

    return (
      <FormItem
        className={cn(s.root, className)}
        title={t(`forms.EmailForm.email.title`)}
        required
        validateStatus={validateStatus}
        help={help}
      >
        <Input
          prefix={prefix}
          disabled={disabled}
          ref={autoFocusElement}
          onPressEnter={onPressEnter}
          data-cy="input"
          autoFocus
          type="email"
          name="email"
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          placeholder={t(`forms.EmailForm.email.placeholder`)}
        />
      </FormItem>
    );
  }
);

EmailField.displayName = 'EmailField';
