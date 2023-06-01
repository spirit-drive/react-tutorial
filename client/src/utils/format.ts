export const isCorrectValue = (value: unknown): boolean => (typeof value === 'number' ? !Number.isNaN(value) : true);
export const isExist = (value: unknown): boolean => value !== undefined && value !== null && isCorrectValue(value);

export const removeSlashInEnd = (path: string): string => path.replace(/\/$/, '');
export const removeIdInEnd = (path: string): string => path.replace(/\/:id$/, '');
export const removeFewDots = (value: string): string => {
  let result = '';
  for (let i = 0, wasDot = false; i < value.length; i++) {
    const symbol = value[i];
    if (symbol === '.') {
      if (!wasDot) {
        wasDot = true;
        result += symbol;
      }
    } else {
      result += symbol;
    }
  }
  return result;
};

export const removeFewMinuses = (value: string): string => {
  if (!value) return value;
  return `${value[0]}${value.slice(1).replace(/-/g, '')}`;
};
export const removeDotsForExceptionHundredth = (value: string): string =>
  value?.replace(/\.(?=\d*\.\d{2}$|\d$|\d{3,}$)/g, '');
export const removeDotInTheEnd = (value: string): string => value?.replace(/\.$/, '');
export const removeZeroInTheStart = (value: string): string => value?.replace(/^0+/, '');
export const removeIfOnlyDots = (value: string): string => value?.replace(/^\.+$/g, '');
export const removeAllSpaces = (value: string): string => value?.replace(/\s/g, '');
export const getOnlyFormattedNumber = (value: string): string => value?.replace(/[^\d.\s]/g, '');
export const getOnlyNumber = (value: string): string => value?.replace(/[^\d.-]/g, '');
export const getOnlyRNumber = (value: string): string => {
  if (!value) return '';
  return removeFewMinuses(removeFewDots(value.replace(/[^\d.-]/g, '')));
};
export const getOnlyDigits = (value: string): string => value?.replace(/\D/g, '');
export const commaToDot = (value: string): string => value?.replace(/,/g, '.');

export const isZeroFractionEnd = (value: string): boolean => /\.\.?0?$/g.test(value);
export const isOnlyOneDot = (value: string): boolean => !/\.(.*\.)+/.test(value);
export const doesHaveADot = (value: string): boolean => /\./.test(value);

export const setDotForWhole = (value: string, fractionDigits = 2): string => {
  const result = parseInt(getOnlyDigits(value), 10);
  return (result / 10 ** fractionDigits).toFixed(2);
};

export const removeFirstZeros = (value: string): string => value.replace(/^[0]+(\d+([.,]\d{2})?)$/, '$1');
export const getBeautifulNumber = (value: number | string, separator = ' '): string =>
  value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);

export const formatNumber = (
  value: unknown,
  params?: { whole?: boolean; emptyValue?: string; separator?: string; fractionDigits?: number }
): string => {
  const { whole = false, emptyValue = '0', separator = ' ', fractionDigits = 2 } = params || {};
  if (!value && value !== 0) return emptyValue;

  const result = removeFirstZeros(getOnlyNumber(commaToDot(value.toString())));
  if (whole) {
    return getBeautifulNumber(setDotForWhole(result, fractionDigits), separator);
  }
  return getBeautifulNumber(result, separator);
};

export const onlyDigit = (value: string | number): string =>
  value
    .toString()
    .replace(/\D/g, '')
    .replace(/^0+(\d)/, '$1');

export const addDotForNumber = (value: string | number): string => {
  const v = value
    .toString()
    .replace(',', '.')
    .replace(/^0+(\d)/, '$1')
    .split('');

  const newV = [];
  for (let i = 0, indexDot = null, countExcludesDots = 0; i < v.length; i++) {
    if (v[i] === '.') {
      if (indexDot === null) {
        newV.push(v[i]);
        indexDot = i;
      } else {
        countExcludesDots++;
      }
    } else if (indexDot === null) {
      newV.push(v[i]);
    } else if (i - countExcludesDots - indexDot <= 2) {
      newV.push(v[i]);
    }
  }

  if (newV.length <= 2) {
    const dif = 3 - newV.length;
    newV.unshift(...Array(dif).fill('0'));
  }
  if (!newV.includes('.')) {
    newV.splice(newV.length - 2, 0, '.');
  }
  return newV.join('');
};

export const checkOnPrice = (string: string): boolean => /^\d+(\.\d{2})?$/.test(string);

export const formatPrice = (price: string | number, makeCorrect = false): string => {
  const v = price
    .toString()
    .replace(',', '.')
    .replace(/[^\d.]/g, '')
    .replace(/^0+(\d)/, '$1');

  if (v === '0') {
    return makeCorrect ? '0.00' : '0.';
  }

  if (v === '') {
    return makeCorrect ? '0.00' : '';
  }

  let indexDot = null;
  let res = '';
  for (let i = 0; i < v.length; i++) {
    if (v[i] === '.') {
      if (indexDot === null) {
        if (i === 0) {
          indexDot = 1;
          res += '0.';
        } else {
          indexDot = i;
          res += '.';
        }
      }
    } else {
      res += v[i];
    }
  }

  if (indexDot !== null) {
    const dif = res.length - indexDot - 3;
    if (dif > 0) {
      if (makeCorrect) {
        res = res.slice(0, -dif);
      }
    } else if (makeCorrect && dif < 0) {
      res = res.padEnd(res.length + Math.abs(dif), '0');
    }
  } else if (makeCorrect) {
    res += '.00';
  }

  return res;
};

export const onlyDigitFloat = (value: string | number, correctDigit = false): string => {
  const v = value
    .toString()
    .replace(',', '.')
    .replace(/[^\d.]/g, '')
    .replace(/^0+(\d+(\..*)?)/, '$1');

  let wasDot = false;
  let res = '';
  for (let i = 0; i < v.length; i++) {
    if (v[i] === '.') {
      if (!wasDot) {
        wasDot = true;
        res += i === 0 ? '0.' : '.';
      }
    } else {
      res += v[i];
    }
  }
  return correctDigit ? res.replace(/^([^.]*)\.$/, '$1') : res;
};

export const byThreeDigits = (value: number | string, byDefault = ''): string =>
  value ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') : byDefault;

export const getBeautifulMinus = (value: string): string => value.replace(/-/g, '–');

export type TNumberFormat = (value: string | number, correctDigit?: boolean) => string | null;
export type TCreateNumberFormat = (isFloat: boolean) => TNumberFormat;
export const createNumberFormat: TCreateNumberFormat = (isFloat) => {
  const format = isFloat ? onlyDigitFloat : onlyDigit;
  return (value, correctDigit): string | null => (isExist(value) && value !== '' ? format(value, correctDigit) : null);
};
