import React from "react";
import { collection, addDoc, getDocs, doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import {db} from '../firebase';

export const changeAdminPassword = async(pwd) =>{
    const ref = doc(db, "players", "0000000000");
    setDoc(ref, {name:"admin", password:pwd});
}