import React, { memo, useMemo } from 'react';
import cn from 'clsx';
import { FormikConfig, useFormik } from 'formik';
import { useMutation } from '@apollo/client';
import { Button, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { ChangePasswordForm, ChangePasswordFormValues, ChangePasswordFormErrors } from 'src/components/Forms';
import { createErrorHandlers } from 'src/utils/createErrorHandlers';
import { isNotDefinedString } from 'src/utils/validation';
import { Title } from 'src/components/Title';
import { CHANGE_PASSWORD, ChangePasswordResponse, ChangePasswordVars } from './connection';
import s from './ChangePasswordCompletedForm.sass';

export type ChangePasswordCompletedFormProps = {
  className?: string;
};

const initialValues: ChangePasswordFormValues = {
  password: undefined,
  newPassword: undefined,
  repeatPassword: undefined,
};

export const ChangePasswordCompletedForm = memo<ChangePasswordCompletedFormProps>(({ className }) => {
  const { t } = useTranslation();
  const [update, { loading }] = useMutation<ChangePasswordResponse, ChangePasswordVars>(CHANGE_PASSWORD);

  const { onSubmit, validate } = useMemo<Pick<FormikConfig<ChangePasswordFormValues>, 'onSubmit' | 'validate'>>(() => {
    const { catcherValidator } = createErrorHandlers<keyof ChangePasswordFormValues>(
      (code, _, error) => {
        if (code === null) {
          message.error(t(`errors.${error.message}`));
        } else {
          message.error(t(`errors.${code}`));
        }
      },
      {
        password: ['ERR_INCORRECT_PASSWORD'],
        newPassword: ['ERR_INVALID_PASSWORD'],
      }
    );
    return {
      onSubmit: (values, { setErrors, resetForm }) => {
        update({ variables: { input: { password: values.password, newPassword: values.newPassword } } })
          .then(() => {
            resetForm();
            message.success(t(`screens.ProfileScreen.changePassword.success`));
          })
          .catch(catcherValidator({ setErrors, getMessage: (code) => t(`errors.${code}`) }));
      },
      validate: (values) => {
        const errors = {} as ChangePasswordFormErrors;
        if (isNotDefinedString(values.password)) {
          errors.password = t(`errors.is_required`);
        }
        if (isNotDefinedString(values.newPassword)) {
          errors.newPassword = t(`errors.is_required`);
        }
        if (isNotDefinedString(values.repeatPassword)) {
          errors.repeatPassword = t(`errors.is_required`);
        }
        if (values.repeatPassword !== values.newPassword) {
          errors.newPassword = t(`errors.not_same_password`);
          errors.repeatPassword = t(`errors.not_same_password`);
        }
        return errors;
      },
    };
  }, [t, update]);

  const formManager = useFormik<ChangePasswordFormValues>({
    initialValues,
    onSubmit,
    validate,
  });
  const { submitForm } = formManager;

  return (
    <div className={cn(s.root, className)}>
      <Title className={s.title}>{t(`screens.ProfileScreen.changePassword.title`)}</Title>
      <ChangePasswordForm formManager={formManager} />
      <Button type="primary" loading={loading} onClick={submitForm}>
        {t(`screens.ProfileScreen.changePassword.save`)}
      </Button>
    </div>
  );
});

ChangePasswordCompletedForm.displayName = 'ProfileCompletedForm';
