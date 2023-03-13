import {
  Box,
  Button,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FamilyFrom from "./FamilyFrom";
import { useState } from "react";
import useFamilyInformationStore from "../hooks/useFamilyInfomationStore";

const FamilyInformation = () => {
  const { addFamilyInformation, familyInformation, fetchFamilyInformation } =
    useFamilyInformationStore();

  const [isFromOpen, setIsFromOpen] = useState(false);

  const handleButtonClick = () => {
    setIsFromOpen(true);
  };
  const handleFromCancel = () => {
    setIsFromOpen(false);
  };

  const handleFormSubmit = async (form) => {
    await addFamilyInformation(form);
    await fetchFamilyInformation();
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
          {familyInformation.map((family, index) => (
            <FamilyFrom
              key={index}
              onCancel={handleFromCancel}
              isReadOnly
              defaultValue={family}
            />
          ))}
          {isFromOpen ? (
            <FamilyFrom
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

export default FamilyInformation;
