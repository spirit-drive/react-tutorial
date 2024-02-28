import { compose } from 'src/utils/compose';
import { getArray, permute } from './helpers';

const handle = compose(permute, getArray);

onmessage = function (e: MessageEvent<{ value: number }>) {
  const { value } = e.data;
  postMessage([...handle(value)]);
  // fetch('https://jsonplaceholder.typicode.com/todos/1')
  //   .then((response) => response.json())
  //   .then((json) => console.log(json));
};
