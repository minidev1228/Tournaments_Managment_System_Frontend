import React, {useState, useEffect} from "react";

import { getAllEvents, getResults } from "../../apis/eventAPI";

import dartsMark from "../../resources/img3.jfif"
import playerIcon from "../../resources/player.png"
import teamIcon from "../../resources/team-p.png"
import eventIcon from "../../resources/event.png"

import Button1 from "../../components/button1";
import PlayerCard from "../../components/playerCard"
import TeamCard from "../../components/teamCard"
import EventItem from "../../components/eventItem";

import {getAllDatas} from "../../apis/teamApi"

import "./index.css"
import { useNavigate } from "react-router-dom";

const ViewPage = () =>{

    const navigate = useNavigate();

    const [selectedButton, setSelectedButton] = useState("");
    const [selectedId, setSelectedId] = useState("");
    const [region, setRegion] = useState("");
    const [league, setLeague] = useState("");
    const [teamName, setTeamName] = useState("");
    const [teams, setTeams] = useState([{}]);
    const [filteredTeam, setFilteredTeam] = useState([{}]);
    const [filteredTeams, setFilteredTeams] = useState([{}])
    const [teamRegion, setTeamRegion] = useState("");
    const [teamLeague, setTeamLeague] = useState("");
    const [events, setEvents] = useState([{}])
    const [results, setResults] = useState([{}]);

    useEffect(()=>{
        const run = async() =>{
            let ts = await getAllDatas();
            console.log(ts);
            setTeams(ts);
            let events = await getAllEvents();
            setEvents(events)
            
        }

        run();
    }, [])

    useEffect(()=>{
        // if(teams === undefined || teams.length === 0) return;
        let arr = [];
        teams?.forEach((team, id)=>{
            if(teamName.length === 0 || team.name === teamName){
                if(league.length === 0 || league === team.league){
                    console.log("ok");
                    let members = team.members;
                    members?.forEach((member, idd)=>{
                        // console.log("====>",region, member?.region);
                        if(member?.street?.includes(region) || region.length === 0){
                            arr.push(member);
                        }
                    })
                }
            }
        })
        console.log(arr);
        setFilteredTeam(arr);
    }, [league, teamName, region, teams])

    useEffect(()=>{
        // if(teams === undefined || teams.length === 0) return;
        let arr = [];
        teams?.forEach((team, id)=>{
            if(teamName.length === 0 || team.name === teamName){
                if(teamLeague.length === 0 || teamLeague === team.league){
                    if(teamRegion.length === 0 || team.region.includes( teamRegion))
                        arr.push(team);
                }
            }
        })
        console.log(arr);
        setFilteredTeams(arr);
    }, [teamLeague, teamName, teamRegion, teams])

    useEffect(()=>{
        const run = async() =>{
            let res = await getResults(selectedId);
            setResults(res);
        }

        run();
    }, [selectedId])

    const clickItem = (id, num) =>{
        setSelectedId(id);
    }

    const logOut = () =>{
        localStorage.setItem("IsLogIn", "no");
        navigate("/");
    }

    return (
        <div className="view-page-css">
            <div className="view-page-left">
                <img src={dartsMark} alt="" />
                <div className="play-button" style={{marginTop:"", backgroundColor:selectedButton==="players"?"#56a7e0":""}} onClick={()=>{setSelectedButton("players")}}>
                    <img src={playerIcon} alt="" />
                    <h2>Players</h2>
                </div>
                <div className="play-button" style={{backgroundColor:selectedButton==="teams"?"#56a7e0":""}} onClick={()=>{setSelectedButton("teams")}}>
                    <img src={teamIcon} alt="" />
                    <h2>Teams</h2>
                </div>
                <div className="play-button" style={{marginBottom:"100px", backgroundColor:selectedButton==="events"?"#56a7e0":""}} onClick={()=>{setSelectedButton("events")}}>
                    <img src={eventIcon} alt="" />
                    <h2>Events</h2>
                </div>
                <Button1 width={"100%"} text={"Log Out"} handleClickEvent={logOut} />
            </div>
            <div className="view-page-center">
                {
                    selectedButton === "players" ? <div>
                    <div>
                        <label htmlFor="region">Region: </label>
                        <input type="text" value={region} onChange={(e)=>{setRegion(e.target.value)}} style={{marginRight:"30px"}}/>
                        <label htmlFor="region">League: </label>
                        <select name="" id="" value={league} onChange={(e)=>{setLeague(e.target.value)}} style={{marginRight:"30px"}}>
                            <option value=""></option>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                        </select>
                        <label htmlFor="team">Team: </label>
                        <select name="team" id="team" value={teamName} onChange={(e)=>{setTeamName(e.target.value)}}>
                            <option value=""></option>
                            {
                                teams.map((team, id) => <option value= {team.name}>{team.name}</option>)
                            }
                        </select>
                    </div>
                    <div className="card-group">
                        {
                            filteredTeam.map(member => <PlayerCard number={member.number} phone={member.phone} street={member.street} rank={member.rank} email={member.email} name={`${member.firstName} ${member.lastName}`} />)
                        }
                    </div>
                </div> : selectedButton === "teams" ? <div>
                    <div>
                        <label htmlFor="region">Region: </label>
                        <input type="text" value={teamRegion} onChange={(e)=>{setTeamRegion(e.target.value)}} style={{marginRight:"30px"}}/>
                        <label htmlFor="region">League: </label>
                        <select name="" id="" value={teamLeague} onChange={(e)=>{setTeamLeague(e.target.value)}} style={{marginRight:"30px"}}>
                            <option value=""></option>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                        </select>
                        <label htmlFor="team">Team: </label>
                        <select name="team" id="team" value={teamName} onChange={(e)=>{setTeamName(e.target.value)}}>
                            <option value=""></option>
                            {
                                teams.map((team, id) => <option value= {team.name}>{team.name}</option>)
                            }
                        </select>
                    </div>
                    <div className="card-group">
                        {
                            filteredTeams.map(team=><TeamCard name={team.name} link={team.link} rank={team.rank} league={team.league} street={team.region} />)
                        }
                    </div>
                </div> : <div style={{display:"flex"}}>
                    <div className="event-page-left">
                        {
                            events?.map((event, id) =><EventItem handleClickEvent={()=>{clickItem(event.id, id)}} date={event.date} hteam={event.hemiteam} gteam={event.gastteam} status={selectedId===event.id} />)
                        }
                    </div>
                    <div className="event-page-right-bottom" style={{padding:"0px", marginLeft:"50px"}}>
                        <table id="customers">
                            <tr>
                                <th>Round</th>
                                <th>HemiTeam</th>
                                <th>GastTeam</th>
                                <th>Set1</th>
                                <th>Set2</th>
                                <th>Set3</th>
                                <th>Spi</th>
                            </tr>
                            {
                                results?.map((result, id)=><tr>
                                    <td>{result.round}</td>
                                    <td>{result.hteam}</td>
                                    <td>{result.gteam}</td>
                                    <td>{result.hset1} : {result.gset1}</td>
                                    <td>{result.hset2} : {result.gset2}</td>
                                    <td>{result.hset3} : {result.gset3}</td>
                                    <td>{result.hscore} : {result.gscore}</td>
                                </tr>)
                            }
                        </table>
                    </div>
                </div>
                }
            </div>
        </div>
    )
}

export default ViewPage;