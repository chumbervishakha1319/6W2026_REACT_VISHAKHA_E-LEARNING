import { db } from "../firebase/firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

const categoryCollection = collection(db, "categories");

class CategoryService {

  // Create
  addCategory = async (newCategory) => {
    return await addDoc(categoryCollection, newCategory);
  };

  // Read
  getAllCategories = async () => {
    return await getDocs(categoryCollection);
  };

  // Update
  updateCategory = async (id, updatedCategory) => {
    const categoryDoc = doc(db, "categories", id);
    return await updateDoc(categoryDoc, updatedCategory);
  };

  // Delete
  deleteCategory = async (id) => {
    const categoryDoc = doc(db, "categories", id);
    return await deleteDoc(categoryDoc);
  };

}

export default new CategoryService(); 