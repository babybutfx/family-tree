import * as React from "react";
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

import useFamilyInfoStore from "../hooks/useFamilyInfoStore";
import { MemberPosition } from "../constants";

function Row({ row }) {
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          {row.member.length > 0 && (
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          )}
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

const FamilyTable = () => {
  const { familyInfo } = useFamilyInfoStore();

  const data = familyInfo.map((member) => {
    const { firstname, lastname, ...rest } = member;

    return {
      ...rest,
      name: `${firstname} ${lastname}`,
      member: [
        ...(rest.pids
          ? rest.pids.map((pid) => {
              const pMember = familyInfo.find((f) => f.id === pid);

              return {
                relationship: MemberPosition.Spouse,
                name: `${pMember.firstname} ${pMember.lastname}`,
                status: pMember.status,
              };
            })
          : []),
        ...(rest.cids
          ? rest.cids.map((cid) => {
              const pMember = familyInfo.find((f) => f.id === cid);

              return {
                relationship: MemberPosition.Child,
                name: `${pMember.firstname} ${pMember.lastname}`,
                status: pMember.status,
              };
            })
          : []),
      ],
    };
  });

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
                {data.map((row) => (
                  <Row key={row.id} row={row} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      </Box>
    </Container>
  );
};

export default FamilyTable;
