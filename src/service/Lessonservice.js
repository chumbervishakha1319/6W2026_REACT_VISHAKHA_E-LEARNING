import { db } from "../firebase/firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

const lessonCollection = collection(db, "lessons");

class LessonService {

  // Create
  addLesson = async (newLesson) => {
    return await addDoc(lessonCollection, newLesson);
  };

  // Read
  getAllLessons = async () => {
    return await getDocs(lessonCollection);
  };

  // Update
  updateLesson = async (id, updatedLesson) => {
    const lessonDoc = doc(db, "lessons", id);
    return await updateDoc(lessonDoc, updatedLesson);
  };

  // Delete
  deleteLesson = async (id) => {
    const lessonDoc = doc(db, "lessons", id);
    return await deleteDoc(lessonDoc);
  };

}

export default new LessonService();