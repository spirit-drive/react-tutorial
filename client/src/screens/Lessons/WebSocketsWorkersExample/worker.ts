import { compose } from 'src/utils/compose';
import { getArray, permute } from './helpers';

const handle = compose(permute, getArray);

onmessage = function (e) {
  const { value } = e.data as { value: number };
  postMessage([...handle(value)]);
};
