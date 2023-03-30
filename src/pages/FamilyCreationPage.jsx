import React from "react";

import CustomAppBar from "../components/CustomAppBar";
import FamilyInfo from "../components/FamilyInfo";

const FamilyCreationPage = () => {
  return (
    <div>
      <CustomAppBar title="Family Infromation" />
      <FamilyInfo />
    </div>
  );
};

export default FamilyCreationPage;
