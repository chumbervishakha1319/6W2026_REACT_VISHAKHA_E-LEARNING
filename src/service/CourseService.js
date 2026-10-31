import { db } from "../firebase/firebase";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

const courseCollection = collection(db, "courses");

class CourseService {

  addCourse = async (newCourse) => {
    return await addDoc(courseCollection, newCourse);
  };

  getAllCourses = async () => {
    return await getDocs(courseCollection);
  };

  getCourseById = async (id) => {
    const courseDoc = doc(db, "courses", id);
    return await getDoc(courseDoc);
  };

  updateCourse = async (id, updatedCourse) => {
    const courseDoc = doc(db, "courses", id);
    return await updateDoc(courseDoc, updatedCourse);
  };

  deleteCourse = async (id) => {
    const courseDoc = doc(db, "courses", id);
    return await deleteDoc(courseDoc);
  };

  // ✅ Approve / Reject Course
  updateCourseStatus = async (id, status) => {
    const courseDoc = doc(db, "courses", id);
    return await updateDoc(courseDoc, {
      approvalStatus: status,
      updatedAt: Date.now(),
    });
  };

}

export default new CourseService();