import { initializeApp } from "firebase/app";
import env from 'react-dotenv'

const firebaseConfig = {
  apiKey: `${env?.FIREBASE_APIKEY}`,
  authDomain:  `${env?.AUTH_DOMAIN}`,
  projectId: `${env?.PROJECT_ID}`,
  messagingSenderId: `${env?.MESSENGING_SEND}`,
  appId: `${env?.APP_ID}`,

};

export const app = initializeApp(firebaseConfig);