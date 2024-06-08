// I will not create table for the letters. I will display more meaningful information for that
import Table from "@mui/material/Table";

import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { TableContainer, TableCell, TableBody, styled } from "@mui/material";

const CustomTableContainer = styled(TableContainer)(({ theme }) => ({
  width: "600px",
  backgroundColor: theme.palette.primary.dark,
}));

const CustomTableCellTitle = styled(TableCell)(({ theme }) => ({
  color: theme.palette.secondary.dark,
  fontSize: "1rem",
  height: "30px",
}));

const CustomTableCellData = styled(TableCell)(({ theme }) => ({
  color: theme.palette.secondary.main,
  fontSize: ".9rem",
  fontWeight: "bold",
  height: "20px",
}));

type DataTablePropsType = {
  accuracy: number;
  averageSpeed: number;
  maxSpeed: number;
};
export default function DataTable({
  accuracy,
  averageSpeed,
  maxSpeed,
}: DataTablePropsType) {
  function limitCharacters(stringToLimit: string) {
    // TODO: Add here the logic to limit the number of text displayed
    const textToLimit = stringToLimit.split("");

    textToLimit.splice(5);

    return textToLimit.join("");
  }

  return (
    <CustomTableContainer>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <CustomTableCellTitle align="center" sx={{ fontFamily: "Roboto" }}>
              Accuracy
            </CustomTableCellTitle>
            <CustomTableCellTitle align="center">
              Average Speed <br /> (chars per second)
            </CustomTableCellTitle>
            <CustomTableCellTitle align="center">
              Max Speed <br /> (chars per second)
            </CustomTableCellTitle>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow
            key={"row.accuracy"}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <CustomTableCellData align="center" component="th" scope="row">
              {limitCharacters(String(accuracy || 0))}
            </CustomTableCellData>
            <CustomTableCellData align="center">
              {limitCharacters(String(1000 / averageSpeed))}
            </CustomTableCellData>
            <CustomTableCellData align="center">{maxSpeed}</CustomTableCellData>
          </TableRow>
        </TableBody>
      </Table>
    </CustomTableContainer>
  );
}
