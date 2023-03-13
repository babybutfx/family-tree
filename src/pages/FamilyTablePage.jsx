import React from "react";

import CustomAppBar from "../components/CustomAppBar";
import FamilyTable from "../components/FamilyTable";

const FamilyTablePage = () => {
  return (
    <div>
      <CustomAppBar title="Table Membership" />
      <FamilyTable />
    </div>
  );
};

export default FamilyTablePage;
