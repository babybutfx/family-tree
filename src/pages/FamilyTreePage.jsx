import React from "react";

import CustomAppBar from "../components/CustomAppBar";
import FamilyTree from "../components/FamilyTree";

const FamilyTreePage = () => {
  return (
    <div>
      <CustomAppBar title="Tree Membership" />
      <FamilyTree />
    </div>
  );
};

export default FamilyTreePage;
