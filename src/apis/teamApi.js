import React from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import {db} from '../firebase';

export const getTeamPasswordByName = async(name) =>{
    console.log("is exsist checking...")
    let data = await getDocs(collection(db, 'teams'));
    let pwd = "-";
    data.docs.forEach((doc) => {
        let t = doc.data();
        if(t.name === name){
            pwd = t.password;
        }
    });
    console.log(pwd);
    return pwd;
}

export const addNewTeam = async (name, password) =>{

    await addDoc(collection(db, "teams"), {
        name, password    
    });

    return true;
}
