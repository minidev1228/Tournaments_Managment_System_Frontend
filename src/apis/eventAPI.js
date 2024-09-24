import React from "react";
import { collection, addDoc, getDocs, deleteDoc, doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import {db} from '../firebase';
const generateId = () =>{
    let id = "";
    for(let i = 0; i<10;i++){
        let d = Math.floor(Math.random() * 10);;
        id = `${id}${d}`;
    }
    return id;
}

export const createEvent = (hplayer, gplayer, date) =>{
    let newId = generateId();
    const ref = doc(db, "events", newId);
    setDoc(ref, {hemiteam: hplayer, gastteam: gplayer, date:date , id: newId, result:[], isDone: false});
}

export const getAllEvents = async() =>{
    const events = await getDocs(collection(db, "events"));
    let rlt = [];
    events.docs.forEach(event => {
        // console.log();
        rlt.push(event.data());
    });
    return rlt;
}

export const deleteEvent = async(id) =>{
    await deleteDoc(doc(db, "events", id));
}

export const addRow = async(eventId, row) =>{
    const events = await getDocs(collection(db, "events"));
    let data = {};
    events.docs.forEach(eve => {
        if(eve.id === eventId){
            data = eve.data();
        }
    });
    const ref = doc(db, "events", eventId);
    setDoc(ref, {...data, result:[...data.result, row]});
}

export const deleteRow = async(eventId, id) =>{
    const events = await getDocs(collection(db, "events"));
    let data = {};
    events.docs.forEach(eve => {
        if(eve.id === eventId){
            data = eve.data();
        }
    });
    const ref = doc(db, "events", eventId);
    data.result = data.result.filter((res, rowId)=>rowId !== id);
    setDoc(ref, {...data, result:data.result});
}

export const getResults = async(eventId) =>{
    const events = await getDocs(collection(db, "events"));
    let data = {};
    events.docs.forEach(eve => {
        if(eve.id === eventId){
            data = eve.data();
        }
    });
    return data.result;
}