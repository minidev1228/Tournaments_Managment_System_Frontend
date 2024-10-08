import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import config from "./config"

const app = initializeApp(config);

export const db = getFirestore(app);