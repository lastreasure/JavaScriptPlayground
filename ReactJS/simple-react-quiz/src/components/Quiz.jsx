import { useState } from 'react';
import QUESTIONS from '../questions'
import quizCompleteImg from '../assets/quiz-complete.png'

const Quiz = () => {
  const [userAnswers, setUserAnswers] = useState([])
  const activeQuestionIndex = userAnswers.length;

  const quizIsComplete = activeQuestionIndex === QUESTIONS.length

  function handSelectAnswer(selectedAnswer) {
    setUserAnswers((prevSelectedAnswers) => {
      return [...prevSelectedAnswers, selectedAnswer]
    })
  }

  if (quizIsComplete) {
    return <div id="summary"> 
    <img src={quizCompleteImg} alt='Trophy icon'/>
    <h2>Quiz Compleed!</h2>
    </div>
  }

  const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
  // negative inputs will be swapped
  shuffledAnswers.sort(() => Math.random() - 0.5);
  
  return (
    <div id="quiz">
      <div id="question">
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffledAnswers.map((answer) => 
          (<li key={answer} className='answer'>
            <button onClick={() => handSelectAnswer(answer)}>
              {answer}
            </button> 
          </li>))}
        </ul>
      </div>
    </div> 
  );
};

export default Quiz;