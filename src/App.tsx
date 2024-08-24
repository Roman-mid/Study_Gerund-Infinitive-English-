import React from "react";
import { gerung, infinitive } from "./constans/words";
import ModalScore from "./components/ModalScore/ModalScore";
import ModalWrongWords from "./components/ModalWrongWords/ModalWrongWords";
import { languages } from "./constans/languages";
import Button from "./components/Button/Button";
import SelectLangList from "./components/SelectLanguage/SelectLangList";
import { getTranslate } from "./utils/getTranslate";
import { getNumber } from "./utils/getNumber";
import { ScoreType } from "./components/ModalScore/ModalScore.types";
import { Word } from "./constans/word.types";
import "./App.css";

function App() {
  const [infinitiveWords, setInfinitiveWords] = React.useState<string[][]>([
    ...infinitive,
  ]);
  const [gerungWords, setGerungWords] = React.useState<string[][]>([...gerung]);
  const [translate, setTranslate] = React.useState<string>("");
  const [languageTranslate, setLanguageTranslate] = React.useState<string>(
    localStorage.getItem("lang") ?? ""
  );
  const [inputValue, setInputValue] = React.useState<string>("");
  const [isOpenLangs, setIsOpenLangs] = React.useState<boolean>(false);

  const [word, setWord] = React.useState<string[]>([]);
  const [correct, setCorrect] = React.useState<string>("");
  const [score, setScore] = React.useState<ScoreType>({
    correct: 0,
    noCorrect: 0,
  });
  const [meaning, setMeaning] = React.useState<boolean>(false);
  const [finish, setFinish] = React.useState<boolean>(false);
  const [isDisabled, setIsDisabled] = React.useState<boolean>(false);
  const [count, setCount] = React.useState<number>(0);
  const [noCorrectWord, setNoCorrectWord] = React.useState<string[][]>([]);
  const [modalWrongWords, setModalWrongWords] = React.useState<boolean>(false);

  const showMeaning = meaning ? word[1] : word[0];

  const language = languageTranslate ? JSON.parse(languageTranslate) : "";

  React.useEffect(() => {
    getWord();
  }, []);

  console.log(infinitiveWords);

  const getWord = () => {
    setTranslate("");
    setMeaning(false);
    let list: number = 0;
    if (!infinitiveWords.length && !gerungWords.length) {
      return;
    }
    if (infinitiveWords.length && gerungWords.length) {
      list = getNumber(2);
    }
    if (!infinitiveWords.length && gerungWords.length) {
      list = 1;
    }
    if (!gerungWords.length && infinitiveWords.length) {
      list = 0;
    }

    if (list === 0) {
      const wordInd: number = getNumber(infinitiveWords.length);
      setWord(infinitiveWords[wordInd]);
      setInfinitiveWords(
        infinitiveWords.filter((arr) => arr !== infinitiveWords[wordInd])
      );
    } else {
      const wordInd = getNumber(gerungWords.length);
      setWord(gerungWords[wordInd]);
      setGerungWords(gerungWords.filter((arr) => arr !== gerungWords[wordInd]));
    }
    setMeaning(false);
  };

  const getResult = (categofy: string) => {
    if (infinitive.includes(word) && categofy === Word.INFINITIVE) {
      setCorrect("Correct");
      setScore({ ...score, correct: score.correct + 1 });
    } else if (gerung.includes(word) && categofy === Word.GERUND) {
      setCorrect("Correct");
      setScore({ ...score, correct: score.correct + 1 });
    } else {
      setCorrect("False");
      setScore({ ...score, noCorrect: score.noCorrect + 1 });
      setNoCorrectWord([...noCorrectWord, word]);
    }

    setIsDisabled(true);
    setCount((prev) => prev + 1);

    setTimeout(() => {
      if (count === infinitive.length + gerung.length - 1) {
        setFinish(true);
      }
      getWord();
      setCorrect("");
      setIsDisabled(false);
    }, 1000);
  };

  const tryAgain = () => {
    setScore({ correct: 0, noCorrect: 0 });
    setFinish(false);
    setCount(0);
    setGerungWords([...gerung]);
    setInfinitiveWords([...infinitive]);
    setNoCorrectWord([]);
  };

  const getMeaning = () => {
    setMeaning((prev) => !prev);
    setTranslate("");
  };

  const showCorectWord = () => {
    if (translate) {
      return translate;
    }
    if (meaning) {
      return word[1];
    } else {
      return word[0];
    }
  };

  const chooseLanguage = (e: React.MouseEvent<HTMLLIElement>) => {
    const target = e.target as HTMLElement;
    localStorage.setItem("lang", target.dataset.value ?? "");
    setLanguageTranslate(localStorage.getItem("lang") ?? "");
    toggleOpenLangs();
  };

  const findLanguage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value.trim());
  };

  const toggleOpenLangs = () => {
    setIsOpenLangs((prev) => !prev);
    setInputValue("");
  };

  return (
    <>
      <div
        className={
          correct === "Correct"
            ? "App correct"
            : correct === "False"
            ? "App noCorrect"
            : "App"
        }
      >
        <div className="container">
          <h1 className="title">What do you need use with word?</h1>
          <h1 className={meaning ? "meaning" : "word"}>{showCorectWord()}</h1>
          <div className="btnsWrap">
            <div className="btnChoose">
              <Button
                disabled={isDisabled}
                onClick={() => getResult(Word.GERUND)}
              >
                {Word.GERUND}
              </Button>
              <Button
                disabled={isDisabled}
                onClick={() => getResult(Word.INFINITIVE)}
              >
                {Word.INFINITIVE}
              </Button>
            </div>
            <Button
              className="btnTranslate"
              disabled={isDisabled}
              onClick={getMeaning}
            >
              {!meaning ? "Meaning" : "Word"}
            </Button>
            <Button
              className="btnTranslate"
              disabled={isDisabled}
              onClick={() =>
                getTranslate(
                  showMeaning,
                  language.language,
                  translate,
                  setTranslate,
                  setIsDisabled
                )
              }
            >
              Translate
            </Button>
            <button
              className="selectLanguage"
              onClick={toggleOpenLangs}
              disabled={isDisabled}
            >
              Translate into:{" "}
              <span>{language ? language.name : "English"}</span>
            </button>

            {isOpenLangs && (
              <SelectLangList
                inputValue={inputValue}
                list={languages}
                onChange={findLanguage}
                onClick={chooseLanguage}
              />
            )}
          </div>

          {!isOpenLangs && (
            <>
              <div className="wrapScore">
                <p className="score">correct: {score.correct}</p>
                <p className="score">no correct: {score.noCorrect} </p>
              </div>
              <p className="score">
                word number: {count} / {infinitive.length + gerung.length}
              </p>
            </>
          )}
        </div>
      </div>
      {finish && (
        <ModalScore
          score={score}
          numberWords={infinitive.length + gerung.length}
          tryAgain={tryAgain}
          setModalWrongWords={setModalWrongWords}
          setFinish={setFinish}
        />
      )}
      {modalWrongWords && (
        <ModalWrongWords
          tryAgain={tryAgain}
          setModalWrongWords={setModalWrongWords}
          noCorrectWord={noCorrectWord}
        />
      )}
    </>
  );
}

export default App;
