import React, { useEffect, useState } from "react";

import {getAllMembers, getAllEnemies} from "../../apis/teamApi"
import {getAllEvents, addRow, deleteRow, getResults} from "../../apis/eventAPI"

import Layout from "../../layouts";
import EventItem from "../../components/eventItem";
import Button3 from "../../components/button3"

import "./index.css"

const EventPage = () =>{

    const [selectedId, setSelectedId] = useState(-1);
    const [members, setMembers] = useState([]);
    const [enemy, setEnemy] = useState([])
    const [results, setResults] = useState([]);
    const [events, setEvents] = useState([])
    const [gteamId, setGteamId] = useState(-1);

    const [row, setRow] = useState({round:"1"})

    useEffect(()=>{
        const run = async() =>{
            let dmembers = await getAllMembers();
            let events = await getAllEvents();
            setMembers(["",...dmembers]);
            setEvents(events)
        }

        run();
    }, [])

    useEffect(()=>{
        if(gteamId === -1) return;
        const run = async() =>{
            let enemies = await getAllEnemies(events[gteamId].gastteam);
            setEnemy(["", ...enemies]);
        }

        run();
    }, [gteamId])

    useEffect(()=>{
        const run = async() =>{
            let res = await getResults(selectedId);
            setResults(res);
        }

        run();
    }, [selectedId])

    const clickItem = (id, num) =>{
        console.log(id);
        setSelectedId(id);
        setGteamId(num);
    }

    const add = () =>{
        setResults([...results, row]);
        addRow(selectedId, row);
    }

    const remove = (id) =>{
        deleteRow(selectedId, id);
        setResults(results.filter((res, rowId)=>rowId!==id));
    }

    return (
        <Layout>
            <div className="event-page">
                <div className="event-page-left">
                    {
                        events?.map((event, id) => <EventItem handleClickEvent={()=>{clickItem(event.id, id)}} date={event.date} hteam={event.hemiteam} gteam={event.gastteam} status={selectedId===event.id} />)
                    }
                </div>  
                <div className="event-page-right">
                    <div className="event-page-right-top">
                        <label htmlFor="round">Round : </label>
                        <select name="round" id="round" value={row.round} onChange={e=>{setRow({...row, round: e.target.value})}}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select>
                        <label htmlFor="who">H : </label>
                        <select name="who" id="who" value={row.hteam} onChange={e=>{setRow({...row, hteam: e.target.value})}}>
                            {
                                members?.map(member=>{
                                    let name = `${member.firstName} ${member.lastName}`;
                                    if(member.firstName === undefined) name = "";
                                    return <option key={name} value={name}>{name}</option>
                                })
                            }
                        </select>
                        <label htmlFor="whom">G : </label>
                        <select name="whom" id="whom" value={row.gteam} onChange={e=>{setRow({...row, gteam: e.target.value})}}>
                            {
                                enemy?.map(member=>{
                                    let name = `${member.firstName} ${member.lastName}`;
                                    if(member.firstName === undefined) name = "";
                                    return <option key={name} value={name}>{name}</option>
                                })
                            }
                        </select>
                        <label htmlFor="hscore">H_Score</label>
                        <input type="number" id="hscore" value={row.hscore} onChange={e=>{setRow({...row, hscore: e.target.value})}}/>
                        <label htmlFor="gscore">G_Score</label>
                        <input type="number" id="gscore" value={row.gscore} onChange={e=>{setRow({...row, gscore: e.target.value})}} />
                        <Button3 text={"Add +"} handleClickEvent={()=>{add()}} />
                    </div>
                    <div className="event-page-right-bottom">
                        <table id="customers">
                            <tr>
                                <th>Round</th>
                                <th>HemiTeam</th>
                                <th>GastTeam</th>
                                <th>H_Score</th>
                                <th>G_Score</th>
                                <th>Action</th>
                            </tr>
                            {
                                results?.map((result, id)=><tr>
                                    <td>{result.round}</td>
                                    <td>{result.hteam}</td>
                                    <td>{result.gteam}</td>
                                    <td>{result.hscore}</td>
                                    <td>{result.gscore}</td>
                                    <td><Button3 text={"Delete"} handleClickEvent={()=>{remove(id)}} /></td>
                                </tr>)
                            }
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default EventPage