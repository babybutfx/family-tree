import React from "react";

import CustomAppBar from "../components/CustomAppBar";
import FamilyInformation from "../components/FamilyInformation";

const FamilyCreationPage = () => {
  return (
    <div>
      <CustomAppBar title="Family Infromation" />
      <FamilyInformation />
    </div>
  );
};

export default FamilyCreationPage;
