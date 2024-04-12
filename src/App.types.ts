
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

// export interface ButtonType {
//     setFinish: React.Dispatch<React.SetStateAction<boolean>>;
//     setScore: React.Dispatch<React.SetStateAction<ScoreType>>;
//     setCount: React.Dispatch<React.SetStateAction<number>>;
//     setInfinitiveWords: React.Dispatch<React.SetStateAction<string[][]>>;
//     setGerungWords: React.Dispatch<React.SetStateAction<string[][]>>;
// };

export interface ModalType {
    score: ScoreType;
    numberWords: number;
    setModalWrongWords: React.Dispatch<React.SetStateAction<boolean>>;
    tryAgain: () => void;
    setFinish: React.Dispatch<React.SetStateAction<boolean>>;
    // tryAgain: React.Dispatch<React.SetStateAction<ButtonType>>;
    // setScore: React.Dispatch<React.SetStateAction<ScoreType>>;
    // setCount: React.Dispatch<React.SetStateAction<number>>;
    // setInfinitiveWords: React.Dispatch<React.SetStateAction<string[][]>>;
    // setGerungWords: React.Dispatch<React.SetStateAction<string[][]>>;
};

export interface ModalWrongWordsType {
    setModalWrongWords: React.Dispatch<React.SetStateAction<boolean>>;
    // setNoCorrectWrod: React.Dispatch<React.SetStateAction<boolean>>;
    noCorrectWord: string[][];
    tryAgain: () => void;
};
