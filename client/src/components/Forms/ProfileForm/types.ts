import { FormProps } from 'src/components/Forms/types';

export type ProfileFormValues = {
  name: string;
};

export type ProfileFormErrors = Record<keyof ProfileFormValues, string>;
export type ProfileFormTouched = Record<keyof ProfileFormValues, boolean>;

export type ProfileFormProps = FormProps<ProfileFormValues>;
