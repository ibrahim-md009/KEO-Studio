// import { collection, getDocs, query, orderBy } from "firebase/firestore";
// import { db } from "../firebase/firebase";

// export const getWorks = async () => {
//   const q = query(collection(db, "works"), orderBy("createdAt", "desc"));
//   const snapshot = await getDocs(q);

//   return snapshot.docs.map((doc) => ({
//     id: doc.id,
//     ...doc.data(),
//   }));
// };

// export const getCategories = async () => {
//   const q = query(collection(db, "categories"), orderBy("name"));
//   const snapshot = await getDocs(q);

//   return snapshot.docs.map((doc) => ({
//     id: doc.data().name,
//     label: doc.data().name,
//   }));
// };

// export const getStatistics = async () => {
//   const q = query(collection(db, "statistics"), orderBy("createdAt", "desc"));
//   const snapshot = await getDocs(q);

//   return snapshot.docs.map((doc) => ({
//     id: doc.id,
//     ...doc.data(),
//   }));
// };

import { collection, getDocs, getDoc, doc, query, orderBy } from "firebase/firestore";
import { db } from "../firebase/firebase";

// Firestore بيرجّع createdAt كـ Timestamp object (فيه .toDate())
// بنحوّله هنا لـ ISO string عشان يتخزن بأمان في localStorage (الكاش)
// ويفضل شكله ثابت سواء جاي من الشبكة أو من الكاش. الكومبوننتس تستخدم بعد كده new Date(item.createdAt) عادي.
const normalizeDoc = (doc) => {
  const data = doc.data();
  return {
    id: doc.id,
    ...data,
    createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : (data.createdAt ?? null),
  };
};

export const getWorks = async () => {
  const q = query(collection(db, "works"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);

  return snapshot.docs.map(normalizeDoc);
};

export const getCategories = async () => {
  const q = query(collection(db, "categories"), orderBy("name"));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.data().name,
    label: doc.data().name,
  }));
};

export const getStatistics = async () => {
  const q = query(collection(db, "statistics"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);

  return snapshot.docs.map(normalizeDoc);
};

// محتوى الصفحة الرئيسية اللي بيتحكم فيه الداشبورد (collection: siteContent)
// doc "why"   => { eyebrow, title, text, cards: [{ icon, title, text }] }
// doc "about" => { title, text1, text2 }
// لو الـ doc مش موجود بنرجّع null والكومبوننت يعرض النصوص الافتراضية
export const getSiteContent = async () => {
  const [whySnap, aboutSnap] = await Promise.all([
    getDoc(doc(db, "siteContent", "why")),
    getDoc(doc(db, "siteContent", "about")),
  ]);

  return {
    why: whySnap.exists() ? whySnap.data() : null,
    about: aboutSnap.exists() ? aboutSnap.data() : null,
  };
};
