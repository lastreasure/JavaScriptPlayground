/* P7 - LEARNING NOTE - 1 - Function to personalise console.logs
* handy way to add styling to console.logs
*/
export function log(message, level = 0, type = 'component') {
  let styling =
    'padding: 0.15rem; background: #04406b; color: #fcfabd';

  if (type === 'other') {
    styling = 'padding: 0.15rem; background: #210957; color: #ede6b2';
  }

  const indent = '- '.repeat(level);

  console.log('%c' + indent + message, styling);
}
