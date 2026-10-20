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

import { collection, getDocs, getDoc, doc, query, orderBy, where } from "firebase/firestore";
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

// الأعمال المميزة (النجمة بالداشبورد) للصفحة الرئيسية
// فلتر واحد على حقل واحد = ما بيحتاج index مركّب، والترتيب (الأحدث أولاً) بنعمله هون
export const getFeaturedWorks = async () => {
  const snapshot = await getDocs(query(collection(db, "works"), where("featured", "==", true)));
  return snapshot.docs.map(normalizeDoc).sort((a, b) => new Date(b.createdAt ?? 0) - new Date(a.createdAt ?? 0));
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
// doc "video" => { videoId, eyebrow, title, text }  (الفيديو التعريفي تحت الهيرو)
// لو الـ doc مش موجود بنرجّع null والكومبوننت يعرض النصوص الافتراضية
export const getSiteContent = async () => {
  const [whySnap, aboutSnap, videoSnap] = await Promise.all([
    getDoc(doc(db, "siteContent", "why")),
    getDoc(doc(db, "siteContent", "about")),
    getDoc(doc(db, "siteContent", "video")),
  ]);

  return {
    why: whySnap.exists() ? whySnap.data() : null,
    about: aboutSnap.exists() ? aboutSnap.data() : null,
    video: videoSnap.exists() ? videoSnap.data() : null,
  };
};
