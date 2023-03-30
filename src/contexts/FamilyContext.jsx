import { createContext, useEffect, useState } from "react";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { firestore } from "../firebase";
import useGenerateID from "../hooks/useGenerateID";
import { Gender, MemberPosition } from "../constants";

export const FamilyInfoContext = createContext([]);

const COLLECTION = "FamilyInfo";

const FamilyInfoWrapper = ({ children }) => {
  const [familyInfo, setFamilyInfo] = useState([]);

  const { getFamilyUUID, increaseFamilyUUID } = useGenerateID();

  const fetchFamilyInfo = async () => {
    const querySnapshot = await getDocs(collection(firestore, COLLECTION));

    const newFamilyInfo = [];
    querySnapshot.docs.forEach((doc) => {
      newFamilyInfo.push({ ...doc.data() });
    });

    setFamilyInfo([...newFamilyInfo]);
  };

  const addFamilyInfo = async (form) => {
    const uuid = await getFamilyUUID();

    await setDoc(doc(firestore, COLLECTION, uuid.toString()), {
      id: uuid,
      ...form,
    });

    await increaseFamilyUUID();
    await fetchFamilyInfo();
  };

  const updateFamilyInfo = async (form) => {
    const { id, ...rest } = form;

    await updateDoc(doc(firestore, COLLECTION, id.toString()), {
      id,
      ...rest,
    });

    await fetchFamilyInfo();
  };

  /*** 
    { 
      thisMember,
      relationshipMember = { member, memberPosition }
    }
  ***/
  const updateRelationship = async (form) => {
    const { thisMember, relationshipMember } = form;

    const resultObj = new Map();

    const { member, memberPosition } = relationshipMember;

    switch (memberPosition) {
      case MemberPosition.Spouse:
        resultObj.set("pids", [
          ...(thisMember.pids ? thisMember.pids : []),
          member.id,
        ]);

        await updateDoc(doc(firestore, COLLECTION, member.id.toString()), {
          pids: [...(member.pids ? member.pids : []), thisMember.id],
        });
        break;
      case MemberPosition.Child:
        resultObj.set("cids", [
          ...(thisMember.cids ? thisMember.cids : []),
          member.id,
        ]);

        const parentObj =
          thisMember.gender === Gender.Male
            ? { fid: thisMember.id }
            : { mid: thisMember.id };

        await updateDoc(doc(firestore, COLLECTION, member.id.toString()), {
          ...parentObj,
        });
        break;
      default:
    }

    await updateDoc(doc(firestore, COLLECTION, thisMember.id.toString()), {
      ...Object.fromEntries(resultObj),
    });

    await fetchFamilyInfo();
  };

  useEffect(() => {
    fetchFamilyInfo();
  }, []);

  return (
    <FamilyInfoContext.Provider
      value={{
        familyInfo,
        fetchFamilyInfo,
        addFamilyInfo,
        updateFamilyInfo,
        updateRelationship,
      }}
    >
      {children}
    </FamilyInfoContext.Provider>
  );
};

export default FamilyInfoWrapper;
