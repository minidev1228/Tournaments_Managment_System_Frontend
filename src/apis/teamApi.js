import React from "react";
import { collection, addDoc, getDocs, doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
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

export const getTeamIdByName = async(name) =>{
    let data = await getDocs(collection(db, 'teams'));
    let id = "";
    data.docs.forEach((doc, key) => {
        let t = doc.data();
        if(t.name === name){
            id = t.id;
        }
    });
    console.log(id);
    return id;
}

export const updateTeamProfile = async(info) =>{
    const teams = await getDocs(collection(db, "teams"));
    let data = {};
    teams.docs.forEach(team => {
        if(team.id === localStorage.getItem("id")){
            data = team.data();
        }
    });
    const ref = doc(db, "teams", localStorage.getItem("id"));
    setDoc(ref, {...data, ...info});
}

export const getTeamData = async() =>{
    const teams = await getDocs(collection(db, "teams"));
    let data = {};
    teams.docs.forEach(team => {
        if(team.id === localStorage.getItem("id")){
            data = team.data();
        }
    });

    return data;
}

const generateId = () =>{
    let id = "";
    for(let i = 0; i<10;i++){
        let d = Math.floor(Math.random() * 10);;
        id = `${id}${d}`;
    }
    return id;
}

export const addNewTeam = async (name, password) =>{

    let newId = generateId();
    const ref = doc(db, "teams", newId);
    setDoc(ref, {name, password, id: newId, members:[]});

    return true;
}

export const addMember = async(member) =>{
    const teams = await getDocs(collection(db, "teams"));
    let data = {};
    teams.docs.forEach(team => {
        if(team.id === localStorage.getItem("id")){
            data = team.data();
        }
    });
    const ref = doc(db, "teams", localStorage.getItem("id"));
    setDoc(ref, {...data, members:[...data.members, member]});
}

export const updateMember = async(id, member) =>{
    const teams = await getDocs(collection(db, "teams"));
    let data = {};
    teams.docs.forEach(team => {
        if(team.id === localStorage.getItem("id")){
            data = team.data();
        }
    });
    let currentMembers = data.members;
    currentMembers = currentMembers.map((memb, key)=>id===key?member:memb);
    const ref = doc(db, "teams", localStorage.getItem("id"));
    setDoc(ref, {...data, members:currentMembers});
}

export const removeMember = async(id) =>{
    const teams = await getDocs(collection(db, "teams"));
    let data = {};
    teams.docs.forEach(team => {
        if(team.id === localStorage.getItem("id")){
            data = team.data();
        }
    });
    let currentMembers = data.members;
    currentMembers = currentMembers.filter((memb, key)=>id!==key);
    const ref = doc(db, "teams", localStorage.getItem("id"));
    setDoc(ref, {...data, members:currentMembers});
}

export const getAllMembers = async() =>{
    const teams = await getDocs(collection(db, "teams"));
    let data = {};
    teams.docs.forEach(team => {
        if(team.id === localStorage.getItem("id")){
            data = team.data();
        }
    });
    return data.members;
}