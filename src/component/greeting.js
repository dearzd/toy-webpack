import { sum } from '../utils/utils.js';

export function greeting(name) {
  console.log('Hello,', name);

  const result = sum(1, 2);
  console.log('1 + 2 = ' + result);
}
