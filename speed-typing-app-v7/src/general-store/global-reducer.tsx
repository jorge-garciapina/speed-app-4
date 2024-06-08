// import evaluateInputKey from "../utils/compare-characters";
import {
  ReducerStateType,
  ActionType,
  InputStatisticsType,
  KeyboardEventObject,
  ValidGameModes,
} from "../types";
import {
  INITIAL_WORD,
  INITIAL_WORD_LENGTH,
  INITIAL_INDEX_WORD,
  INITIAL_LAST_STROKE,
  INITIAL_IS_PLAYING,
  INITIAL_SHOW_WINNER_MODAL,
  INITIAL_TIME_INTERVAL,
  INITIAL_DIFFICULTY,
  INITIAL_STATISTICS,
} from "../utils/initial-values";

export default function reducer(state: ReducerStateType, action: ActionType) {
  switch (action.type) {
    //

    ////////////////////////////////////////////////////////////////

    //
    // GAME ACTIONS:
    // ACTIONS USED TO START THE GAME:
    // The "start-game" and "close-winner-modal" should be implemented as a single action.
    // There is no need to have 2 separate events
    // index-lateral-menu 64 ***********************
    case "start-game": {
      const newWord = action.newWord;

      return {
        ...state,
        winnerModal: false,
        timeInterval: action.totalTime as number,
        difficulty: action.difficulty as number,
        currentWord: newWord as string,
        currentWordLength: newWord?.length as number,
        currentIndexInWord: -1,
        wordsNumber: action.newWordsNumber as number,
      };
    }

    // The "finish-game" and "call-winner-modal" should be implemented as a single action.
    // There is no need to have 2 separate events
    case "restart-values": {
      // index-game-view 33 ***********************
      return {
        ...state,
        currentWord: INITIAL_WORD,
        currentWordLength: INITIAL_WORD_LENGTH,
        currentIndexInWord: INITIAL_INDEX_WORD,
        lastStroke: INITIAL_LAST_STROKE,
        winnerModal: INITIAL_IS_PLAYING,
        showWinnerModal: INITIAL_SHOW_WINNER_MODAL,
        timeInterval: INITIAL_TIME_INTERVAL,
        difficulty: INITIAL_DIFFICULTY,
        InputStatistics: INITIAL_STATISTICS,
      };
    }

    case "close-winner-modal": {
      // index-game-view 35 ***********************
      console.log("CLOSE WINNER MODAL");

      return {
        ...state,
        showWinnerModal: false,
      };
    }

    case "call-winner-modal": {
      // index-game-view 46 ***********************
      return {
        ...state,
        showWinnerModal: true,
      };
    }
    case "finish-game": {
      // index-game-view 47 ***********************
      const durationOfInterval = action.newTimeInterval;
      return {
        ...state,
        winnerModal: true,
        showWinnerModal: true,
        timeInterval: durationOfInterval as number,
        inputCharacters: [],
        typedWords: 0,
      };
    }

    ////////////////////////////////////////////////////////////////

    //
    // ACTIONS USED BY THE GAME:
    case "notify-new-key": {
      // index-writting 36 ***********************
      // TRIGGERD ON EACH KEY STROKE (including no valid input -enter, backspace, etc.-)

      return { ...state, currentIndexInWord: state.currentIndexInWord++ };
    }

    case "notify-key-deleted": {
      // index-writting 36 ***********************
      // TRIGGERD ON EACH KEY STROKE (including no valid input -enter, backspace, etc.-)

      if (state.currentIndexInWord > -1 && state.isBackSpaceAllowed) {
        if (!state.isWaiting) {
          state.inputCharacters.pop();

          state.isWaiting = true;
        } else {
          state.isWaiting = false;
        }

        return { ...state, currentIndexInWord: state.currentIndexInWord-- };
      } else {
        return { ...state, currentIndexInWord: state.currentIndexInWord };
      }
    }

    // index-writting 86 ***********************
    case "update-statistics": {
      // console.log("UPDATE STATISTICS");
      return {
        ...state,
        InputStatistics: action.newStatisticsObject as InputStatisticsType,
      };
    }

    case "reset-current-index-in-word": {
      // index-writting 110 ***********************
      // This action is used to reset the index, thus the code can display a new word in the game
      // console.log("reset-current-index-in-word");
      return { ...state, currentIndexInWord: -1 };
    }

    case "update-time-of-last-stroke": {
      // index-writting 118 ***********************
      // it recieves Date.now(); to know the exact time of the stroke
      // This can be merge with: -->"notify-new-key"<--
      // Everytime this event is called the time of the last stroke is updated
      // console.log("update-time-of-last-stroke");
      return { ...state, lastStroke: action.lastStrokeTimeStamp as number };
    }

    case "change-current-word": {
      // index-writting 125 ***********************
      // TODO: This might be modified in order to replace words for sentences in the
      //       different game modes
      const newWord = action.newWord as string;
      // console.log("change-current-word");
      // This event is meant to change the current word that will be used to reference so the user
      // can test his typing abilities. It will be called every time a new word is added (not modified)
      return {
        ...state,
        currentWord: newWord,
        currentWordLength: newWord.length,
        currentIndexInWord: -1,
        typedWords: state.typedWords++, //TODO: Verify "++"" before or after */
      };
    }

    case "update-input-characters": {
      // index-writting 100 ***********************
      const { isCorrect, character } =
        action.newInputCharacter as KeyboardEventObject;

      return {
        ...state,
        inputCharacters: [...state.inputCharacters, { isCorrect, character }],
      };
    }

    case "reset-input-characters": {
      // index-writting 125 ***********************
      return {
        ...state,
        inputCharacters: [],
      };
    }

    case "update-game-mode": {
      // index-writting 125 ***********************
      return {
        ...state,
        gameMode: action.newGameMode as ValidGameModes,
      };
    }

    case "update-allow-backspace": {
      return {
        ...state,
        isBackSpaceAllowed: action.isBackSpaceAllowedValue as boolean,
      };
    }

    ////////////////////////////////////////////////////////////////

    //
    // ACTIONS USED BY LOGIN:

    case "set-userPassword": {
      // index-login 34 ***********************
      // index-register 38 ***********************

      // // console.log("set-userPassword", action.newInfo);
      return {
        ...state,
        userPassword: action.newInfo as string,
      };
    }

    case "set-user-ID": {
      // index-login 34 ***********************
      // // console.log("set-user-ID", action.newInfo);
      return {
        ...state,
        userID: action.newInfo as string,
      };
    }

    case "notify-user-online": {
      // index-login 66 ***********************
      // index-register 84 ***********************

      return {
        ...state,
        validatedUserEmail: action.validatedUserEmail as string,
        validatedUserAvatar: action.validatedUserAvatar as string,
        validatedUserName: action.validatedUserName as string,
      };
    }

    case "notify-user-offline": {
      // // console.log("LOGOUT");
      return {
        ...state,
        validatedUserEmail: "",
        validatedUserAvatar: "",
        validatedUserName: "",
      };
    }
    ////////////////////////////////////////////////////////////////

    //
    // ACTIONS USED BY REGISTER:
    case "set-userName": {
      // index-register 37 ***********************
      // // console.log("set-userName", action.newInfo);
      return {
        ...state,
        userName: action.newInfo as string,
      };
    }

    case "set-avatar": {
      // index-image-list-element 24 ***********************
      // This case will be used by the component in charge of handling the logic for the
      // icon selector (to be build)
      // // // console.log("set-avatar", action.newAvatar);
      return {
        ...state,
        avatar: action.newAvatar as string,
      };
    }

    case "set-userEmail": {
      // index-register 39 ***********************

      // // console.log("set-userEmail", action.newInfo);
      return {
        ...state,
        userEmail: action.newInfo as string,
      };
    }
    ////////////////////////////////////////////////////////////////
    // TO UPDATE USER INFORMATION

    case "update-user-name": {
      // index-register 39 ***********************

      return {
        ...state,
        validatedUserName: action.newUserName as string,
      };
    }

    case "update-avatar": {
      // index-register 39 ***********************

      return {
        ...state,
        validatedUserAvatar: action.newAvatar as string,
      };
    }

    //////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////

    default: {
      return state;
    }
  }
}
