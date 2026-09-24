import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase/firebase";

export const getWorks = async () => {
  const q = query(collection(db, "works"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const getCategories = async () => {
  const q = query(collection(db, "categories"), orderBy("name"));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.data().name,
    label: doc.data().name,
  }));
};

export const getNews = async () => {
  const q = query(collection(db, "news"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const getStatistics = async () => {
  const q = query(collection(db, "statistics"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};
