import { SortableListItems } from 'src/components/SortableList/types';
import { random } from 'src/utils/random';

export const getItems = <T>(list: T[]): SortableListItems<T> => list.map((value) => ({ id: random.uuid4(), value }));

export const getList = <T>(items: SortableListItems<T>): T[] => items.map((i) => i.value);
