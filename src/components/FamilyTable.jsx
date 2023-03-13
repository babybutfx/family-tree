import {
  Box,
  Container,
  Typography,
  Grid,
  Divider,
  Paper,
  Stack,
  TextField,
} from "@mui/material";

const FamilyTable = () => {
  return (
    <Container>
      <Box py={4}>
        <Box>
          <Typography variant="h4">Family Information</Typography>
        </Box>
        <Divider />
        <Stack p={2} spacing={2}>
          <Grid xs={12}>
            <Paper variant="outlined">
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <Typography mt={2}>ลำดับที่</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography mt={2}>รายชื่อ</Typography>
                </Grid>
              </Grid>

              <Grid container spacing={3} p={2}>
                <Grid item xs={2}>
                  <TextField
                    required
                    id="outlined-required"
                    label="ลำดับที่"
                    InputProps={{
                      readOnly: true,
                    }}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={9}>
                  <TextField
                    required
                    id="outlined-required"
                    label="รายชื่อ"
                    InputProps={{
                      readOnly: true,
                    }}
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Stack>
      </Box>
    </Container>
  );
};

export default FamilyTable;
