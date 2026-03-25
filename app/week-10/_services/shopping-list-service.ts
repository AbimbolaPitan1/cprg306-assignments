import { db } from "../_utils/firebase";
import { collection, getDocs, addDoc, query } from "firebase/firestore";


type Item = {
  name: string;
  quantity: number;
  category: string;
};


export const getItems = async (userId: string): Promise<(Item & { id: string })[]> => {
  const itemsRef = collection(db, "users", userId, "items");
  const q = query(itemsRef);

  const snapshot = await getDocs(q);

  const items: (Item & { id: string })[] = [];

  snapshot.forEach((doc) => {
    items.push({
      id: doc.id,
      ...(doc.data() as Item),
    });
  });

  return items;
};


export const addItem = async (userId: string, item: Item): Promise<string> => {
  const itemsRef = collection(db, "users", userId, "items");

  const docRef = await addDoc(itemsRef, item);

  return docRef.id;
};