import { db } from "../firebase/firebase";

import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

const userCollection = collection(db, "users");

class UserService {

  // Create User
  addUser = async (newUser) => {
    return await addDoc(
      userCollection,
      newUser
    );
  };

  // Get All Users
  getAllUsers = async () => {
    return await getDocs(
      userCollection
    );
  };

  // Update User
  updateUser = async (
    id,
    updatedUser
  ) => {
    const userDoc = doc(
      db,
      "users",
      id
    );

    return await updateDoc(
      userDoc,
      updatedUser
    );
  };

  // Delete User
  deleteUser = async (id) => {
    const userDoc = doc(
      db,
      "users",
      id
    );

    return await deleteDoc(
      userDoc
    );
  };
}

export default new UserService();