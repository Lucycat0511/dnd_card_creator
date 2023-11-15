// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import {
//   getDatabase,
//   ref,
//   set,
//   get,
//   child,
//   query,
//   orderByChild,
//   equalTo,
//   orderByKey,
//   off,
// } from "firebase/database";
// import { v4 } from "uuid";
// import { getSpell } from "./dataAPI";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBBR_RUNLZj78fIBwI9fQhuFB0jwpQyqoQ",
//   authDomain: "dnd-card-creator.firebaseapp.com",
//   projectId: "dnd-card-creator",
//   storageBucket: "dnd-card-creator.appspot.com",
//   messagingSenderId: "884855028794",
//   appId: "1:884855028794:web:474073a2cd4fbd35738903",
//   measurementId: "G-ZBGHBVB2K0",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = getDatabase(app);
// var spellData = [];
// export async function writeCollectionData() {
//   ["acid-arrow"].forEach((item) => {
//     getSpell(item).then((data) => {
//       spellData.push(data);
//     });
//   });
//   let l = 0;
//   getCollections().then((data) => {
//     l = data.length;
//   });
//   setTimeout(() => {
//     console.log(spellData);

//     set(ref(db, "collections/" + l), {
//       key: v4(),
//       name: "Name1",
//       data: [...spellData],
//     });
//   }, 2000);
// }

// export function getCollectionData(collectionKey) {
//   const myQuery = query(ref(db, "collection"));
//   console.log(myQuery);
// }

// export async function getCollections() {
//   let collections;
//   await get(child(ref(db), `collections/`)).then((data) => {
//     if (data.exists()) {
//       collections = data.val();
//     } else {
//       console.log("No data available");
//     }
//   });
//   return collections;
// }

// Firestore
// Import the functions you need from the SDKs you need
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
