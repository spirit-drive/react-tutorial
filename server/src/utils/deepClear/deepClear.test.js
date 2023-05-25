import { deepClear } from './deepClear';

describe('deepClear', () => {
  it('case 1', () => {
    expect(
      deepClear({
        input: {
          filters: {
            include: {
              users: {},
            },
            exclude: {
              users: {},
            },
          },
        },
      })
    ).toEqual(null);
  });

  it('case 2', () => {
    expect(
      deepClear({
        empty: false,
        unusedTokens: [],
        unusedInput: [],
        overflow: -1,
        charsLeftOver: 0,
        nullInput: false,
        invalidEra: null,
        invalidMonth: null,
        invalidFormat: false,
        userInvalidated: false,
        iso: false,
        parsedDateParts: [2021, 6, 22],
        era: null,
        rfc2822: false,
        weekdayMismatch: false,
      })
    ).toEqual({
      charsLeftOver: 0,
      empty: false,
      invalidFormat: false,
      iso: false,
      nullInput: false,
      overflow: -1,
      parsedDateParts: [2021, 6, 22],
      rfc2822: false,
      userInvalidated: false,
      weekdayMismatch: false,
    });
  });
});
