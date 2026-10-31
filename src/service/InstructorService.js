import { db } from "../firebase/firebase";

import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const instructorCollection = collection(db, "instructors");

class InstructorService {

  // Add Instructor
  addInstructor = async (newInstructor) => {
    return await addDoc(
      instructorCollection,
      newInstructor
    );
  };

  // Get All Instructors
  getAllInstructors = async () => {
    return await getDocs(instructorCollection);
  };

  // Get Instructor By Id
  getInstructorById = async (id) => {
    const instructorDoc = doc(
      db,
      "instructors",
      id
    );

    return await getDoc(instructorDoc);
  };

  // Update Instructor
  updateInstructor = async (
    id,
    updatedInstructor
  ) => {
    const instructorDoc = doc(
      db,
      "instructors",
      id
    );

    return await updateDoc(
      instructorDoc,
      updatedInstructor
    );
  };

  // Delete Instructor
  deleteInstructor = async (id) => {
    const instructorDoc = doc(
      db,
      "instructors",
      id
    );

    return await deleteDoc(instructorDoc);
  };
}

export default new InstructorService();