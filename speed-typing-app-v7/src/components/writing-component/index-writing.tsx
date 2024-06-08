import CharacterComponent from "../character-component/index-character";

import { useEffect, useState, useContext } from "react";

import { KeyboardEventObject, AllowedCharactersType } from "../../types";

import {
  SpeedTypeContext,
  SpeedTypeDispatchContext,
} from "../../general-store/context-provider";

import evaluateInputKey from "../../utils/compare-characters";
import validateInput from "../../utils/validateKeyboardEvent";

// FROM THE CUSTOM COMPONENT:
import addWordSingleton from "../../utils/get-words";
// FROM THE UTILS:
import updateStatisticsObject from "../../utils/modifyStatisticsObject";

import EndGameComponent from "../end-game-component/index-end-game-component";
function WritingComponent() {
  const state = useContext(SpeedTypeContext);
  const dispatch = useContext(SpeedTypeDispatchContext);
  const [characters, setCharacters] = useState<KeyboardEventObject[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [isGameFinished, setIsGameFinished] = useState(false);

  function finishGame() {
    setIsGameFinished(true);
  }

  function restartIsGameFinished() {
    setIsGameFinished(false);
  }

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      event.preventDefault(); //*****************THIS IS MEANT TO PREVENT KEYS LIKE "Enter", "Alt", etc */

      // The -->validateInput<-- allows to have only letters for input
      setCurrentInput(validateInput(event.key));

      if (event.key !== "Backspace") {
        dispatch!({ type: "notify-new-key" });
      } else {
        dispatch!({
          type: "notify-key-deleted",
        });
      }
    };
    if (!state?.winnerModal) {
      // In this useEffect the code creates the logic to handle the keyboard events.
      // it will run when component renders

      // Add the event listener
      window.addEventListener("keydown", handleKeyPress);
    } else {
      window.removeEventListener("keydown", handleKeyPress);
    }

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
    // }, []);
  }, [state?.winnerModal]);

  useEffect(() => {
    // TODO: This useEffect can be improven, it uses the -->state?.currentIndexInWord<--as the dependency to "listen"
    //       to changes in the keystroke.
    //       The problem here is that I have an extra dependency on the state. I might create a function and
    //       probably move this logic into the -->global-reducer<-- file, by doing that I will remove one dependency
    //       on the state
    // This useEffect is meant to execute when there are changes in the central state
    // is is used mainly to dynamically create the CharacterComponent's
    const currentIndex = state?.currentIndexInWord as number;
    const currentWord = state?.currentWord as string;
    // const inputCharacters = state?.inputCharacters;

    const currentStrokeTime = Date.now();
    if (currentInput !== "Backspace") {
      if (currentIndex >= 0 && currentIndex < currentWord.length) {
        const { isCorrect, character } = evaluateInputKey(
          currentInput,
          state?.currentWord[state?.currentIndexInWord as number] as string
        );

        if (state?.InputStatistics) {
          const newStatisticsObject = updateStatisticsObject({
            InputStatistics: state?.InputStatistics,

            keyboardEvent: {
              isCorrect,
              character,
            },
            correctCaracter: state?.currentWord[
              state?.currentIndexInWord as number
            ] as AllowedCharactersType,
            lastStrokeTimeStamp: state?.lastStroke,
            currentStrokeTimeStamp: currentStrokeTime,
          });

          dispatch!({
            type: "update-statistics",
            newStatisticsObject: newStatisticsObject,
          });
        }

        // ADDING
        dispatch!({
          type: "update-input-characters",
          newInputCharacter: { isCorrect, character },
        });
      }

      if (currentIndex >= currentWord.length) {
        // This part is meant to control the display of the words. The logic behind this is:
        //   - When currentIndex >= currentWord.length then the user has typed all the character
        //     in the word and it is time to change to a new one
        //     In that case I need to:
        //     1 - Change the current word
        //     2 - Reset the currentIndex to -1 (that was already studied, go to App or gloal-reducer to see)
        //     3 - Reset the --->characters<---

        // Step 1:
        // this function is defined in -->index-add-word<--

        const currentModeText = addWordSingleton.setWordGameMode1();

        // The code below was commented because I change the approach for the game mode 2
        // Here are the modifications I made with respect to it:
        // let currentModeText;
        // if (state?.gameMode === "option1") {
        //   currentModeText = addWordSingleton.setWordGameMode1();
        // } else if (state?.gameMode === "option2") {
        //   finishGame();
        //   currentModeText = addWordSingleton.setWordGameMode2();
        // }
        dispatch!({
          type: "change-current-word",
          newWord: currentModeText,
        });

        // Step 2:
        dispatch!({ type: "reset-current-index-in-word" });

        // SET TO ORIGINAL VALUE
        // Step 3:
        dispatch!({
          type: "reset-input-characters",
        });
      }
    }

    // The time for the last stroke is updated until all the calculations have been made
    dispatch!({
      // DISPATCHED FOR BACKSPACE
      type: "update-time-of-last-stroke",
      lastStrokeTimeStamp: currentStrokeTime,
    });
  }, [state?.currentIndexInWord]);

  useEffect(() => {
    setCharacters([]);
  }, [state?.showWinnerModal]);

  useEffect(() => {
    setCharacters(state?.inputCharacters as KeyboardEventObject[]);
  }, [state?.inputCharacters]);

  useEffect(() => {
    if (
      state?.typedWords === state?.wordsNumber &&
      (state?.typedWords as number) > 0
    ) {
      finishGame();
    }
  }, [state?.typedWords]);

  const testingMap = characters.map((element, index) => {
    return (
      <CharacterComponent
        key={index}
        character={element.character}
        isCorrect={element.isCorrect}
      />
    );
  });

  return (
    <>
      <EndGameComponent
        isGameFinished={isGameFinished}
        restartIsGameFinished={restartIsGameFinished}
      />
      {testingMap}
    </>
  );
}

export default WritingComponent;
