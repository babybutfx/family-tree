import { useState } from "react";
import dayjs from "dayjs";

const useFamilyForm = ({ value }) => {
  const formValue = value ?? {
    firstname: "",
    lastname: "",
    nickname: "",
    birthday: "",
    gender: "",
    status: "",
  };

  const [form, setForm] = useState(formValue);

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

  return { form, handleFormChange };
};

export default useFamilyForm;
