// This is the modal that will be displayed when the game finishes

import { Paper, Modal, styled } from "@mui/material";
import ChangeName from "./index-change-name";

const CustomChangeNameModal = styled(Modal)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  //   backgroundColor: "white",

  borderStyle: "solid",
  borderBlockColor: "white",
  borderWidth: "5px",
  width: "25%",
  height: "20%",
  //   padding: "500px",
  top: "10%",
  left: "35%",
  padding: "10px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
}));
type ChangeNameModalPropsType = {
  open: boolean;
  handleClose: () => void;
};

export default function ChangeNameModal({
  open,
  handleClose,
}: ChangeNameModalPropsType) {
  return (
    <Paper>
      <CustomChangeNameModal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
          <ChangeName closeModal={handleClose} />
        </>
      </CustomChangeNameModal>
    </Paper>
  );
}
