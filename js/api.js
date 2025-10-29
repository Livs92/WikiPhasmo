// js/api.js
import { db } from "./firebase-init.js";
import {
  getDocs,
  collection,
  orderBy,
  query,
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

export async function fetchCollection(colName, orderField = "name") {
  try {
    let q;
    if (orderField) {
      q = query(collection(db, colName), orderBy(orderField));
    } else {
      q = collection(db, colName);
    }

    const snap = await getDocs(q);
    return snap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (err) {
    console.error(`[${colName}] Erro ao buscar:`, err);
    return [];
  }
}
