import { useContext } from "react";
import { FamilyInfoContext } from "../contexts/FamilyContext";

const useFamilyInfoStore = () => {
  const familyInfo = useContext(FamilyInfoContext);

  return familyInfo;
};

export default useFamilyInfoStore;
