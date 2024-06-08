import pickARandomWord from "./pickARandomWord";

const addWordSingleton = (function () {
  let wordsArray: string[] = [];
  const fetchData = async () => {
    const response = await fetch("/words.json");
    if (response.ok) {
      const fetchedData = await response.json();
      wordsArray = fetchedData.availableWords;
    }
  };
  fetchData();

  function setWordGameMode1() {
    return pickARandomWord(wordsArray);
  }

  function setWordGameMode2() {
    const wordsArr = [];

    for (let i = 0; i <= 5; i++) {
      wordsArr.push(pickARandomWord(wordsArray));
    }

    return wordsArr.join(" ");
  }

  return {
    setWordGameMode1: () => setWordGameMode1(),
    setWordGameMode2: () => setWordGameMode2(),
  };
})();

export default addWordSingleton;
