import { useState, useEffect, useContext } from "react";
import { SpeedTypeContext } from "../../general-store/context-provider";
import { Typography } from "@mui/material";

type SucessVisualizerPropsType = {
  success?: number;
};

export default function SucessVisualizer({
  success,
}: SucessVisualizerPropsType) {
  const state = useContext(SpeedTypeContext);
  const [totalSuccess, setTotalSuccess] = useState(0);

  useEffect(() => {
    setTotalSuccess(state?.InputStatistics.totalSuccess as number);
  }, [state?.InputStatistics]);

  useEffect(() => {
    if (success) {
      setTotalSuccess(success as number);
    }
  }, [success]);

  return <Typography variant="successIndicator">{totalSuccess}</Typography>;
}
