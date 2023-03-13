import {
  Box,
  Button,
  Dialog,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Fragment, useState } from "react";
import useFamilyInformationStore from "../hooks/useFamilyInfomationStore";

import AddIcon from "@mui/icons-material/Add";

const RelationshipDialog = ({ onCancel, onClose, value }) => {
  const memberRef = value.memberRef;
  const spouseRef = memberRef
    ? [{ id: memberRef.spouse.id, relationship: "spouse" }]
    : [];
  const childrenRef =
    memberRef && memberRef.children
      ? memberRef.children.map((child) => ({
          id: child.id,
          relationship: "children",
        }))
      : [];

  const mergedRef = [...spouseRef, ...childrenRef];

  const defaultValue =
    mergedRef.length > 0
      ? mergedRef
      : [
          {
            id: "",
            relationship: "",
          },
        ];

  const [relationships, setRelationships] = useState(defaultValue);

  const { familyInformation, updateRelationship } = useFamilyInformationStore();

  const newFamilyInformation = familyInformation.filter(
    (member) => member.id !== value.id
  );

  if (!value) return null;

  return (
    <Dialog open={true}>
      <Grid container width="600px" spacing={2} p={2}>
        <Grid item xs={12}>
          <Typography variant="h5">
            Relationship ({`${value.firstname} ${value.lastname}`})
          </Typography>
        </Grid>
        {relationships.map((item, index) => (
          <Fragment key={item.id}>
            <Grid item xs={8}>
              <TextField
                required
                select
                label="ชื่อ-นามสกุล"
                name="id"
                onChange={(e) => {
                  relationships[index].id = e.target.value;
                  setRelationships([...relationships]);
                }}
                value={item.id}
                fullWidth
              >
                {newFamilyInformation.map((member) => (
                  <MenuItem
                    key={member.id}
                    value={member.id}
                  >{`${member.firstname} ${member.lastname}`}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={4}>
              <TextField
                required
                select
                label="ความสัมพันธ์"
                name="relationship"
                onChange={(e) => {
                  relationships[index].relationship = e.target.value;
                  setRelationships([...relationships]);
                }}
                value={item.relationship}
                fullWidth
              >
                <MenuItem value={"spouse"}>คู่สมรส</MenuItem>
                <MenuItem value={"children"}>ลูก</MenuItem>
              </TextField>
            </Grid>
          </Fragment>
        ))}
        <Grid item xs={12}>
          <Button
            variant="outlined"
            size="small"
            onClick={() => {
              setRelationships([
                ...relationships,
                { id: "", relationship: "" },
              ]);
            }}
            fullWidth
          >
            <Stack textAlign="center">
              <Box>
                <AddIcon />
              </Box>
              <Box>Add Relationship</Box>
            </Stack>
          </Button>
        </Grid>
        <Grid item xs={10}>
          <Button color="error" onClick={onCancel}>
            Cancel
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Button
            onClick={() => {
              const form = { ...value, memberRef: relationships };
              updateRelationship(form);
              onClose();
            }}
            fullWidth
          >
            Update
          </Button>
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default RelationshipDialog;
