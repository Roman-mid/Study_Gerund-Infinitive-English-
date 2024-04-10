import React from 'react';
import './App.css';
import { gerung, infinitive } from './words';


enum Word {
  GERUNG = 'Gerung',
  INFINITIVE = 'Infinitive'
}

function App() {
  
  const [word, setWord] = React.useState<string>('Let\'s go start');
  const [correct, setCorrect] = React.useState<string>('');
  const [score, setScore] = React.useState<number>(0);

  const getNumber = (num: number) => Math.floor(Math.random() * num);

  React.useEffect(() => {
    getWord()
  }, [])

  const getWord = () => {
    const list = getNumber(2);
    if(list === 0) {
      const wordInd:number = getNumber(infinitive.length);
      setWord(infinitive[wordInd])
    } else {
      const wordInd = getNumber(gerung.length);
      setWord(gerung[wordInd])
    }
  };

  const getResult = (categofy: string) => {
    if(infinitive.includes(word) && categofy === Word.INFINITIVE) {
      setCorrect('Correct');
      setScore((prev) => prev + 1);
    } else if (gerung.includes(word) && categofy === Word.GERUNG) {
      setCorrect('Correct');
      setScore((prev) => prev + 1);
    } else {
      setCorrect('False');
      setScore(0);
    };
    setTimeout(() => {
      getWord();
      setCorrect('');

    },1000 )
  }

  return (
    <div className={correct === "Correct" ? "App correct" : correct === "False" ? "App noCorrect"  : 'App'}>
      <div className="container">
        <h1 className="title">What do you need use with word?</h1>
        <h1 className="word">{word}</h1>
        <div className="btnsWrap">
          <button 
            className="btn" 
            onClick={() => getResult(Word.INFINITIVE)}>
              {Word.INFINITIVE}
            </button>
          <button 
            className="btn"
            onClick={() => getResult(Word.GERUNG)}>
              {Word.GERUNG}
            </button>
        </div>
        <p className="score">{score}</p>
      </div>
    </div>
  );
}

export default App;
