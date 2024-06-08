import { Paper } from "@mui/material";

import { styled } from "@mui/material";

const CustomPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  borderColor: theme.palette.primary.dark,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  // padding: "0px 20px 10px",
  width: "100%",
  height: "90%",
}));

export default CustomPaper;
