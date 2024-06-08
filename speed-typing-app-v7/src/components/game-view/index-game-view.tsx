import CustomPaper from "../../mui-configurations/styled-components/custom-paper";
import { Grid, Container } from "@mui/material";
import { memo, useEffect } from "react";

import LateralMenuComponent from "../lateral-menu/index-lateral-menu";
import GameAppBar from "../app-bar/index-app-bar";
import CurrentWordVisualizer from "../word-visualizer/index-word-visualizer";

import WritingComponent from "../writing-component/index-writing";

import CustomGameView from "../../mui-configurations/styled-components/custom-game-view";
import CustomWordContainer from "../../mui-configurations/styled-components/custom-word-container";

import evaluateUserCredentials from "../../utils/evaluate-user-credentials";

import { useContext } from "react";
import { SpeedTypeContext } from "../../general-store/context-provider";
import { useNavigate } from "react-router-dom";

import DataTableGame from "../statistics-visualizer/data-table-game";

const GameView = memo(() => {
  const state = useContext(SpeedTypeContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (
      !evaluateUserCredentials({
        validatedUserEmail: state?.validatedUserEmail as string,
        validatedUserName: state?.validatedUserName as string,
      })
    ) {
      navigate("/login");
    }
  }, []);
  return (
    <CustomGameView>
      <GameAppBar />

      <Container>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <LateralMenuComponent />
          </Grid>
          <Grid item xs={10}>
            <CustomPaper elevation={24}>
              <DataTableGame />

              <CustomWordContainer
              // sx={{ display: "flex", flexDirection: "column" }}
              >
                <CurrentWordVisualizer />
              </CustomWordContainer>
              <CustomWordContainer>
                <WritingComponent />
              </CustomWordContainer>
            </CustomPaper>
          </Grid>
        </Grid>
      </Container>
    </CustomGameView>
  );
});

export default GameView;
