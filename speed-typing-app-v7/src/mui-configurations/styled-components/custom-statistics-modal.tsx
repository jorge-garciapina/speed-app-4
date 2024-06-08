import { Modal, styled } from "@mui/material";
const CustomStatisticsModal = styled(Modal)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  borderStyle: "solid",
  borderBlockColor: "white",
  borderWidth: "5px",
  width: "80%",
  height: "90%",
  padding: "5px",
  top: "5%",
  left: "10%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

export default CustomStatisticsModal;
