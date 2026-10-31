import { db } from "../firebase/firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const submissionCollection = collection(
  db,
  "assignmentSubmissions"
);

class AssignmentSubmissionService {

  // Create Submission
  addSubmission = async (newSubmission) => {
    return await addDoc(
      submissionCollection,
      newSubmission
    );
  };

  // Get All Submissions
  getAllSubmissions = async () => {
    return await getDocs(
      submissionCollection
    );
  };

  // Update Submission
  updateSubmission = async (
    id,
    updatedSubmission
  ) => {
    const submissionDoc = doc(
      db,
      "assignmentSubmissions",
      id
    );

    return await updateDoc(
      submissionDoc,
      updatedSubmission
    );
  };

  // Delete Submission
  deleteSubmission = async (id) => {
    const submissionDoc = doc(
      db,
      "assignmentSubmissions",
      id
    );

    return await deleteDoc(
      submissionDoc
    );
  };
}

export default new AssignmentSubmissionService();