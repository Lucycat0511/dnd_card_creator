import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { getSpell, getSpells } from "./dataAPI";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBBR_RUNLZj78fIBwI9fQhuFB0jwpQyqoQ",
  authDomain: "dnd-card-creator.firebaseapp.com",
  projectId: "dnd-card-creator",
  storageBucket: "dnd-card-creator.appspot.com",
  messagingSenderId: "884855028794",
  appId: "1:884855028794:web:474073a2cd4fbd35738903",
  measurementId: "G-ZBGHBVB2K0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function writeCollectionData(spellArray, colllectionName) {
  let spellData = [];
  await getSpells(spellArray).then((data) => {
    spellData = data;
  });
  const docData = {
    name: colllectionName,
    data: spellData,
  };

  const docRef = await addDoc(collection(db, "collections"), docData);
  return docRef.id;
}

export async function getCollectionData(collectionKey) {
  const docRef = doc(db, "collections", collectionKey);
  const docSnap = await getDoc(docRef);

  return {
    key: collectionKey,
    name: docSnap.data().name,
    data: docSnap.data().data,
  };
}

export async function getCollections() {
  let array = [];
  let querySnapshot = await getDocs(collection(db, "collections"));
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    array.push({
      key: doc.id,
      name: doc.data().name,
      data: doc.data().data,
    });
  });
  return array;
}

export async function updateCollectionName(key, name) {
  const collectionRef = doc(db, "collections", key);
  await updateDoc(collectionRef, {
    name: name,
  });
}

export async function updateCollectionData(key, data) {
  const collectionRef = doc(db, "collections", key);
  await updateDoc(collectionRef, {
    data: data,
  });
}

export async function deleteCollectionData(key) {
  await deleteDoc(doc(db, "collections", key));
}
