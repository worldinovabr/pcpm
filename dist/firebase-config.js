'use strict';
// Conexão do PCP Weslei com o Firebase (projeto pcpm-98551).
// Estes valores identificam o projeto no navegador; não são segredos de servidor -
// todo app web Firebase expõe este bloco publicamente no código-fonte do cliente.
// A segurança real dos dados é garantida pelas Regras de Segurança do Firestore
// (veja ../firestore.rules e aplique em
// https://console.firebase.google.com/project/pcpm-98551/firestore/rules),
// não pelo sigilo desta configuração.
const firebaseConfig = {
  apiKey: "AIzaSyDcYnfhIi8frLWe4fgMemHJUU0_zHzX1C4",
  authDomain: "pcpm-98551.firebaseapp.com",
  projectId: "pcpm-98551",
  storageBucket: "pcpm-98551.firebasestorage.app",
  messagingSenderId: "678053785574",
  appId: "1:678053785574:web:e00d9a0eac9f3ca939f027",
  measurementId: "G-TN5MC9HQ4T"
};

// Falhas aqui (sem internet, CDN bloqueado, etc.) não podem impedir o app de
// funcionar: o sistema continua operando apenas com localStorage neste caso.
try {
  firebase.initializeApp(firebaseConfig);
  try { firebase.analytics() } catch (e) { console.warn('Firebase Analytics indisponível:', e) }
  window.firestore = firebase.firestore();
  try { window.firestore.enablePersistence({ synchronizeTabs: true }) }
  catch (e) { console.warn('Persistência offline do Firestore indisponível:', e) }
} catch (e) {
  console.warn('Firebase indisponível; o sistema seguirá salvando apenas neste navegador.', e);
}
