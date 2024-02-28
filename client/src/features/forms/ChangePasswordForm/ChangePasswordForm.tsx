import React, { memo } from 'react';
import cn from 'clsx';
import { ChangePasswordFormProps } from './types';
import { PasswordField } from './PasswordField';
import { RepeatPasswordField } from './RepeatPasswordField';
import { NewPasswordField } from './NewPasswordField';
import s from './ChangePasswordForm.sass';

export const ChangePasswordForm = memo<ChangePasswordFormProps>(
  ({ className, formManager, formElement, autoFocusElement, disabled }) => {
    const { values, touched, errors, submitCount, handleBlur, handleSubmit, handleChange, submitForm } = formManager;

    return (
      <form ref={formElement} onSubmit={handleSubmit} className={cn(s.root, className)}>
        <PasswordField
          onPressEnter={submitForm}
          autoFocusElement={autoFocusElement}
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.password}
          errors={errors.password}
          submitCount={submitCount}
          touched={touched.password}
          disabled={disabled}
        />
        <NewPasswordField
          onPressEnter={submitForm}
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.newPassword}
          errors={errors.newPassword}
          submitCount={submitCount}
          touched={touched.newPassword}
          disabled={disabled}
        />
        <RepeatPasswordField
          onPressEnter={submitForm}
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.repeatPassword}
          errors={errors.repeatPassword}
          submitCount={submitCount}
          touched={touched.repeatPassword}
          disabled={disabled}
        />
      </form>
    );
  }
);

ChangePasswordForm.displayName = 'ChangePasswordForm';
