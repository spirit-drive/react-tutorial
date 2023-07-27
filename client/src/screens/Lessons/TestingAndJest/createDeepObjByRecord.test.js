import { createDeepObjByRecord } from './createDeepObjByRecord';

describe('createDeepObjByRecord', () => {
  it('case 1', () => {
    expect(
      createDeepObjByRecord({
        test1: '1',
        'test3.test.test': '3',
        'test3.test.test1': '4',
        'test3.test.test2': '5',
        'test3.test1.test1': '6',
        'test3.test1.test2': '7',
      })
    ).toEqual({
      test1: '1',
      test3: {
        test: {
          test: '3',
          test1: '4',
          test2: '5',
        },
        test1: {
          test1: '6',
          test2: '7',
        },
      },
    });
  });

  it('case 2', () => {
    expect(
      createDeepObjByRecord({
        test1: '1',
        'test2.test': '2',
        'test3.test.test': '3',
      })
    ).toEqual({
      test1: '1',
      test2: {
        test: '2',
      },
      test3: {
        test: {
          test: '3',
        },
      },
    });
  });
});
