import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { memo, useContext, useState, useEffect } from "react";
import { Box, styled, IconButton, Button } from "@mui/material";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import {
  SpeedTypeContext,
  SpeedTypeDispatchContext,
} from "../../general-store/context-provider";
import CustomAvatar from "../custom-avatar/index-custom-avatar";
import databaseSingleton from "../../utils/database-operations";
import StatisticsModal from "../statistics-modal/index-statistics-modal";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import ChangeAvatarModal from "../change-avatar/index-change-avatar";

// import ChangeName from "../change-name/index-change-name";
import ChangeNameModal from "../change-name/change-name-modal";

const CustomAppBar = styled(AppBar)(() => ({
  maxHeight: "70px",
}));

const CustomAvatarContainer = styled(Box)(() => ({
  width: "70px",
  height: "70px",
  "&: hover": {
    cursor: "pointer",
  },
}));
const GameAppBar = memo(() => {
  const state = useContext(SpeedTypeContext);
  const dispatch = useContext(SpeedTypeDispatchContext);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [statisticsInformation, setStatisticsInformation] = useState("");
  const [userName, setUserName] = useState("player");
  const [avatar, setAvatar] = useState("/static/images/avatar/avatar0.png");

  const [changeNameModalHandler, setChangeNameModalHandler] = useState(false);
  const [changeAvatarHandler, setChangeAvatarHandler] = useState(false);

  function closeChangeNameModal() {
    setChangeNameModalHandler(false);
  }

  function openChangeNameModal() {
    setChangeNameModalHandler(true);
  }

  function closeChangeAvatarModal() {
    setChangeAvatarHandler(false);
  }

  function openChangeAvatarModal() {
    setChangeAvatarHandler(true);
  }

  useEffect(() => {
    const newAvatar =
      state?.validatedUserAvatar || "/static/images/avatar/avatar0.png";
    setAvatar(newAvatar);
  }, [state?.validatedUserAvatar]);

  useEffect(() => {
    const newName = state?.validatedUserName || "player";
    setUserName(newName);
  }, [state?.validatedUserName]);

  function closeModal() {
    setIsModalOpen(false);
  }
  async function callUSerGameInfo() {
    try {
      const result = await databaseSingleton.getUserGameData({
        email: state?.validatedUserEmail as string,
      });

      if (result.success) {
        setStatisticsInformation(result.data as string);
        setIsModalOpen(true);
      } else {
        console.log(`Failed to retrieve game data: ${result.message}`);
      }
    } catch (error) {
      console.error("Error retrieving user game data:", error);
    }
  }

  function logoutHandler() {
    dispatch!({ type: "notify-user-offline" });
    navigate("/login");
  }

  return (
    <CustomAppBar position="static">
      <Toolbar>
        <StatisticsModal
          open={isModalOpen}
          handleClose={closeModal}
          statistics={statisticsInformation}
        />

        <CustomAvatarContainer onClick={openChangeAvatarModal}>
          <CustomAvatar src={avatar} />
        </CustomAvatarContainer>

        <ChangeAvatarModal
          open={changeAvatarHandler}
          closeModal={closeChangeAvatarModal}
        />

        <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
          {userName}
        </Typography>

        <Button variant="playAgain" onClick={openChangeNameModal}>
          Change Name
        </Button>
        <ChangeNameModal
          open={changeNameModalHandler}
          handleClose={closeChangeNameModal}
        />

        <IconButton onClick={callUSerGameInfo}>
          <EqualizerIcon />
        </IconButton>

        <IconButton onClick={logoutHandler}>
          <LogoutIcon />
        </IconButton>
      </Toolbar>
    </CustomAppBar>
  );
});

export default GameAppBar;
