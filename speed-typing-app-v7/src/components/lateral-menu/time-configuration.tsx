import { Typography, Slider } from "@mui/material";
import { useRef } from "react";
import { INITIAL_TIME_INTERVAL } from "../../utils/initial-values";

type TimeConfigPropsType = {
  timeChanges: (value: number) => void;
};

export default function TimeConfiguration({
  timeChanges,
}: TimeConfigPropsType) {
  const timeSlider = useRef<HTMLSpanElement>(null);

  function changeHandler(_: Event, value: number | number[]) {
    timeChanges(value as number);
  }

  return (
    <>
      <Typography variant="lateralMenuSectionHeader">Time:</Typography>

      <Slider
        onChange={changeHandler}
        ref={timeSlider}
        aria-label="Time"
        defaultValue={INITIAL_TIME_INTERVAL}
        valueLabelDisplay="auto"
        step={10}
        marks
        min={10}
        max={120}
      />
    </>
  );
}
