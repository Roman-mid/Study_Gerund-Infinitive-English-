import React from 'react'
import { createPortal } from 'react-dom';
import { ModalType } from '../App.types';

const modal = document.querySelector('#modal');

const ModalScore: React.FC<ModalType> = ({score, numberWords, tryAgain, setModalWrongWords, setFinish}) => {

    const click = () => {
        setModalWrongWords(true);
        setFinish(false)
    }

  return createPortal (
    <div className="overlay">
        <div className="modalContent">
        <div className="wrapScore">
        <h2 className="totalScore">You score</h2>
          <p className="score">correct: {score.correct}</p>
          <p className="score">no correct: {score.noCorrect} </p>
        </div>
            <button className="btn btnModal" onClick={tryAgain}>Try again</button>
            <button className="btn btnModal" onClick ={click}>Check wrong words</button>
        </div>
    </div>, modal as Element
  )
}

export default ModalScore;