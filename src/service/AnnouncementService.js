import { db } from "../firebase/firebase";

import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

const announcementCollection =
  collection(db, "announcements");

class AnnouncementService {

  // Create
  addAnnouncement = async (newAnnouncement) => {
    return await addDoc(
      announcementCollection,
      newAnnouncement
    );
  };

  // Read
  getAllAnnouncements = async () => {
    return await getDocs(
      announcementCollection
    );
  };

  // Update
  updateAnnouncement = async (
    id,
    updatedAnnouncement
  ) => {
    const announcementDoc = doc(
      db,
      "announcements",
      id
    );

    return await updateDoc(
      announcementDoc,
      updatedAnnouncement
    );
  };

  // Delete
  deleteAnnouncement = async (id) => {
    const announcementDoc = doc(
      db,
      "announcements",
      id
    );

    return await deleteDoc(
      announcementDoc
    );
  };
}

export default new AnnouncementService();