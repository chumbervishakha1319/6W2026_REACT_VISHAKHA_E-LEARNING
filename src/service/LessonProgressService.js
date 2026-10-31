import { db } from "../firebase/firebase";

import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

const progressCollection = collection(
  db,
  "lessonProgress"
);

class LessonProgressService {

  // Mark lesson as completed
  markLessonComplete = async (progressData) => {
    return await addDoc(
      progressCollection,
      progressData
    );
  };

  // Get all progress
  getAllProgress = async () => {
    return await getDocs(
      progressCollection
    );
  };

  // Get student's completed lessons
  getStudentCourseProgress = async (
    studentId,
    courseId
  ) => {

    const q = query(
      progressCollection,
      where(
        "studentId",
        "==",
        studentId
      ),
      where(
        "courseId",
        "==",
        courseId
      )
    );

    return await getDocs(q);
  };

}

export default new LessonProgressService();