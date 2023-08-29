/* eslint-disable no-restricted-globals */
import { compose } from 'src/utils/compose';
import { getArray, permute } from './helpers';

const handler = compose(permute, getArray);

self.addEventListener('message', (e) => {
  const { value } = e.data as { value: number };
  self.postMessage([...handler(value)]);
});
