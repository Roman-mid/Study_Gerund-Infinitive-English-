import React from "react";
import { ModalWrongWordsType } from "./ModalWrongWords.types";
import Button from "../Button/Button";

const ModalWrongWords: React.FC<ModalWrongWordsType> = ({
  tryAgain,
  setModalWrongWords,
  noCorrectWord,
}) => {
  const restart = () => {
    tryAgain();
    setModalWrongWords(false);
  };

  const items = noCorrectWord.map((arr, ind) => {
    return (
      <li className="item" key={ind}>
        <p className="incorrectWord">
          <span>{arr[0]}</span> {arr[2]}
        </p>
      </li>
    );
  });

  return (
    <div className="overlay">
      <div className="modalContent">
        <p className="headerMistakas">
          <span>Word</span>
          <span>Correct form</span>
        </p>
        <ul className="list">{items}</ul>
        <Button className=" btnModal mt-20" onClick={restart}>
          Try again
        </Button>
      </div>
    </div>
  );
};

export default ModalWrongWords;
