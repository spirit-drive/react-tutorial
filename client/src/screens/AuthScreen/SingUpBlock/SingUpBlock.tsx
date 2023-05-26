import React, { memo, useMemo } from 'react';
import cn from 'clsx';
import { useMutation } from '@apollo/client';
import { AuthForm, AuthFormErrors, AuthFormValues } from 'src/components/Forms';
import { FormikConfig, useFormik } from 'formik';
import { Button, message } from 'antd';
import { isLongEnough, isNotDefinedString } from 'src/utils/validation';
import { useDispatch } from 'react-redux';
import { tokenActions } from 'src/store/token';
import { createErrorHandlers } from 'src/utils/createErrorHandlers';
import { useNavigate, useLocation } from 'react-router-dom';
import { NavigationState } from 'src/navigation/types';
import { SIGN_UP, SignUpResponse, SignUpVars, extractSignUp } from '../connections';
import { useTranslation } from 'react-i18next';
import s from './SingUpBlock.sass';

export type SingUpBlockProps = {
  className?: string;
};

const initialValues: AuthFormValues = {
  email: undefined,
  password: undefined,
};

export const SingUpBlock = memo<SingUpBlockProps>(({ className }) => {
  const { t } = useTranslation();
  const [signUp, { loading }] = useMutation<SignUpResponse, SignUpVars>(SIGN_UP, { fetchPolicy: 'no-cache' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { onSubmit, validate } = useMemo<Pick<FormikConfig<AuthFormValues>, 'onSubmit' | 'validate'>>(() => {
    const { catcher } = createErrorHandlers((code) => message.error(t(`errors.${code}`)));
    return {
      onSubmit: (values, { resetForm }) => {
        signUp({ variables: { email: values.email, password: values.password } })
          .then((res) => {
            dispatch(tokenActions.set(extractSignUp(res.data)));
            resetForm();
            navigate((location.state as NavigationState)?.from || '/');
          })
          .catch(catcher);
      },
      validate: (values) => {
        const errors = {} as AuthFormErrors;
        if (isNotDefinedString(values.email)) {
          errors.email = t(`errors.is_required`);
        }
        if (isNotDefinedString(values.password)) {
          errors.password = t(`errors.is_required`);
        } else if (!isLongEnough(values.password)) {
          errors.password = t(`errors.too_short_password`);
        }
        return errors;
      },
    };
  }, [dispatch, location.state, navigate, signUp, t]);

  const formik = useFormik<AuthFormValues>({
    onSubmit,
    initialValues,
    validate,
  });

  const { submitForm } = formik;
  return (
    <div className={cn(s.root, className)}>
      <AuthForm formManager={formik} />
      <div className={s.bottom}>
        <Button className={s.submit} loading={loading} type="primary" onClick={submitForm}>
          {t(`screens.auth.signUp.submit`)}
        </Button>
      </div>
    </div>
  );
});

SingUpBlock.displayName = 'SingUpBlock';
