import { Container } from "@mui/material";
import { styled } from "@mui/material";
const CustomWordContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  height: "20%",
  width: "90%",
  borderStyle: "solid",
  borderRadius: "60px",
  backgroundColor: theme.palette.primary.dark,
  //   backgroundColor: "red",
  marginTop: "10px",
}));

export default CustomWordContainer;
