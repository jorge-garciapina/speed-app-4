import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { SpeedTypeDispatchContext } from "../../general-store/context-provider";
import { useContext } from "react";

export default function BackspaceSelector() {
  const dispatch = useContext(SpeedTypeDispatchContext);
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch!({
      type: "update-allow-backspace",
      isBackSpaceAllowedValue: event.target.checked as boolean,
    });
  }
  return (
    <FormGroup>
      <FormControlLabel
        control={<Checkbox onChange={handleChange} />}
        label="Backspace"
      />
    </FormGroup>
  );
}
