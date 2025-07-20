import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

// Firebase Console'dan alacağımız config
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAaS4lIJE05GanvTrBBXVp4qtyCDrmNWpM",
  authDomain: "bringolino-cd14c.firebaseapp.com",
  projectId: "bringolino-cd14c",
  storageBucket: "bringolino-cd14c.firebasestorage.app",
  messagingSenderId: "3410277143",
  appId: "1:3410277143:web:9d589af46d2ca8cdfa3d52"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase initialize
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// Demo functions
export const addTask = async (task: string) => {
  try {
    const docRef = await addDoc(collection(db, "tasks"), {
      task: task,
      completed: false,
      createdAt: new Date()
    });
    console.log("Task added with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error adding task: ", e);
  }
};

export const getTasks = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "tasks"));
    const tasks: any[] = [];
    querySnapshot.forEach((doc) => {
      tasks.push({ id: doc.id, ...doc.data() });
    });
    return tasks;
  } catch (e) {
    console.error("Error getting tasks: ", e);
  }
};
