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

  return { addFamilyInformation, familyInformation, fetchFamilyInformation };
};

export default useFamilyInformationStore;
