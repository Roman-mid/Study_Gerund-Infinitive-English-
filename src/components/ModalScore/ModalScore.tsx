import React from "react";
import { createPortal } from "react-dom";
import { ModalScoreType } from "./ModalScore.types";
import Button from "../Button/Button";

const modal = document.querySelector("#modal");

const ModalScore: React.FC<ModalScoreType> = ({
  score,
  tryAgain,
  setModalWrongWords,
  setFinish,
}) => {
  const click = () => {
    setModalWrongWords(true);
    setFinish(false);
  };

  return createPortal(
    <div className="overlay">
      <div className="modalContent">
        <div className="wrapScore">
          <h2 className="totalScore">You score</h2>
          <p className="score">correct: {score.correct}</p>
          <p className="score">no correct: {score.noCorrect} </p>
        </div>
        <Button className=" btnModal mt-20" onClick={tryAgain}>
          Try again
        </Button>
        <Button className=" btnModal mt-20" onClick={click}>
          Check mistakes
        </Button>
      </div>
    </div>,
    modal as Element
  );
};

export default ModalScore;
