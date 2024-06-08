import { Container } from "@mui/material";
import { styled } from "@mui/material";
const CustomGameView = styled(Container)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.light,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  height: "100vh",
}));

export default CustomGameView;
