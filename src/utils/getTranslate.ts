export const getTranslate = async (
  word: string,
  language: string = "en",
  translate: string,
  setTranslate: React.Dispatch<React.SetStateAction<string>>,
  setIsDisabled: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (language === "en") {
    return;
  }

  if (translate) {
    setTranslate("");
    return;
  }
  setIsDisabled(true);

  const url = "https://deep-translate1.p.rapidapi.com/language/translate/v2";
  const options = {
    method: "POST",
    headers: {
      "x-rapidapi-key": "1e44294971msh95624e3114c83bap1e3a27jsn9af4bdf8ba1b",
      "x-rapidapi-host": "deep-translate1.p.rapidapi.com",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      q: word,
      source: "en",
      target: language,
    }),
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    const translate = result.data.translations.translatedText;
    setTranslate(translate);
    return result;
  } catch (error) {
    console.error(error);
    alert("Sorry. Something was wrong. ");
  } finally {
    setIsDisabled(false);
  }
};
