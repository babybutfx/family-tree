import {
  collection,
  doc,
  getDocs,
  addDoc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore } from "../firebase";

const COLLECTION = "FamilyInformation";

const useFamilyInformationStore = () => {
  const [familyInformation, setFamilyInformation] = useState([]);

  const fetchFamilyInformation = async () => {
    const querySnapshot = await getDocs(collection(firestore, COLLECTION));

    const newFamilyInformation = [];
    querySnapshot.docs.forEach((doc) => {
      newFamilyInformation.push({ id: doc.id, ...doc.data() });
    });

    setFamilyInformation(newFamilyInformation);
  };

  useEffect(() => {
    fetchFamilyInformation();
  }, []);

  const addFamilyInformation = async ({
    firstname,
    lastname,
    nickname,
    birthday,
    status,
  }) => {
    await addDoc(collection(firestore, COLLECTION), {
      firstname,
      lastname,
      nickname,
      birthday,
      status,
    });
  };

  const updateRelationship = async (form) => {
    const { id, memberRef, ...params } = form;

    const spouseObj = memberRef.find(
      (member) => member.relationship === "spouse"
    );

    const spouse = spouseObj
      ? doc(firestore, COLLECTION, spouseObj.id)
      : undefined;

    setDoc(spouse, { hasBeenRef: true }, { merge: true });

    const children = memberRef
      .filter((member) => member.relationship !== "spouse")
      .map((member) => {
        const docRef = doc(firestore, COLLECTION, member.id);

        setDoc(docRef, { hasBeenRef: true }, { merge: true });

        return docRef;
      });

    await setDoc(doc(firestore, COLLECTION, id), {
      ...params,
      memberRef: {
        ...(spouse && { spouse }),
        ...(children.length > 0 && { children: [...children] }),
      },
    });
  };

  return {
    addFamilyInformation,
    familyInformation,
    fetchFamilyInformation,
    updateRelationship,
  };
};

export default useFamilyInformationStore;
