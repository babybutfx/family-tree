import { useState } from "react";
import { Button, Grid, MenuItem, Paper, TextField } from "@mui/material";
import { MemberPosition, Status, Gender } from "../constants";
import useFamilyInfoStore from "../hooks/useFamilyInfoStore";

const RelationshipForm = ({
  value,
  memberInfo,
  isFormEdit,
  onCancel,
  onSubmit,
}) => {
  const { familyInfo } = useFamilyInfoStore();

  const formValue = value ?? {
    memberId: "",
    memberPosition: "",
  };

  const [form, setForm] = useState(formValue);
  const [isEdit, setIsEdit] = useState(isFormEdit);

  const memberOptions = isFormEdit
    ? familyInfo.filter((member) => {
        if (
          Object.values(memberInfo)
            .flatMap((v) => v)
            .includes(member.id)
        )
          return false;

        if (
          memberInfo.status === Status.Married &&
          member.status === Status.Married &&
          memberInfo.gender === member.gender
        )
          return false;

        if (memberInfo.gender === Gender.Male && member.fid) return false;
        if (memberInfo.gender === Gender.Female && member.mid) return false;

        if (
          form.memberPosition === MemberPosition.Spouse &&
          member.status !== Status.Married
        )
          return false;

        return true;
      })
    : familyInfo;

  const handleFormEdit = () => {
    setIsEdit(true);
  };

  const handleFormCancel = () => {
    setIsEdit(false);

    onCancel?.();
  };

  const handleFormSubmit = () => {
    onSubmit?.({
      thisMember: memberInfo,
      relationshipMember: {
        member: familyInfo.find((member) => member.id === form.memberId),
        memberPosition: form.memberPosition,
      },
    });
  };

  const handleFormChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setForm({
      ...form,
      [name]: value,
    });
  };

  return (
    <Paper variant="outlined">
      <Grid container spacing={2} p={2}>
        <Grid item xs={6}>
          <TextField
            label="รายชื่อ"
            name="memberId"
            size="small"
            InputProps={{
              readOnly: !isEdit,
            }}
            onChange={handleFormChange}
            value={form.memberId}
            disabled={form.memberPosition === ""}
            required
            select
            fullWidth
          >
            {memberOptions.map((member) => (
              <MenuItem key={member.id} value={member.id}>
                {member.firstname} {member.lastname}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={2}>
          <TextField
            label="สถานภาพ"
            name="memberPosition"
            size="small"
            InputProps={{
              readOnly: !isEdit,
            }}
            onChange={handleFormChange}
            value={form.memberPosition}
            required
            select
            fullWidth
          >
            <MenuItem
              value={MemberPosition.Spouse}
              disabled={memberInfo.status !== Status.Married}
            >
              {MemberPosition.Spouse}
            </MenuItem>
            <MenuItem value={MemberPosition.Child}>
              {MemberPosition.Child}
            </MenuItem>
          </TextField>
        </Grid>
        {isEdit ? (
          <>
            <Grid item xs={2}>
              <Button
                size="large"
                color="error"
                onClick={handleFormCancel}
                sx={{ height: "100%" }}
                fullWidth
              >
                Cancel
              </Button>
            </Grid>
            {value ? (
              <Grid item xs={2}>
                <Button
                  size="large"
                  onClick={() => {}}
                  sx={{ height: "100%" }}
                  fullWidth
                >
                  Update
                </Button>
              </Grid>
            ) : (
              <Grid item xs={2}>
                <Button
                  size="large"
                  onClick={handleFormSubmit}
                  sx={{ height: "100%" }}
                  disabled={form.member === ""}
                  fullWidth
                >
                  Submit
                </Button>
              </Grid>
            )}
          </>
        ) : (
          <Grid item xs={4}>
            <Button
              size="large"
              onClick={handleFormEdit}
              sx={{ height: "100%" }}
              fullWidth
            >
              Edit
            </Button>
          </Grid>
        )}
      </Grid>
    </Paper>
  );
};

export default RelationshipForm;
