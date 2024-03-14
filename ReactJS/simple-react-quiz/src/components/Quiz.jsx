import { useState, useCallback } from 'react';
import QUESTIONS from '../questions'
import quizCompleteImg from '../assets/quiz-complete.png'
import QuestionTimer from './QuestionTimer';

const Quiz = () => {
  const [userAnswers, setUserAnswers] = useState([])
  const activeQuestionIndex = userAnswers.length;

  const quizIsComplete = activeQuestionIndex === QUESTIONS.length

  const handleSelectAnswer = useCallback(
    function handleSelectAnswer(selectedAnswer) {
      setUserAnswers((prevSelectedAnswers) => {
        return [...prevSelectedAnswers, selectedAnswer]
      })
  }, [])

  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );

  if (quizIsComplete) {
    return <div id="summary"> 
    <img src={quizCompleteImg} alt='Trophy icon'/>
    <h2>Quiz Completed!</h2>
    </div>
  }

  const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
  // negative inputs will be swapped
  shuffledAnswers.sort(() => Math.random() - 0.5);

  return (
    <div id="quiz">
      <div id="question">
        {/* adding key here, so that the Questiontimer rerenders when key changes */}
        <QuestionTimer key={activeQuestionIndex} timeout={10000} onTimeout={handleSkipAnswer}/>
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffledAnswers.map((answer) => 
          (<li key={answer} className='answer'>
            <button onClick={() => handleSelectAnswer(answer)}>
              {answer}
            </button> 
          </li>))}
        </ul>
      </div>
    </div> 
  );
};

export default Quiz;