import * as React from "react";
import PropTypes from "prop-types";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
  Divider,
  Stack,
  Container,
  Box,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableContainer,
  TableCell,
  IconButton,
  Collapse,
  Paper,
} from "@mui/material";

function createData(id, relationship, name, status) {
  return {
    id,
    relationship,
    name,
    status,
    member: [
      {
        relationship: "คู่สมรส",
        name: "Bear  Fuffy",
        status: "แต่งงาน",
      },
      {
        relationship: "ลูก",
        name: "Caspain  Selest",
        status: "โสด",
      },
      {
        relationship: "ลูก",
        name: "Casper  Selest",
        status: "โสด",
      },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.status}</TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                My Membership
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>relationship</TableCell>
                    <TableCell>name</TableCell>
                    <TableCell align="right">status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.member.map((memberShip) => (
                    <TableRow key={memberShip.relationship}>
                      <TableCell component="th" scope="row">
                        {memberShip.relationship}
                      </TableCell>
                      <TableCell>{memberShip.name}</TableCell>
                      <TableCell align="right">{memberShip.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    name: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    member: PropTypes.arrayOf(
      PropTypes.shape({
        relationship: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

const rows = [
  createData("11111", " dad", "Darin Selest", "แต่งงาน"),
  createData("22222", "dad", "Hadis Selest", "หย่าร้าง"),
  createData("33333", "dad", "ell Selest", "หย่าร้าง"),
];

export default function CollapsibleTable() {
  return (
    <Container>
      <Box py={4}>
        <Box>
          <Typography variant="h4">Table Membership</Typography>
        </Box>
        <Divider />
        <Stack p={2} spacing={20}>
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Status</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {rows.map((row) => (
                  <Row key={row.id} row={row} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      </Box>
    </Container>
  );
}
