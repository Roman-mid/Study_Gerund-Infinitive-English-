import React from 'react';
import './App.css';
import { gerung, infinitive, wrong } from './words';
import ModalScore from './components/ModalScore';
import { ScoreType, Word } from './App.types';
import ModalWrongWords from './components/ModalWrongWords';




function App() {
  const [infinitiveWords, setInfinitiveWords] = React.useState<string[][]>([...infinitive]);
  const [gerungWords, setGerungWords] = React.useState<string[][]>([...gerung]);
  
  const [word, setWord] = React.useState<string[]>([]);
  const [correct, setCorrect] = React.useState<string>('');
  const [score, setScore] = React.useState<ScoreType>({correct: 0, noCorrect: 0});
  const [translate, setTranslate] = React.useState<boolean>(false);
  const [finish, setFinish] = React.useState<boolean>(false);
  const [isDisabled, setIsDisabled] = React.useState<boolean>(false);
  const [count, setCount] = React.useState<number>(0);
  const [noCorrectWord, setNoCorrectWord] = React.useState<string[][]>([]);
  const [modalWrongWords, setModalWrongWords] = React.useState<boolean>(false);

  const getNumber = (num: number) => Math.floor(Math.random() * num);

  React.useEffect(() => {
    getWord()
  }, [])

  const getWord = () => {
    const list = getNumber(2);
    if(list === 0 && infinitiveWords.length) {
      const wordInd:number = getNumber(infinitiveWords.length);
      setWord(infinitiveWords[wordInd]);
      setInfinitiveWords(infinitiveWords.filter(arr => arr !== infinitiveWords[wordInd]));
    } else if (gerungWords.length) {
      const wordInd = getNumber(gerungWords.length);
      setWord(gerungWords[wordInd]);
      setGerungWords(gerungWords.filter(arr => arr !== gerungWords[wordInd]));
    };
    setTranslate(false);

  };

  const getResult = (categofy: string) => {
    if(infinitive.includes(word) && categofy === Word.INFINITIVE) {
      setCorrect('Correct');
      setScore({...score , correct:  score.correct + 1});
    } else if (gerung.includes(word) && categofy === Word.GERUNG) {
      setCorrect('Correct');
      setScore({...score , correct:  score.correct + 1});
    } else {
      setCorrect('False');
      setScore({...score, noCorrect: score.noCorrect + 1});
      setNoCorrectWord([...noCorrectWord, word]);
    };

    setIsDisabled(true);
    setCount((prev) => prev + 1);

    setTimeout(() => {
      // if((score.correct + score.noCorrect) === (infinitive.length + gerung.length - 1)) {
      //   setFinish(true);
      // };
      if(count === (infinitive.length + gerung.length - 1)) {
        setFinish(true);
      };
      getWord();
      setCorrect('');
      setIsDisabled(false);
    },1000 )

  };

  const tryAgain = () => {
    setScore({correct: 0, noCorrect: 0});
    setFinish(false);
    setCount(0);
    setGerungWords([...gerung]);
    setInfinitiveWords([...infinitive]);
    setNoCorrectWord([]);
  };

  return (
    <>
    <div className={correct === "Correct" ? "App correct" : correct === "False" ? "App noCorrect"  : 'App'}>
      <div className="container">
        <h1 className="title">What do you need use with word?</h1>
        {/* <h1 className="word">{translate ? word.translate : word.english}</h1> */}
        <h1 className="word">{translate ? word[1] : word[0]}</h1>
        <div className="btnsWrap">
          <div className="btnChoose">
            <button 
              disabled={isDisabled}
              className="btn"
              onClick={() => getResult(Word.GERUNG)}
            >
              {Word.GERUNG}
            </button>
            <button 
              disabled={isDisabled}
              className="btn" 
              onClick={() => getResult(Word.INFINITIVE)}
            >
              {Word.INFINITIVE}
            </button>
          </div>
          <button 
            className="btn btnTranslate" 
            onClick={() => setTranslate(!translate)}
          >
            translate
          </button>
        </div>

        <div className="wrapScore">
          <p className="score">correct: {score.correct}</p>
          <p className="score">no correct: {score.noCorrect} </p>
        </div>
        <p className="score">word number: {count} / {infinitive.length + gerung.length}</p>
      </div>
    </div>
    {finish && 
      <ModalScore
        score={score}
        numberWords={infinitive.length + gerung.length}
        tryAgain={tryAgain}
        setModalWrongWords={setModalWrongWords}
        setFinish={setFinish}
        // setScore={setScore}
        // setCount={setCount}
        // setInfinitiveWords={setInfinitiveWords}
        // setGerungWords={setGerungWords}
      />
    }
    {modalWrongWords &&
      <ModalWrongWords
        tryAgain={tryAgain}
        setModalWrongWords={setModalWrongWords}
        noCorrectWord={wrong}
        // noCorrectWord={noCorrectWord}
      />
    }
    </>

  );
}

export default App;
