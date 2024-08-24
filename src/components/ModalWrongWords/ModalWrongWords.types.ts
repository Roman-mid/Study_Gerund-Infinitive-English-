export interface ModalWrongWordsType {
  setModalWrongWords: React.Dispatch<React.SetStateAction<boolean>>;
  noCorrectWord: string[][];
  tryAgain: () => void;
}
