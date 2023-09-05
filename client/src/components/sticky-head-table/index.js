import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Box, Button, Typography } from "@mui/material";

const columns = [
  { id: "name", label: "Дата", minWidth: 80 },
  { id: "code", label: "Кандидат", minWidth: 80 },
  {
    id: "size",
    label: "Статус",
    minWidth: 80,
    align: "right",
  },
];

function createData(name, code, size) {
  return { name, code, size };
}

const CTA = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <Typography
        variant="body2"
        sx={{
          borderRadius: "28px",
          backgroundColor: "blue.light",
          py: 0.5,
          px: 1,
          color: "neutral.light",
        }}
      >
        Изчакваща
      </Typography>
      <Typography
        variant="body2"
        sx={{
          borderRadius: "28px",
          backgroundColor: "neutral.dark",
          py: 0.5,
          px: 1,
          color: "neutral.light",
        }}
      >
        Отказана
      </Typography>
      <Typography
        variant="body2"
        sx={{
          borderRadius: "28px",
          backgroundColor: "green.light",
          py: 0.5,
          px: 1,
          color: "neutral.light",
        }}
      >
        Одобрена
      </Typography>
      <Typography
        variant="body2"
        sx={{
          borderRadius: "28px",
          backgroundColor: "red.light",
          py: 0.5,
          px: 1,
          color: "neutral.light",
        }}
      >
        Отхвърлена
      </Typography>
    </Box>
  );
};

const rows = [
  createData("01.01.2023", "Иван от София", <CTA />),
  createData("01.01.2023", "Иван от София", <CTA />),
  createData("01.01.2023", "Иван от София", <CTA />),
  createData("01.01.2023", "Иван от София", <CTA />),
];

const StickyHeadTable = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  return (
    <Paper sx={{ width: "100%", overflow: "auto", my: 3, borderRadius: 3 }}>
      <TableContainer sx={{ maxHeight: 355 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === "number"
                          ? column.format(value)
                          : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default StickyHeadTable;
