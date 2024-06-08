import EndGameModal from "../end-of-game-modal/index-end-game-modal";
import { useContext, useEffect, useState } from "react";
import {
  SpeedTypeDispatchContext,
  SpeedTypeContext,
} from "../../general-store/context-provider";

import databaseSingleton from "../../utils/database-operations";

type EndGameComponentPropsType = {
  isGameFinished: boolean;
  restartIsGameFinished: () => void;
};
export default function EndGameComponent({
  isGameFinished,
  restartIsGameFinished,
}: EndGameComponentPropsType) {
  const dispatch = useContext(SpeedTypeDispatchContext);
  const state = useContext(SpeedTypeContext);
  const [endGameModal, setEndGameModal] = useState(false);

  async function finishGame() {
    setEndGameModal(true);
    dispatch!({ type: "finish-game" });
    // To save the data in IndexedDB:
    try {
      const statistics = {
        accuracy: state?.InputStatistics.accuracy,
        availableCharacters: state?.InputStatistics.availableCharacters,
        averageSpeed: state?.InputStatistics.averageSpeed,
        maxSpeed: state?.InputStatistics.maxSpeed,
        totalErrors: state?.InputStatistics.totalErrors,
        totalSuccess: state?.InputStatistics.totalSuccess,
      };

      await databaseSingleton.saveUserGameData({
        email: state?.validatedUserEmail as string,
        newGameInfoData: JSON.stringify(statistics),
      });
    } catch (error) {
      console.error("Error saving user game data:", error);
    }
  }

  const handleModalClose = () => {
    dispatch!({ type: "restart-values" });
    setEndGameModal(false);
    restartIsGameFinished();
  };

  useEffect(() => {
    if (isGameFinished === true) {
      finishGame();
    }
  }, [isGameFinished]);

  return (
    <EndGameModal
      open={endGameModal}
      // open={state?.showWinnerModal as boolean}
      handleClose={handleModalClose}
    />
  );
}
