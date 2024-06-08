import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import AnimatedCounter from "../animated-counter/AnimatedCounter";

export default function InitialView() {
  return (
    <Link to="game">
      <AnimatedCounter />
      <Button> Click To Change view</Button>
    </Link>
  );
}
