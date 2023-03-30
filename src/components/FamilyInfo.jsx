import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FamilyForm from "./FamilyForm";
import useFamilyInfoStore from "../hooks/useFamilyInfoStore";

const FamilyInfo = () => {
  const { addFamilyInfo, familyInfo, updateFamilyInfo } = useFamilyInfoStore();

  const [isFromOpen, setIsFromOpen] = useState(false);

  const handleButtonClick = () => {
    setIsFromOpen(true);
  };
  const handleFromCancel = () => {
    setIsFromOpen(false);
  };

  const handleFormSubmit = async (form) => {
    await addFamilyInfo(form);
    setIsFromOpen(false);
  };

  const handleFromUpdate = async (form) => {
    await updateFamilyInfo(form);
    setIsFromOpen(false);
  };

  return (
    <Container>
      <Box py={4}>
        <Box>
          <Typography variant="h4">Family Information</Typography>
        </Box>
        <Divider />
        <Stack p={2} spacing={2}>
          {familyInfo.map((family) => (
            <FamilyForm
              key={family.id}
              onCancel={handleFromCancel}
              onUpdate={handleFromUpdate}
              isReadOnly
              value={family}
            />
          ))}
          {isFromOpen ? (
            <FamilyForm
              onCancel={handleFromCancel}
              onSubmit={handleFormSubmit}
            />
          ) : (
            <Button
              variant="outlined"
              size="large"
              onClick={handleButtonClick}
              fullWidth
            >
              <Stack textAlign="center">
                <Box>
                  <AddIcon />
                </Box>
                <Box>Add Family Information</Box>
              </Stack>
            </Button>
          )}
        </Stack>
      </Box>
    </Container>
  );
};

export default FamilyInfo;
