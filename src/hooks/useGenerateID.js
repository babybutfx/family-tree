import { doc, getDoc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase";

const COLLECTION = "Generate ID";

const DOCS = {
  family: "Family",
};

const useGenerateID = () => {
  const getFamilyUUID = async () => {
    const docSnapshot = await getDoc(doc(firestore, COLLECTION, DOCS.family));

    return docSnapshot.data().uuid;
  };

  const increaseFamilyUUID = async () => {
    const currentUUID = await getFamilyUUID();
    await updateDoc(doc(firestore, COLLECTION, DOCS.family), {
      uuid: currentUUID + 1,
    });
  };

  return { getFamilyUUID, increaseFamilyUUID };
};

export default useGenerateID;
