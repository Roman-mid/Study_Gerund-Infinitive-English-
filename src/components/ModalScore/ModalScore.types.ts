export interface ScoreType {
  correct: number;
  noCorrect: number;
}

export interface ModalScoreType {
  score: ScoreType;
  numberWords: number;
  setModalWrongWords: React.Dispatch<React.SetStateAction<boolean>>;
  tryAgain: () => void;
  setFinish: React.Dispatch<React.SetStateAction<boolean>>;
}
