import React, {useEffect, useState, useContext} from 'react';
import axios from 'axios';
import { ButtonGroup, ButtonToolbar, Button, Form, Card, ListGroup, Pagination} from 'react-bootstrap';
import './Admin.css';
import * as NFLIcons from '../../teamIcons'
import CurrentWeek from './../../utils/CurrentWeek';
import { AccountContext } from './../../components/UserPool/Account';

// API article https://medium.com/swlh/skip-lambda-save-data-to-dynamodb-directly-using-api-gateway-process-later-with-streams-dab2ceef9a9d
function Admin() {
    const { authenticate, getSession, logout } = useContext(AccountContext);
    const [newSession, setNewSession] = useState(undefined);

    const [isTeamSelected, setIsTeamSelected] = useState(false);
    const [currentPick, setCurrentPick] = useState("");
    const [activeButtonArr, setActiveButtonArr] = useState(Array(32).fill(null));

    // API - current week of season
    const [activePage, setActivePage] = useState(CurrentWeek());
    const [currMatchups, setCurrMatchups] = useState([]);

    let userPickedTeamsObj = {
        "Rams": true, "Browns": true, "Broncos": true, "Cowboys": true, "Buccaneers": true, "Steelers": true, "Cardinals": true, "Chiefs": true, "Colts": true, "Bills": true, "Titans": false, "Texans": false, "Dolphins": true, "Chargers": true, "Niners": true, "Eagles": true, "Patriots": true, "Packers": null
     }

    const [matchupsArr, setMatchupsArr] = useState([[]]);
    const [userCurrTeam, setUserCurrTeam] = useState(Object.keys(userPickedTeamsObj)[activePage-1]);

    useEffect(() => {
        getSession(setNewSession)
          .then((session) => {
            console.log('Session Activated');
          })
          .catch((err) => {
            console.log('Session: ', err);
          });
        
      }, []);

    useEffect(() => {
        console.log("Current team: " + Object.keys(userPickedTeamsObj)[activePage-1]);
        console.log("Type: " + typeof(Object.keys(userPickedTeamsObj)));
        console.log("Keys: "+  Object.keys(userPickedTeamsObj));
        console.log(Object.values(userPickedTeamsObj)[11])
    },[activePage])

    function getAllMatchups() {
        // console.log('test');
        // console.log(newSession['idToken']['jwtToken']);
        axios.get('https://khvuxdskc6.execute-api.us-east-2.amazonaws.com/prod/get-all-matchups', {
            headers: {
                Authorization: newSession['idToken']['jwtToken'],
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            console.log(response["data"]);
            setMatchupsArr(response["data"])
        }).catch((error) => {
            console.log(error); // NEED TO ADD ERROR HANDLING
        })
    }

    useEffect(() => {
        console.log(newSession)
        if(newSession !== undefined) getAllMatchups();
      }, [newSession]);

    // setActivePage(active);
        // setCurrMatchups (beforeRenderCurrMatchups);
        // setUserCurrTeam(Object.keys(userPickedTeamsObj)[active]);

    console.log(activePage);
    let items = []
    for(let i = 1; i < 19; ++i) {
        items.push(
            <Pagination.Item key={i} active={i === activePage} onClick={(event)=>{
                setActivePage(i);
                console.log("setting");
            }}>
                {i}
            </Pagination.Item>
        );
    }


    console.log(items);

    const teamIcons = {"Cardinals": NFLIcons.Cardinals,"Falcons": NFLIcons.Falcons,"Ravens": NFLIcons.Ravens,"Bills": NFLIcons.Bills,"Panthers":NFLIcons.Panthers,
                   "Bears": NFLIcons.Bears,"Bengals": NFLIcons.Bengals,"Browns": NFLIcons.Browns,"Cowboys": NFLIcons.Cowboys,"Broncos": NFLIcons.Broncos,
                    "Lions": NFLIcons.Lions,"Packers": NFLIcons.Packers,"Texans": NFLIcons.Texans,"Colts": NFLIcons.Colts,"Jaguars": NFLIcons.Jaguars,
                    "Chiefs": NFLIcons.Chiefs,"Chargers": NFLIcons.Chargers,"Rams": NFLIcons.Rams,"Raiders": NFLIcons.Raiders,"Dolphins": NFLIcons.Dolphins,
                    "Vikings": NFLIcons.Vikings,"Patriots": NFLIcons.Patriots,"Saints": NFLIcons.Saints,"Giants": NFLIcons.Giants,"Jets": NFLIcons.Jets,
                    "Eagles": NFLIcons.Eagles,"Steelers": NFLIcons.Steelers,"Seahawks": NFLIcons.Seahawks,"Niners": NFLIcons.Niners,"Buccaneers": NFLIcons.Buccaneers,
                    "Titans": NFLIcons.Titans,"Commanders": NFLIcons.Commanders
    };

    const numTotal = Object.keys(userPickedTeamsObj).length;
    var numCorrect = 0;
    var startStreak = 0;
    var streak = true;
    Object.keys(userPickedTeamsObj).map((team, i) => (
        (userPickedTeamsObj[team]) ? (numCorrect++, streak ? startStreak++ : null) : streak = false
    ));


    function getCurrIcon(team) {
        var NFLTeam = teamIcons[team];
        return (
            <NFLTeam/>
        )
    }

    function handleTeamChosen(event, i, isFirst) {
        console.log(event);

        let buttonText = event.target.innerText;
        if(buttonText === undefined) {
            const iconText = (event.target.nearestViewportElement) ? event.target.nearestViewportElement.id : event.target.id;
            if(iconText === undefined) {
                setIsTeamSelected(false);
                console.log("UNDEFINED");
                return;
            }
            buttonText = iconText;
        }

        let newActiveArr = [...activeButtonArr];

        if(!newActiveArr[i]) {
            newActiveArr[i] = true;
            if(isFirst) newActiveArr[i+1] = false;
            else newActiveArr[i-1] = false;
        }
        else {
            newActiveArr[i] = null;
            if(isFirst) newActiveArr[i+1] = null;
            else newActiveArr[i-1] = null;
        }
        
        
        setActiveButtonArr(newActiveArr);
        console.log(newActiveArr);

        setIsTeamSelected(true);
        // setCurrentPick(currName);
    }

    // API - current week (must write lambda function that writes user curr team into back of userPreviousTeams)
    // userCurrTeam == selected team on the page? 
    // if userCurrTeam == "", then userCurrTeam = userPickedTeamsArr(lastElement)

    console.log(currMatchups);
    let arrButtons = [];

    console.log(matchupsArr[activePage-1].length);
    

    // TO-DO check if deadline past. Make objects non-selectable/submittable
    let firstTeam = "";
    let secondTeam = "";
    for (let i = 0; i < matchupsArr[activePage-1].length * 2; i+=2) { 
        firstTeam = matchupsArr[activePage-1][i/2].split(' ')[0];
        secondTeam = matchupsArr[activePage-1][i/2].split(' ')[2];
        var NFLTeamOne = teamIcons[firstTeam];
        var NFLTeamTwo = teamIcons[secondTeam];
        arrButtons.push(
            <>
                <p className='breaker'/>
                <Button variant="outline-primary" className="pick-select-button" active={(activeButtonArr[i] == null) ? false : activeButtonArr[i]} onClick={(event)=>handleTeamChosen(event,i, true)}> <NFLTeamOne/> {firstTeam} </Button>
                <Button variant="outline-primary" className="pick-select-button-second" active={(activeButtonArr[i+1] == null) ? false : activeButtonArr[i+1]} onClick={(event)=>handleTeamChosen(event,i+1, false)}> <NFLTeamTwo/> {secondTeam} </Button>     
            </>
        )
    }

    
    function handleAdminSubmit(event) {
        event.preventDefault();
        console.log(activePage);
        let weekResults = {};
        let firstTeam, secondTeam;

        console.log(matchupsArr[activePage-1].length * 2);

        for (let i = 0; i < matchupsArr[activePage-1].length * 2; i+=2) { 
            firstTeam = matchupsArr[activePage-1][i/2].split(' ')[0];
            secondTeam = matchupsArr[activePage-1][i/2].split(' ')[2];
            console.log(firstTeam);
            weekResults[firstTeam] = activeButtonArr[i];
            weekResults[secondTeam] = activeButtonArr[i+1];
        }

        console.log("WEEK RESULTS");
        console.log(weekResults);
        // API - PUT - write to DynamoDB table entry - userCurrTeam
        // Refresh page, make sure week by week individual summary is updated and current team's button is active
    }

     

    return (
        <>
            <div className='main-section-admin'>
                <div className='team-section-admin'>
                    <Form onSubmit={handleAdminSubmit}>
                        <ButtonToolbar aria-label="Toolbar with button groups">
                            <ButtonGroup className="me-2 team-group" aria-label="First group">
                                {/* <div className='individual-matchup-section'> */}
                                    {arrButtons}
                                {/* </div> */}
                                <p className='breaker'/>
                                <Button className="admin-submit" type="submit" disabled={!isTeamSelected}> Submit </Button>
                            </ButtonGroup>
                        </ButtonToolbar>
                    </Form>
                    <Pagination className='pagination'>{items}</Pagination>
                </div>
            </div>
        </>
    )
}

export default Admin;