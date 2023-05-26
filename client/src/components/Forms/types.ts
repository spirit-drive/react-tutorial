import { FormikContextType } from 'formik';
import { MutableRefObject } from 'react';
import { Input } from 'antd';

export interface FormProps<Values = unknown> {
  className?: string;
  disabled?: boolean;
  formManager: FormikContextType<Values>;
  formElement?: MutableRefObject<HTMLFormElement>;
  autoFocusElement?: MutableRefObject<Input>;
}
