import {
  onlyDigit,
  getOnlyRNumber,
  onlyDigitFloat,
  byThreeDigits,
  formatPrice,
  checkOnPrice,
  addDotForNumber,
  removeFewMinuses,
} from './format';

describe('format', () => {
  it('removeFewMinuses', () => {
    expect(removeFewMinuses('')).toBe('');
    expect(removeFewMinuses('23')).toBe('23');
    expect(removeFewMinuses('-23')).toBe('-23');
    expect(removeFewMinuses('-23----')).toBe('-23');
    expect(removeFewMinuses('-23-2-34--23334--')).toBe('-2323423334');
  });

  it('getOnlyRNumber', () => {
    expect(getOnlyRNumber('')).toBe('');
    expect(getOnlyRNumber('23')).toBe('23');
    expect(getOnlyRNumber('-23')).toBe('-23');
    expect(getOnlyRNumber('-23----')).toBe('-23');
    expect(getOnlyRNumber('-23--2-34.-233.34--')).toBe('-23234.23334');
    expect(getOnlyRNumber('-23--2-34-.-233.34--')).toBe('-23234.23334');
  });

  it('addDotForNumber', () => {
    expect(addDotForNumber('2000.00')).toBe('2000.00');
    expect(addDotForNumber('2000..00')).toBe('2000.00');
    expect(addDotForNumber('2000....00')).toBe('2000.00');
    expect(addDotForNumber('2.000..00')).toBe('2.00');
    expect(addDotForNumber('200000')).toBe('2000.00');
    expect(addDotForNumber('234500')).toBe('2345.00');
    expect(addDotForNumber('12')).toBe('0.12');
    expect(addDotForNumber('1')).toBe('0.01');
    expect(addDotForNumber('0100')).toBe('1.00');
    expect(addDotForNumber('000100')).toBe('1.00');
  });

  it('checkOnPrice', () => {
    expect(checkOnPrice('2000')).toBe(true);
    expect(checkOnPrice('2345.56')).toBe(true);
    expect(checkOnPrice('2345.50')).toBe(true);
    expect(checkOnPrice('2345.50123')).toBe(false);
    expect(checkOnPrice('2345.501')).toBe(false);
    expect(checkOnPrice('')).toBe(false);
    expect(checkOnPrice('234.')).toBe(false);
    expect(checkOnPrice('234.2')).toBe(false);
    expect(checkOnPrice('.20')).toBe(false);
  });

  it('formatPrice', () => {
    expect(formatPrice('')).toBe('');
    expect(formatPrice('.')).toBe('0.');
    expect(formatPrice('0')).toBe('0.');
    expect(formatPrice('01')).toBe('1');
    expect(formatPrice('012345qazwsxedcrfvtgbnhyujmkiol/;pp["/"]\\=+-_)(*&^%$#@!~`?><":{}|')).toBe('12345');
    expect(formatPrice('012345')).toBe('12345');
    expect(formatPrice('012345.678')).toBe('12345.678');
    expect(formatPrice('012345.6')).toBe('12345.6');
    expect(formatPrice('012345.')).toBe('12345.');
    expect(formatPrice('012345,678')).toBe('12345.678');
    expect(formatPrice('012345,6')).toBe('12345.6');
    expect(formatPrice('012345,6.,7.,8.,.,.')).toBe('12345.678');
    expect(formatPrice('012345,6,.,.')).toBe('12345.6');
    expect(formatPrice('012345,,.,.')).toBe('12345.');

    expect(formatPrice('', true)).toBe('0.00');
    expect(formatPrice('.', true)).toBe('0.00');
    expect(formatPrice('0', true)).toBe('0.00');
    expect(formatPrice('01', true)).toBe('1.00');
    expect(formatPrice('012345qazwsxedcrfvtgbnhyujmkiol/;pp["/"]\\=+-_)(*&^%$#@!~`?><":{}|', true)).toBe('12345.00');
    expect(formatPrice('012345', true)).toBe('12345.00');
    expect(formatPrice('012345.678', true)).toBe('12345.67');
    expect(formatPrice('012345.67', true)).toBe('12345.67');
    expect(formatPrice('012345.6', true)).toBe('12345.60');
    expect(formatPrice('012345.', true)).toBe('12345.00');
    expect(formatPrice('012345,678', true)).toBe('12345.67');
    expect(formatPrice('012345,6', true)).toBe('12345.60');
    expect(formatPrice('012345,6.,7.,8.,.,.', true)).toBe('12345.67');
    expect(formatPrice('012345,6,.,.', true)).toBe('12345.60');
    expect(formatPrice('012345,,.,.', true)).toBe('12345.00');
  });

  it('onlyDigit', () => {
    expect(onlyDigit('0')).toBe('0');
    expect(onlyDigit('01')).toBe('1');
    expect(onlyDigit('ssc34fedwe67')).toBe('3467');
    expect(onlyDigit('34.67')).toBe('3467');
    expect(onlyDigit('34.67,')).toBe('3467');
    expect(onlyDigit('34.67.,89')).toBe('346789');
    expect(onlyDigit('34.67.,89')).toBe('346789');
    expect(onlyDigit('000034.67.,89')).toBe('346789');
    expect(onlyDigit('034.67.,89')).toBe('346789');
    expect(onlyDigit('134.67.,89')).toBe('1346789');
    expect(onlyDigit('234.67.,89')).toBe('2346789');
    expect(onlyDigit('334.67.,89')).toBe('3346789');
    expect(onlyDigit('434.67.,89')).toBe('4346789');
    expect(onlyDigit('534.67.,89')).toBe('5346789');
    expect(onlyDigit('634.67.,89')).toBe('6346789');
    expect(onlyDigit('734.67.,89')).toBe('7346789');
    expect(onlyDigit('834.67.,89')).toBe('8346789');
    expect(onlyDigit('934.67.,89')).toBe('9346789');
  });

  it('onlyDigit and byThreeDigits', () => {
    expect(byThreeDigits(onlyDigit('ssc34fedwe67'))).toBe('3 467');
    expect(byThreeDigits(onlyDigit('34.67'))).toBe('3 467');
    expect(byThreeDigits(onlyDigit('34.67,'))).toBe('3 467');
    expect(byThreeDigits(onlyDigit('34.67.,89'))).toBe('346 789');
    expect(byThreeDigits(onlyDigit('34.67.,89'))).toBe('346 789');
    expect(byThreeDigits(onlyDigit('000034.67.,89'))).toBe('346 789');
    expect(byThreeDigits(onlyDigit('034.67.,89'))).toBe('346 789');
    expect(byThreeDigits(onlyDigit('134.67.,89'))).toBe('1 346 789');
    expect(byThreeDigits(onlyDigit('234.67.,89'))).toBe('2 346 789');
    expect(byThreeDigits(onlyDigit('334.67.,89'))).toBe('3 346 789');
    expect(byThreeDigits(onlyDigit('434.67.,89'))).toBe('4 346 789');
    expect(byThreeDigits(onlyDigit('534.67.,89'))).toBe('5 346 789');
    expect(byThreeDigits(onlyDigit('634.67.,89'))).toBe('6 346 789');
    expect(byThreeDigits(onlyDigit('734.67.,89'))).toBe('7 346 789');
    expect(byThreeDigits(onlyDigit('834.67.,89'))).toBe('8 346 789');
    expect(byThreeDigits(onlyDigit('934.67.,89'))).toBe('9 346 789');
  });

  it('onlyDigitFloat', () => {
    expect(onlyDigitFloat('ssc34fedwe67')).toBe('3467');
    expect(onlyDigitFloat('ssc34fedwe,67')).toBe('34.67');
    expect(onlyDigitFloat('ssc34fedw.e,67')).toBe('34.67');
    expect(onlyDigitFloat('34')).toBe('34');
    expect(onlyDigitFloat('34.')).toBe('34.');
    expect(onlyDigitFloat('000034.')).toBe('34.');
    expect(onlyDigitFloat('000.034')).toBe('0.034');
    expect(onlyDigitFloat('0000')).toBe('0');
    expect(onlyDigitFloat('000123')).toBe('123');
    expect(onlyDigitFloat('34.,.,..,.')).toBe('34.');
    expect(onlyDigitFloat('34.67.54')).toBe('34.6754');
    expect(byThreeDigits(onlyDigitFloat('34.67.54'))).toBe('34.6 754');
    expect(byThreeDigits(onlyDigitFloat('34.67.54.2.3'))).toBe('34.675 423');
    expect(onlyDigitFloat('34.67,54.2,3')).toBe('34.675423');
    expect(byThreeDigits(onlyDigitFloat('34.67,54.2,3'))).toBe('34.675 423');
    expect(onlyDigitFloat('34,67,54.2,3')).toBe('34.675423');
    expect(onlyDigitFloat('34,67,54.,2,3')).toBe('34.675423');
    expect(onlyDigitFloat('34.,67,54.,2,3')).toBe('34.675423');
    expect(onlyDigitFloat(',.34.,67,54.,2,3')).toBe('0.34675423');
    expect(byThreeDigits(onlyDigitFloat(',.34.,67,54.,2,3'))).toBe('0.34 675 423');
    expect(onlyDigitFloat('34.67')).toBe('34.67');
    expect(byThreeDigits(onlyDigitFloat('1298734.67'))).toBe('1 298 734.67');
    expect(onlyDigitFloat('34,67')).toBe('34.67');

    expect(onlyDigitFloat('34.', true)).toBe('34');
    expect(onlyDigitFloat('34.,.,.,..,,', true)).toBe('34');
    expect(onlyDigitFloat('ssc34fedwe67', true)).toBe('3467');
    expect(onlyDigitFloat('ssc34fedwe,67', true)).toBe('34.67');
    expect(onlyDigitFloat('ssc34fedw.e,67', true)).toBe('34.67');
    expect(onlyDigitFloat('34', true)).toBe('34');
    expect(onlyDigitFloat('34.67.54', true)).toBe('34.6754');
    expect(onlyDigitFloat('34.67.54.2.3', true)).toBe('34.675423');
    expect(onlyDigitFloat('34.67.54.2.3,.,.,.', true)).toBe('34.675423');
    expect(onlyDigitFloat('34.67,54.2,3', true)).toBe('34.675423');
    expect(onlyDigitFloat('34,67,54.2,3', true)).toBe('34.675423');
    expect(onlyDigitFloat('34,67,54.,2,3', true)).toBe('34.675423');
    expect(onlyDigitFloat('34.,67,54.,2,3', true)).toBe('34.675423');
    expect(onlyDigitFloat('34.,67,54.,2,3....,,,.,', true)).toBe('34.675423');
    expect(onlyDigitFloat(',.34.,67,54.,2,3', true)).toBe('0.34675423');
    expect(onlyDigitFloat('34.67', true)).toBe('34.67');
    expect(onlyDigitFloat('34,67', true)).toBe('34.67');
  });
});
