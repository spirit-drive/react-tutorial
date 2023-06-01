import { message as messageAntD } from 'antd';
import i18n from 'src/localization';
import { feedbackDev } from './feedbackDev';

type Type = 'unexpected_error' | undefined;

export const feedback = (error: Error, params?: { type?: Type; message?: React.ReactNode }): void => {
  const { type, message } = params || {};
  feedbackDev(error);

  if (type === 'unexpected_error') {
    messageAntD.error(message || i18n.t(`errors.unexpected_error`));
    return;
  }
  messageAntD.error(message || error.message);
};
