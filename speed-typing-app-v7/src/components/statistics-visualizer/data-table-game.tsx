// I will not create table for the letters. I will display more meaningful information for that
import Table from "@mui/material/Table";

import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { TableContainer, TableCell, TableBody, styled } from "@mui/material";

import { SpeedTypeContext } from "../../general-store/context-provider";
import { useContext, useState, useEffect } from "react";

const CustomTableContainer = styled(TableContainer)(({ theme }) => ({
  width: "600px",
  //   height: "100px",
  //   backgroundColor: "red",
  backgroundColor: theme.palette.secondary.dark,
}));

const CustomTableCellTitle = styled(TableCell)(({ theme }) => ({
  color: theme.palette.primary.light,
  fontSize: "1rem",
  height: "30px",
}));

const CustomTableCellData = styled(TableCell)(({ theme }) => ({
  color: theme.palette.primary.light,
  fontSize: ".9rem",
  fontWeight: "bold",
  height: "20px",
}));

export default function DataTableGame() {
  const state = useContext(SpeedTypeContext);
  const [accuracy, setAccuracy] = useState("0");
  const [averageSpeed, setAverageSpeed] = useState("0");
  const [errorsNumber, setErrorsNumber] = useState(0);
  const [successNumber, setSuccessNumber] = useState(0);

  function limitCharacters(stringToLimit: string) {
    const textToLimit = stringToLimit.split("");

    textToLimit.splice(5);

    return textToLimit.join("");
  }

  useEffect(() => {
    const accuracy = String(state?.InputStatistics.accuracy || 0);
    setAccuracy(limitCharacters(accuracy));

    const averageSpeed = state?.InputStatistics.averageSpeed || 0;
    const averageCharsPerSecond =
      1000 / averageSpeed === Infinity ? 0 : 1000 / averageSpeed;

    setAverageSpeed(limitCharacters(String(averageCharsPerSecond)));

    setErrorsNumber(state?.InputStatistics.totalErrors as number);

    setSuccessNumber(state?.InputStatistics.totalSuccess as number);
  }, [state?.InputStatistics]);

  return (
    <CustomTableContainer>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <CustomTableCellTitle align="center">Accuracy</CustomTableCellTitle>
            <CustomTableCellTitle align="center">Errors</CustomTableCellTitle>
            <CustomTableCellTitle align="center">Success</CustomTableCellTitle>
            <CustomTableCellTitle align="center">
              Average Speed <br /> (chars per second)
            </CustomTableCellTitle>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow
            key={"row.accuracy"}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <CustomTableCellData align="center" component="th" scope="row">
              {accuracy}
            </CustomTableCellData>
            <CustomTableCellData align="center">
              {errorsNumber}
            </CustomTableCellData>
            <CustomTableCellData align="center">
              {successNumber}
            </CustomTableCellData>
            <CustomTableCellData align="center">
              {averageSpeed}
            </CustomTableCellData>
          </TableRow>
        </TableBody>
      </Table>
    </CustomTableContainer>
  );
}
