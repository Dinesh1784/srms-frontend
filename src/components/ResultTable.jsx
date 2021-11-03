import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Stack } from "@mui/material";
import { Box } from "@mui/system";

const ResultTable = ({ result }) => {
  const total = () => {
    let sum = 0;
    result.forEach((res) => {
      sum += res.securedMark;
    });
    return sum;
  };

  const totalMark = total();
  console.log(totalMark);

  return (
    <Stack
      width="100vw"
      justifyContent="center"
      alignItems="center"
      marginY="50px"
    >
      <TableContainer component={Paper} sx={{ width: "650px" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Semester</TableCell>
              <TableCell align="center">Subject</TableCell>
              <TableCell align="center">Secured Mark</TableCell>
              <TableCell align="center">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {result &&
              result.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.semester}
                  </TableCell>
                  <TableCell align="center">{row.subject}</TableCell>
                  <TableCell align="center">{row.securedMark}</TableCell>
                  <TableCell align="center">
                    {row.securedMark >= 50 ? "Pass" : "Fail"}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ marginY: "20px" }}>
        <h1>
          Total Mark: <span>{totalMark}</span>
        </h1>
      </Box>
    </Stack>
  );
};

export default ResultTable;
