import { Position, Sizes, Type } from './types';
import { getLimitSize } from './helpers';
import { getPercent } from '../helpers';
import { feedbackDev } from '../../utils/feedback';

export type MoveData = {
  startWidth: number;
  startHeight: number;
  windowWidth: number;
  windowHeight: number;
  currentSizes: Sizes;
};

/**
 * Подходит, если элемент отцентрирован в родительском элементе, например с помощью align-items: center и justify-content: space-between
 * */
export const resizeForCenteredElement = (
  { x, y }: Position,
  type: Type,
  { currentSizes, startHeight, startWidth, windowHeight, windowWidth }: MoveData
): Sizes => {
  switch (type) {
    case Type.right: {
      return {
        ...currentSizes,
        width: `${getLimitSize(startWidth + 2 * x, {
          min: 48,
          max: getPercent(windowWidth, 90),
        })}px`,
      };
    }

    case Type.bottom:
      return {
        ...currentSizes,
        height: `${getLimitSize(startHeight + 2 * y, {
          min: 30,
          max: getPercent(windowHeight, 90),
        })}px`,
      };

    case Type.left:
      return {
        ...currentSizes,
        width: `${getLimitSize(startWidth - 2 * x, {
          min: 48,
          max: getPercent(windowWidth, 90),
        })}px`,
      };

    case Type.top:
      return {
        ...currentSizes,
        height: `${getLimitSize(startHeight - 2 * y, {
          min: 30,
          max: getPercent(windowHeight, 90),
        })}px`,
      };

    default:
      feedbackDev(new Error(`invalid type: ${type}`));
      return currentSizes;
  }
};
