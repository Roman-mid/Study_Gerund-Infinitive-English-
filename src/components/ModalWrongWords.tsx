import React from 'react'
import { ModalWrongWordsType } from '../App.types'

const ModalWrongWords: React.FC<ModalWrongWordsType> = ({
    tryAgain, 
    setModalWrongWords, 
    noCorrectWord
}) => {

    const restart = () => {
        tryAgain();
        setModalWrongWords(false);
    };

    const items = noCorrectWord.map((arr, ind) => {
       return <li className="item" key={ind}>
            <p>{arr[0]} - {arr[1]}</p>
        </li>
    })

  return (
    <div className="overlay">
        <div className="modalContent">
        <ul className="list">
            {items}
        </ul>
        <button className="btn btnModal" onClick={restart}> Try again </button>
        </div>
    </div>
  )
}

export default ModalWrongWords;