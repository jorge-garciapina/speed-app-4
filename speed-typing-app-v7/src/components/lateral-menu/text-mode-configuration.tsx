import { Typography, Slider } from "@mui/material";
import { useRef } from "react";

type WordsNumberConfigPropsType = {
  setWordsNumber: (value: number) => void;
};

export default function WordsNumberConfiguration({
  setWordsNumber,
}: WordsNumberConfigPropsType) {
  const wordsNumber = useRef<HTMLSpanElement>(null);

  function changeHandler(_: Event, value: number | number[]) {
    setWordsNumber(value as number);
  }

  return (
    <>
      <Typography variant="lateralMenuSectionHeader">Words number:</Typography>

      <Slider
        onChange={changeHandler}
        ref={wordsNumber}
        aria-label="Words"
        defaultValue={30}
        valueLabelDisplay="auto"
        step={10}
        marks
        min={10}
        max={50}
      />
    </>
  );
}
