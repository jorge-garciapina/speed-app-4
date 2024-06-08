import {
  Button,
  styled,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  SelectChangeEvent,
  Box,
} from "@mui/material";
import { useContext, useState } from "react";
import { SpeedTypeDispatchContext } from "../../general-store/context-provider";
import { INITIAL_TIME_INTERVAL } from "../../utils/initial-values";

import { ValidGameModes } from "../../types";
const CustomLateralComponent = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
}));

import addWordSingleton from "../../utils/get-words";
import TimerComponent from "../timer-component/index-timer";
import EndGameComponent from "../end-game-component/index-end-game-component";
import BackspaceSelector from "../backspace-action-selector/index-backspace-action";

import TimeConfiguration from "./time-configuration";
import WordsNumberConfiguration from "./text-mode-configuration";

export default function LateralMenuComponent() {
  const [timeInterval, setTimeInterval] = useState(INITIAL_TIME_INTERVAL);
  const [wordsNumber, setWordsNumber] = useState(30);
  const [gameMode, setGameMode] = useState("option1");

  const [isGameFinished, setIsGameFinished] = useState(false);

  const dispatch = useContext(SpeedTypeDispatchContext);

  function timeChanges(value: number) {
    setTimeInterval(value as number);
  }

  function wordsNumberChanges(value: number) {
    setWordsNumber(value);
  }

  function handleGameModeChange(event: SelectChangeEvent<string>) {
    dispatch!({
      type: "update-game-mode",
      newGameMode: event.target.value as ValidGameModes,
    });
    setGameMode(event.target.value as string);
  }

  function startGame() {
    const currentModeText = addWordSingleton.setWordGameMode1();

    // let currentModeText;
    // if (gameMode === "option1") {
    //   currentModeText = addWordSingleton.setWordGameMode1();
    // } else if (gameMode === "option2") {
    //   currentModeText = addWordSingleton.setWordGameMode2();
    // }
    dispatch!({
      type: "start-game",
      totalTime: timeInterval,
      newWordsNumber: wordsNumber,
      difficulty: 0,
      newWord: currentModeText,
    });
  }

  function finishGame() {
    setIsGameFinished(true);
  }

  function restartIsGameFinished() {
    setIsGameFinished(false);
  }

  return (
    <CustomLateralComponent sx={{ height: "100vh" }}>
      <EndGameComponent
        isGameFinished={isGameFinished}
        restartIsGameFinished={restartIsGameFinished}
      />

      <TimerComponent finishGame={finishGame} />

      <TimeConfiguration timeChanges={timeChanges} />

      <FormControl fullWidth variant="outlined" margin="normal">
        <InputLabel id="game-mode-label">Game Mode</InputLabel>
        <Select
          labelId="game-mode-label"
          id="game-mode-select"
          value={gameMode}
          onChange={handleGameModeChange}
          label="Game Mode"
        >
          <MenuItem value="option1">Time</MenuItem>
          <MenuItem value="option2">Text</MenuItem>
        </Select>
      </FormControl>

      <BackspaceSelector />

      <Button onClick={startGame} variant="playAgain">
        Start
      </Button>

      {gameMode === "option2" && (
        <WordsNumberConfiguration setWordsNumber={wordsNumberChanges} />
      )}
    </CustomLateralComponent>
  );
}
