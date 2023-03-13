import { Button, Grid, Paper, TextField, MenuItem } from "@mui/material";
import dayjs from "dayjs";
import { useState } from "react";
import { Status } from "../constants";
import RelationshipDialog from "./RelationshipDialog";

const FamilyFrom = ({ onCancel, onSubmit, defaultValue, isReadOnly }) => {
  const defaultForm = defaultValue ?? {
    firstname: "",
    lastname: "",
    nickname: "",
    birthday: "",
    status: "",
  };
  const [isEditing, setIsEditing] = useState(!isReadOnly);
  const [form, setForm] = useState(defaultForm);
  const [isOpen, setIsOpen] = useState(false);

  const handleFormChange = (e) => {
    const name = e.target.name;
    let value;
    if (name === "birthday") {
      value = dayjs(new Date(e.target.valueAsDate)).format("YYYY-MM-DD");
    } else {
      value = e.target.value;
    }

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleFormEdit = () => {
    setIsEditing(true);
  };

  const handleRelationshipAdd = () => {
    setIsOpen(true);
  };

  const handleRelationshipCancel = () => {
    setIsOpen(false);
  };

  const handleFormCancel = () => {
    setIsEditing(false);
    onCancel();
  };

  const handleFormmSubmit = () => {
    onSubmit(form);
  };

  return (
    <>
      {isReadOnly && isOpen && (
        <RelationshipDialog
          value={defaultValue}
          onCancel={handleRelationshipCancel}
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
              <MenuItem value={Status.Married}>แต่งงาน</MenuItem>
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
              {!defaultValue ? (
                <Grid item xs={2}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={handleFormmSubmit}
                    fullWidth
                  >
                    Submit
                  </Button>
                </Grid>
              ) : (
                <Grid item xs={2}>
                  <Button size="large" onClick={handleFormmSubmit} fullWidth>
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
                <Button size="large" onClick={handleRelationshipAdd} fullWidth>
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

export default FamilyFrom;
