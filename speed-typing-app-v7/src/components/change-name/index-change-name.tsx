import { Button, TextField } from "@mui/material";
import { useState, useContext } from "react";
import databaseSingleton from "../../utils/database-operations";
import {
  SpeedTypeContext,
  SpeedTypeDispatchContext,
} from "../../general-store/context-provider";

import validateName from "../../utils/name-validation";

type ChangeNamePropType = {
  closeModal: () => void;
};
export default function ChangeName({ closeModal }: ChangeNamePropType) {
  const [newUserName, setNewUserName] = useState("player");
  const [invalidInput, setInvalidInput] = useState(false);
  const state = useContext(SpeedTypeContext);
  const dispatch = useContext(SpeedTypeDispatchContext);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const input = event.target.value;
    if (validateName(input)) {
      setInvalidInput(false);

      setNewUserName(input);
    } else {
      setInvalidInput(true);
    }
  }

  async function handleChangeName() {
    const validatedUserEmail = state?.validatedUserEmail || "";

    closeModal();

    try {
      const result = await databaseSingleton.updateUserName({
        email: validatedUserEmail,
        newUserName: newUserName,
      });

      if (result.success) {
        dispatch!({ type: "update-user-name", newUserName: newUserName });
      }
    } catch (error) {
      console.error("Error during login: ", error);
    }
  }

  return (
    <>
      <TextField
        error={invalidInput}
        onChange={handleChange}
        id="outlined-basic"
        label="New name"
        variant="outlined"
      />
      <Button
        disabled={invalidInput}
        variant="statistics"
        onClick={handleChangeName}
      >
        Change name
      </Button>
    </>
  );
}
