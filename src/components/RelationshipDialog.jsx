import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import { useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import RelationshipForm from "./RelationshipForm";
import useFamilyInfoStore from "../hooks/useFamilyInfoStore";
import { MemberPosition } from "../constants";

const RelationshipDialog = ({ memberInfo, onClose }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const { familyInfo, updateRelationship } = useFamilyInfoStore();

  const relationshipList = [
    ...(memberInfo.pids
      ? memberInfo.pids.map((pid) => ({
          memberId: familyInfo.find((member) => member.id === pid).id,
          memberPosition: MemberPosition.Spouse,
        }))
      : []),
    ...(memberInfo.cids
      ? memberInfo.cids.map((cid) => ({
          memberId: familyInfo.find((member) => member.id === cid).id,
          memberPosition: MemberPosition.Child,
        }))
      : []),
  ];

  const handleButtonClick = () => {
    setIsFormOpen(true);
  };

  const handleFormCancel = () => {
    setIsFormOpen(false);
  };

  const handleFormSubmit = async (form) => {
    await updateRelationship(form);
    setIsFormOpen(false);
  };

  return (
    <Dialog open={true} maxWidth="md" fullWidth>
      <DialogTitle>
        Relationship ({memberInfo.firstname} {memberInfo.lastname})
      </DialogTitle>
      <DialogContent>
        <Stack p={2} spacing={2}>
          {relationshipList.map((relationshipMember, index) => (
            <RelationshipForm
              key={index}
              memberInfo={memberInfo}
              value={relationshipMember}
              onCancel={handleFormCancel}
              onSubmit={handleFormSubmit}
            />
          ))}
          {isFormOpen ? (
            <RelationshipForm
              isFormEdit
              memberInfo={memberInfo}
              onCancel={handleFormCancel}
              onSubmit={handleFormSubmit}
            />
          ) : (
            <Button
              variant="outlined"
              size="small"
              onClick={handleButtonClick}
              fullWidth
            >
              <Stack textAlign="center">
                <Box>
                  <AddIcon />
                </Box>
                <Box>Add Relationship</Box>
              </Stack>
            </Button>
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default RelationshipDialog;
