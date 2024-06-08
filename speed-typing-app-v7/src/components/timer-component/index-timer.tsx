import { memo, useContext, useEffect, useRef, useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Typography,
  styled,
} from "@mui/material";
import { SpeedTypeContext } from "../../general-store/context-provider";
import { ValidGameModes } from "../../types";
import "./TimerComponent.css";

type TimerComponentPropType = {
  finishGame: () => void;
};

// Styled components
const CounterContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  margin: theme.spacing(2),
  textAlign: "center",
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.secondary.contrastText,
}));

const Digit = styled(Typography)(({ theme }) => ({
  display: "inline-block",
  color: theme.palette.secondary.main,
}));

const TimerComponent = memo(({ finishGame }: TimerComponentPropType) => {
  const state = useContext(SpeedTypeContext);

  const [timer, setTimer] = useState(state?.timeInterval as number);
  const [gameMode, setGameMode] = useState<ValidGameModes>("option1");
  const [animateTens, setAnimateTens] = useState<boolean>(false);
  const [animateUnits, setAnimateUnits] = useState<boolean>(false);
  const [animationForTimer, setAnimationForTimer] = useState<string>("flip");

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (state?.winnerModal) {
      clearInterval(intervalRef.current as ReturnType<typeof setInterval>);
    } else {
      intervalRef.current = setInterval(() => {
        if (gameMode === "option2") {
          setTimer((prevTime) => {
            setAnimateUnits(true);
            if ((prevTime + 1) % 10 === 0) {
              setAnimateTens(true);
            }
            return prevTime + 1;
          });
        } else {
          setTimer((prevTime) => {
            if (prevTime <= 0) {
              return 0;
            }
            setAnimateUnits(true);
            if (prevTime % 10 === 0) {
              setAnimateTens(true);
            }
            return prevTime - 1;
          });
        }
      }, 1000);
    }
    return () =>
      clearInterval(intervalRef.current as ReturnType<typeof setInterval>);
  }, [state?.winnerModal, gameMode]);

  useEffect(() => {
    const timeout = setTimeout(() => setAnimateUnits(false), 500);
    return () => clearTimeout(timeout);
  }, [timer % 10]);

  useEffect(() => {
    const timeout = setTimeout(() => setAnimateTens(false), 500);
    return () => clearTimeout(timeout);
  }, [Math.floor(timer / 10)]);

  useEffect(() => {
    if (timer <= 0 && gameMode === "option1") {
      finishGame();
      clearInterval(intervalRef.current as ReturnType<typeof setInterval>);
    }
  }, [timer, finishGame, gameMode]);

  useEffect(() => {
    setTimer(state?.timeInterval as number);
  }, [state?.timeInterval]);

  useEffect(() => {
    setGameMode(state?.gameMode as ValidGameModes);
    if (state?.gameMode === "option2") {
      setTimer(0);
    } else {
      setTimer(state?.timeInterval as number);
    }
  }, [state?.gameMode, state?.timeInterval]);

  const tens = Math.floor(timer / 10) || 0;
  const units = timer % 10 || 0;

  const handleAnimationChange = (event: SelectChangeEvent<string>) => {
    setAnimationForTimer(event.target.value);
  };

  return (
    <CounterContainer elevation={3}>
      <Box className="counter" sx={{ marginBottom: 2 }}>
        <Digit
          // component="span"
          variant="h3"
          className={`digit ${animateTens ? animationForTimer : ""}`}
        >
          {tens}
        </Digit>
        <Digit
          // component="span"
          variant="h3"
          className={`digit ${animateUnits ? animationForTimer : ""}`}
        >
          {units}
        </Digit>
      </Box>

      <FormControl variant="outlined" fullWidth>
        <InputLabel id="animation-type-label">Animation</InputLabel>
        <Select
          labelId="animation-type-label"
          id="animation-type-select"
          value={animationForTimer}
          onChange={handleAnimationChange}
          label="Animation Type"
        >
          <MenuItem value="flip">Flip</MenuItem>
          <MenuItem value="slide">Slide</MenuItem>
        </Select>
      </FormControl>
    </CounterContainer>
  );
});

export default TimerComponent;
