import React, { useMemo } from 'react';
import { FormikContextType } from 'formik';
import { get } from './unchanged';
import { Help } from '../shared/ui/FormItem';

export type ValidateStatus = 'error' | '';

const MIN_LENGTH_PASSWORD = 6;

export const getValidateStatus = (errors: unknown, touched: unknown, submitCount: number): ValidateStatus =>
  submitCount && errors && touched ? 'error' : '';

export const getHelp = (errors: unknown, touched: unknown, submitCount: number): Help =>
  submitCount && errors && touched ? (errors as Help) : null;

export type Validates = { validateStatus: ValidateStatus; help: Help };

export const getValidates = (
  errors: unknown,
  touched: unknown,
  submitCount: number
): { validateStatus: ValidateStatus; help: Help } => ({
  validateStatus: getValidateStatus(errors, touched, submitCount),
  help: getHelp(errors, touched, submitCount),
});

export const useValidates = (
  errors: unknown,
  touched: unknown,
  submitCount: number
): { validateStatus: ValidateStatus; help: Help } =>
  useMemo(() => getValidates(errors, touched, submitCount), [errors, touched, submitCount]);

export const getFieldCallbacks = <T = unknown>(
  key: string,
  { setFieldValue, setFieldTouched }: Pick<FormikContextType<unknown>, 'setFieldValue' | 'setFieldTouched'>
): { onBlur: () => void; onChange: (value: T) => void } => ({
  onBlur: (): void => setFieldTouched(key, true),
  onChange: (value): unknown => setFieldValue(key, value),
});

export const useFieldCallbacks = <T = unknown>(
  key: string,
  { setFieldValue, setFieldTouched }: Pick<FormikContextType<unknown>, 'setFieldValue' | 'setFieldTouched'>
): { onBlur: () => void; onChange: (value: T) => void } =>
  useMemo(() => getFieldCallbacks(key, { setFieldValue, setFieldTouched }), [key, setFieldValue, setFieldTouched]);

export type Iterable<T> = {
  [key: string]: Array<{ [k: string]: T }> | undefined;
};

export const getValidateStatusByPath = ({
  errors,
  touched,
  path,
  submitCount,
}: {
  errors: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  touched: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  submitCount: number;
  path: string;
}): ValidateStatus => {
  const error = get(path, errors);
  if (submitCount && error && get(path, touched)) {
    return 'error';
  }
  return '';
};

export const getHelpByPath = <E extends React.ReactNode = string>({
  errors,
  touched,
  path,
  submitCount,
}: {
  errors: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  touched: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  submitCount: number;
  path: string;
}): null | E => {
  const error = get(path, errors);
  if (submitCount && error && get(path, touched)) {
    return error as unknown as E;
  }
  return null;
};

export const isNotValidStringLength = (string: string, limit: number): boolean =>
  string?.trim().length < 1 || string?.trim().length > limit;

export const isTooLongLength = (string: string, limit: number): boolean => string?.length > limit;
export const isTooMany = (count: number, limit: number): boolean => count > limit;

export const isNotDefinedString = (string?: string): boolean => !string?.trim();

export const isLongEnough = (word: string, minLength: number = MIN_LENGTH_PASSWORD): boolean =>
  word?.length > minLength;
