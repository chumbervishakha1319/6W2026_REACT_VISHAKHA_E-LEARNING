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

const certificateCollection = collection(db, "certificates");

class CertificateService {

  addCertificate = async (data) => {
    return await addDoc(certificateCollection, data);
  };

  getAllCertificates = async () => {
    return await getDocs(certificateCollection);
  };

  getCertificateById = async (id) => {
    const certificateDoc = doc(db, "certificates", id);
    return await getDoc(certificateDoc);
  };

  updateCertificate = async (id, data) => {
    const certificateDoc = doc(db, "certificates", id);
    return await updateDoc(certificateDoc, data);
  };

  deleteCertificate = async (id) => {
    const certificateDoc = doc(db, "certificates", id);
    return await deleteDoc(certificateDoc);
  };
}

export default new CertificateService();