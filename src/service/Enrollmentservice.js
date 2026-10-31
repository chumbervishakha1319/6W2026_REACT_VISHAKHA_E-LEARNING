import { db } from "../firebase/firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

const enrollmentCollection = collection(db, "enrollments");

class EnrollmentService {

  // Create
  addEnrollment = async (newEnrollment) => {
    return await addDoc(enrollmentCollection, newEnrollment);
  };


  // Read
  getAllEnrollments = async () => {
    return await getDocs(enrollmentCollection);
  };


  // Update
  updateEnrollment = async (id, updatedEnrollment) => {
    const enrollmentDoc = doc(db, "enrollments", id);
    return await updateDoc(enrollmentDoc, updatedEnrollment);
  };


  // Delete
  deleteEnrollment = async (id) => {
    const enrollmentDoc = doc(db, "enrollments", id);
    return await deleteDoc(enrollmentDoc);
  };

}

export default new EnrollmentService();