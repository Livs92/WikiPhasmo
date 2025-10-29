// js/firebase-init.js
// Importa os módulos do Firebase diretamente da CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

// Configuração do seu app Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDROCb4VOgVt4eHb26uDPUKNDe_Gr31kDQ",
  authDomain: "phasmowiki-fc99d.firebaseapp.com",
  projectId: "phasmowiki-fc99d",
  storageBucket: "phasmowiki-fc99d.firebasestorage.app",
  messagingSenderId: "270000303077",
  appId: "1:270000303077:web:182c8a823ce1a7d56add0c",
};

// Inicializa o app
const app = initializeApp(firebaseConfig);

// Exporta o Firestore para ser usado em outros arquivos
export const db = getFirestore(app);
