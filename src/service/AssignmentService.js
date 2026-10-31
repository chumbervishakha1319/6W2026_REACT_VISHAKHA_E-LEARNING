import { db } from "../firebase/firebase";

import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

const assignmentCollection = collection(
  db,
  "assignments"
);

class AssignmentService {

  // Create Assignment
  addAssignment = async (newAssignment) => {
    return await addDoc(
      assignmentCollection,
      newAssignment
    );
  };

  // Get All Assignments
  getAllAssignments = async () => {
    return await getDocs(
      assignmentCollection
    );
  };

  // Update Assignment
  updateAssignment = async (
    id,
    updatedAssignment
  ) => {
    const assignmentDoc = doc(
      db,
      "assignments",
      id
    );

    return await updateDoc(
      assignmentDoc,
      updatedAssignment
    );
  };

  // Delete Assignment
  deleteAssignment = async (id) => {
    const assignmentDoc = doc(
      db,
      "assignments",
      id
    );

    return await deleteDoc(
      assignmentDoc
    );
  };
}

export default new AssignmentService();