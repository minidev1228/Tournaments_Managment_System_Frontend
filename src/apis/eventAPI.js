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
    let hteamName, gteamName;
    events.docs.forEach(eve => {
        if(eve.id === eventId){
            data = eve.data();
            hteamName = data.hemiteam;
            gteamName = data.gastteam;
        }
    });
    const ref = doc(db, "events", eventId);
    setDoc(ref, {...data, result:[...data.result, row]});

    let a = 0, b = 0, aa = 0, bb = 0;
    let hFirstName = row.hteam.split(" ")[0];
    let hLastName = row.hteam.split(" ")[1];
    let gFirstName = row.gteam.split(" ")[0];
    let gLastName = row.gteam.split(" ")[1];
    if(row.hset1>row.gset1) a++;
    if(row.hset1<row.gset1) b++;
    if(row.hset2>row.gset2) a++;
    if(row.hset2<row.gset2) b++;
    if(row.hset3>row.gset3) a++;
    if(row.hset3<row.gset3) b++;
    if(row.hscore<row.gscore) bb = 1;
    if(row.hscore>row.gscore) aa = 1;
    let hdata;
    let gdata;
    const teams = await getDocs(collection(db, "teams"));
    teams.docs.forEach(team => {
        let td = team.data();
        if(td.name === hteamName){
            hdata = td;
        }
        if(td.name === gteamName){
            gdata = td;
        }
    });
    console.log("hdata ===> ", hdata);
    console.log("gdata ===> ", gdata);
    hdata.members = hdata.members.map((member)=>{
        if(member.firstName === hFirstName && member.lastName === hLastName){
            return {...member, rank: member.rank + a};
        }
    })
    hdata = {...hdata, rank: hdata.rank + aa};
    gdata = {...gdata, rank: gdata.rank + bb};
    gdata.members = gdata.members.map((member)=>{
        if(member.firstName === gFirstName && member.lastName === gLastName){
            return {...member, rank: member.rank + b};
        }
    })
    const reff = doc(db, "teams", hdata.id);
    setDoc(reff, hdata);
    const refff = doc(db, "teams", gdata.id);
    setDoc(refff, gdata);
}

export const deleteRow = async(eventId, id) =>{
    const events = await getDocs(collection(db, "events"));
    let hteamName, gteamName;
    let data = {};
    events.docs.forEach(eve => {
        if(eve.id === eventId){
            data = eve.data();
            hteamName = data.hemiteam;
            gteamName = data.gastteam;
        }
    });
    const ref = doc(db, "events", eventId);
    let row = data.result[id];
    data.result = data.result.filter((res, rowId)=>rowId !== id);
    setDoc(ref, {...data, result:data.result});



    let a = 0, b = 0, aa = 0, bb = 0;
    let hFirstName = row.hteam.split(" ")[0];
    let hLastName = row.hteam.split(" ")[1];
    let gFirstName = row.gteam.split(" ")[0];
    let gLastName = row.gteam.split(" ")[1];
    if(row.hset1>row.gset1) a++;
    if(row.hset1<row.gset1) b++;
    if(row.hset2>row.gset2) a++;
    if(row.hset2<row.gset2) b++;
    if(row.hset3>row.gset3) a++;
    if(row.hset3<row.gset3) b++;
    if(row.hscore<row.gscore) bb = 1;
    if(row.hscore>row.gscore) aa = 1;
    let hdata;
    let gdata;
    const teams = await getDocs(collection(db, "teams"));
    teams.docs.forEach(team => {
        let td = team.data();
        if(td.name === hteamName){
            hdata = td;
        }
        if(td.name === gteamName){
            gdata = td;
        }
    });
    console.log("hdata ===> ", hdata);
    console.log("gdata ===> ", gdata);
    hdata.members = hdata.members.map((member)=>{
        if(member.firstName === hFirstName && member.lastName === hLastName){
            return {...member, rank: member.rank - a};
        }
    })
    hdata = {...hdata, rank: hdata.rank - aa};
    gdata = {...gdata, rank: gdata.rank - bb};
    gdata.members = gdata.members.map((member)=>{
        if(member.firstName === gFirstName && member.lastName === gLastName){
            return {...member, rank: member.rank - b};
        }
    })
    const reff = doc(db, "teams", hdata.id);
    setDoc(reff, hdata);
    const refff = doc(db, "teams", gdata.id);
    setDoc(refff, gdata);
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