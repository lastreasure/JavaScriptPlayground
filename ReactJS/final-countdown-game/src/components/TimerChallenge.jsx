import React, {useState, useRef} from 'react';
import ResultModal from './ResultModal';

const TimerChallenge = ({title, targetTime}) => {
  
  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);
  const timer = useRef();
  const dialog = useRef();
  const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

  // timer runs out
  if (timeRemaining <= 0) {
    clearInterval(timer.current);
    dialog.current.open();
  }

  function handleReset() {
    setTimeRemaining(targetTime * 1000);
  }

  function handleStart() {
    timer.current = setInterval(() => {
      // deduct 10ms 
      setTimeRemaining(prevTimeRemaining => prevTimeRemaining - 10)
    }, 10);
  }

  // manually stop the timer
  function handleStop() {
      clearInterval(timer.current)
      dialog.current.open();
  }

  return (
    <>
    <ResultModal ref={dialog} targetTime={targetTime} remainingTime={timeRemaining} onReset={handleReset}/>
    <section className='challenge'>
      <h2>{title}</h2>
      <p className="challenge-time">
        {targetTime} second{targetTime > 1 && 's'}
      </p>
      <p>
        <button onClick={timerIsActive ? handleStop : handleStart}>
          {timerIsActive ? "Stop" : "Start"} Challenge
        </button>
      </p>
      <p className={timerIsActive ? 'active' : undefined}>
       {timerIsActive ? 'Timer is running...' : 'Timer inactive'}
      </p>
    </section>
    </>

  );
};

export default TimerChallenge;




// // Refactored code
// 
// const [timerExpired, setTimerExpired] = useState(false)
// const [timerStarted, setTimerStarted] = useState(false)
// 
// timer.current = setTimeout(() => {
//   setTimerExpired(true)
//   dialog.current.open()
// }, targetTime * 1000);
// 
// function handleStop() {
//   clearTimeout(timer.current)
// }