// This is the modal that will be displayed when the game finishes

import { useEffect, useState } from "react";
import StatisticsVisualizer from "../statistics-visualizer/index-statistics-visualizer";
import { Paper, Button } from "@mui/material";
// import { Typography, Paper, Button, Modal, styled } from "@mui/material";

import CustomStatisticsModal from "../../mui-configurations/styled-components/custom-statistics-modal";

type StatisticsModalPropsType = {
  open: boolean;
  handleClose: () => void;
  statistics: string;

  // I need to think more about the information recieved
};

export default function StatisticsModal({
  open,
  handleClose,
  statistics,
}: // I need to think more about the information recieved
StatisticsModalPropsType) {
  const [propStatistics, setPropStatistics] = useState("");

  useEffect(() => {
    setPropStatistics(statistics);
  }, [statistics]);

  return (
    <Paper>
      <CustomStatisticsModal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
          {/* <Typography variant="endGameModal">Game Finished</Typography> */}
          <StatisticsVisualizer statistics={propStatistics} />

          <Button
            onClick={() => {
              handleClose();
            }}
            variant="playAgain"
          >
            Close
          </Button>
        </>
      </CustomStatisticsModal>
    </Paper>
  );
}
