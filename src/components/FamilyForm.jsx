import { useState } from "react";
import { Button, Grid, Paper, TextField, MenuItem } from "@mui/material";
import { Status, Gender } from "../constants";
import RelationshipDialog from "./RelationshipDialog";
import useFamilyForm from "../hooks/useFamilyForm";

const FamilyForm = ({ onCancel, onSubmit, onUpdate, value, isReadOnly }) => {
  const { form, handleFormChange } = useFamilyForm({ value });
  const [isEditing, setIsEditing] = useState(!isReadOnly);
  const [isOpen, setIsOpen] = useState(false);

  const handleFormEdit = () => {
    setIsEditing(true);
  };

  const handleRelationshipAdd = () => {
    setIsOpen(true);
  };

  const handleFormCancel = () => {
    setIsEditing(false);
    onCancel();
  };

  const handleFormSubmit = () => {
    onSubmit(form);
  };

  const handleFromUpdate = () => {
    setIsEditing(false);
    onUpdate(form);
  };

  return (
    <>
      {isReadOnly && isOpen && (
        <RelationshipDialog
          memberInfo={value}
          onClose={() => setIsOpen(false)}
        />
      )}
      <Paper variant="outlined">
        <Grid container spacing={2} p={2} justifyContent="flex-end">
          <Grid item xs={3}>
            <TextField
              required
              label="ชือ"
              name="firstname"
              InputProps={{
                readOnly: !isEditing,
              }}
              onChange={handleFormChange}
              value={form.firstname}
              fullWidth
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              required
              label="นามสกุล"
              name="lastname"
              InputProps={{
                readOnly: !isEditing,
              }}
              onChange={handleFormChange}
              value={form.lastname}
              fullWidth
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              required
              label="ชื่อเล่น"
              name="nickname"
              InputProps={{
                readOnly: !isEditing,
              }}
              onChange={handleFormChange}
              value={form.nickname}
              fullWidth
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              required
              type="date"
              name="birthday"
              InputProps={{
                readOnly: !isEditing,
              }}
              onChange={handleFormChange}
              value={form.birthday}
              fullWidth
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              required
              select
              label="เพศ"
              name="gender"
              InputProps={{
                readOnly: !isEditing,
              }}
              onChange={handleFormChange}
              value={form.gender}
              fullWidth
            >
              <MenuItem value={Gender.Male}>ชาย</MenuItem>
              <MenuItem value={Gender.Female}>หญิง</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={2}>
            <TextField
              required
              select
              label="สถานภาพ"
              name="status"
              InputProps={{
                readOnly: !isEditing,
              }}
              onChange={handleFormChange}
              value={form.status}
              fullWidth
            >
              <MenuItem value={Status.Single}>โสด</MenuItem>
              <MenuItem value={Status.Married}>สมรส</MenuItem>
              <MenuItem value={Status.Divorce}>หย่าร้าง</MenuItem>
            </TextField>
          </Grid>
          {isEditing ? (
            <>
              <Grid item xs={2}>
                <Button
                  size="large"
                  color="error"
                  onClick={handleFormCancel}
                  fullWidth
                >
                  Cancel
                </Button>
              </Grid>
              {!value ? (
                <Grid item xs={2}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={handleFormSubmit}
                    fullWidth
                  >
                    Submit
                  </Button>
                </Grid>
              ) : (
                <Grid item xs={2}>
                  <Button size="large" onClick={handleFromUpdate} fullWidth>
                    Update
                  </Button>
                </Grid>
              )}
            </>
          ) : (
            <>
              <Grid item xs={2}>
                <Button size="large" onClick={handleFormEdit} fullWidth>
                  Edit
                </Button>
              </Grid>
              <Grid item xs={2}>
                <Button
                  size="large"
                  onClick={handleRelationshipAdd}
                  // disabled={form.status === Status.Single}
                  fullWidth
                >
                  Relationship
                </Button>
              </Grid>
            </>
          )}
        </Grid>
      </Paper>
    </>
  );
};

export default FamilyForm;
