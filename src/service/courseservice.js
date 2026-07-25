import { db } from "../firebase/firebase";
import {
  collection,
  addDoc,
  getDocs,
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

  updateCourse = async (id, updatedCourse) => {
    const courseDoc = doc(db, "courses", id);
    return await updateDoc(courseDoc, updatedCourse);
  };

  deleteCourse = async (id) => {
    const courseDoc = doc(db, "courses", id);
    return await deleteDoc(courseDoc);
  };

}

export default new CourseService();