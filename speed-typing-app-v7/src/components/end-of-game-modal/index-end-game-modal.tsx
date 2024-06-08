// This is the modal that will be displayed when the game finishes

import StatisticsVisualizer from "../statistics-visualizer/index-statistics-visualizer";

import { Typography, Paper, Button } from "@mui/material";
import CustomStatisticsModal from "../../mui-configurations/styled-components/custom-statistics-modal";

type EndGameModalPropsType = {
  open: boolean;
  handleClose: () => void;
};

export default function EndGameModal({
  open,
  handleClose,
}: EndGameModalPropsType) {
  return (
    <Paper>
      <CustomStatisticsModal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
          <Typography variant="endGameModal">Game Finished</Typography>
          <StatisticsVisualizer />

          <Button
            onClick={() => {
              handleClose();
            }}
            variant="playAgain"
          >
            Play Again
          </Button>
        </>
      </CustomStatisticsModal>
    </Paper>
  );
}
