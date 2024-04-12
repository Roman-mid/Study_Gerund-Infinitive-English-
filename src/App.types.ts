
export enum Word {
    GERUNG = 'Gerung',
    INFINITIVE = 'Infinitive'
};
  
export interface WordType {
    english: string;
    translate: string;
};
  
export interface ScoreType {
    correct: number;
    noCorrect: number;
};

export interface ModalType {
    score: ScoreType;
    numberWords: number;
    setModalWrongWords: React.Dispatch<React.SetStateAction<boolean>>;
    tryAgain: () => void;
    setFinish: React.Dispatch<React.SetStateAction<boolean>>;
};

export interface ModalWrongWordsType {
    setModalWrongWords: React.Dispatch<React.SetStateAction<boolean>>;
    noCorrectWord: string[][];
    tryAgain: () => void;
};
