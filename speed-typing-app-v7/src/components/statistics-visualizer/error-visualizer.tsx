import { useState, useEffect, useContext } from "react";
import { SpeedTypeContext } from "../../general-store/context-provider";
import { Typography } from "@mui/material";

type ErrorVisualizerPropsType = {
  errors?: number;
};

export default function SucessVisualizer({ errors }: ErrorVisualizerPropsType) {
  const state = useContext(SpeedTypeContext);
  const [totalErrors, setTotalErrors] = useState(0);

  useEffect(() => {
    setTotalErrors(state?.InputStatistics.totalErrors as number);
  }, [state?.InputStatistics]);

  useEffect(() => {
    if (errors) {
      setTotalErrors(errors as number);
    }
  }, [errors]);

  return <Typography variant="errorsIndicator">{totalErrors}</Typography>;
}
