import { useState, memo, useCallback, useMemo } from 'react';

import IconButton from '../UI/IconButton.jsx';
import MinusIcon from '../UI/Icons/MinusIcon.jsx';
import PlusIcon from '../UI/Icons/PlusIcon.jsx';
import CounterOutput from './CounterOutput.jsx';
import { log } from '../../log.js';

function isPrime(number) {
  log(
    'Calculating if is prime number',
    2,
    'other'
  );
  if (number <= 1) {
    return false;
  }

  const limit = Math.sqrt(number);

  for (let i = 2; i <= limit; i++) {
    if (number % i === 0) {
      return false;
    }
  }

  return true;
}

/* P7 - LEARNING NOTE - 2 - memo
* React.memo is a higher-order component (HOC) provided by React that you can use to memoize the result 
* of a functional component's rendering. When you wrap a functional component with React.memo, 
* React will memoize the component's result and only re-render it if its props have changed.
*
* memo compares new and old prop values and if they are the same then the
* component execution funciton would only be reexecuted if they are different
*
* in this example the child components of Counter will not be re-rendered when a new num is typed but not set clicked
* so the initialCount does not change (only the enteredNumber in App does)
*
* should aim to wrap memo as high up in the memo tree as possible meaning react has to check the props 
* before executing the function (hence dont use it on props that will change frequently)
*/
const Counter = memo (function Counter({ initialCount }) {
  log('<Counter /> rendered', 1);

  /* P7 - LEARNING NOTE - 3 - useMemo
   * Memo is wrapped around component functions whereas useMemo is wrapped around normal functions that are 
   * executed in component functions
   * 
   * useMemo is only to be used if you have a complex calculation that you want to prevent
   * 
   * will only be reevaluated when initialCount changes
   * 
   * should not overuse useMemo, as this can cost extra performance
   */
  const initialCountIsPrime = useMemo(() => isPrime(initialCount), [initialCount]);

  const [counter, setCounter] = useState(initialCount);

  /*
  * using useCallback here to prevent unneeded recreation of handleIncrement/decrement functions
  */
  const handleDecrement = useCallback(function handleDecrement() {
    setCounter((prevCounter) => prevCounter - 1);
  }, [])

  const handleIncrement = useCallback(function handleIncrement() {
    setCounter((prevCounter) => prevCounter + 1);
  }, [])

  return (
    <section className="counter">
      <p className="counter-info">
        The initial counter value was <strong>{initialCount}</strong>. It{' '}
        <strong>is {initialCountIsPrime ? 'a' : 'not a'}</strong> prime number.
      </p>
      <p>
        <IconButton icon={MinusIcon} onClick={handleDecrement}>
          Decrement
        </IconButton>
        <CounterOutput value={counter} />
        <IconButton icon={PlusIcon} onClick={handleIncrement}>
          Increment
        </IconButton>
      </p>
    </section>
  );
})

export default Counter;