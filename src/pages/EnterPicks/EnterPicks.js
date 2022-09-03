import React, {useEffect, useState, useContext} from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { ButtonGroup, ButtonToolbar, Button, Form, Card, ListGroup, Pagination} from 'react-bootstrap';
import './EnterPicks.css';
import * as NFLIcons from '../../teamIcons'
import CurrentWeek from './../../utils/CurrentWeek';
import { AccountContext } from './../../components/UserPool/Account';

// API article https://medium.com/swlh/skip-lambda-save-data-to-dynamodb-directly-using-api-gateway-process-later-with-streams-dab2ceef9a9d
function EnterPicks() {
    const { authenticate, getSession, logout } = useContext(AccountContext);
    const [newSession, setNewSession] = useState(undefined);

    let navigate = useNavigate(); 

    // const [isTeamSelectedArr, setIsTeamSelectedArr] = useState(Array(18).fill(false));
    const [currentPickArr, setCurrentPickArr] = useState(Array(18).fill(""));
    const [activeButtonArr, setActiveButtonArr] = useState(Array(18).fill(Array(32).fill(null)));

    // API - current week of season
    const [activePage, setActivePage] = useState(CurrentWeek());
    const [currMatchups, setCurrMatchups] = useState([]);

    const [matchupsArr, setMatchupsArr] = useState([[]]);

    let userPickedTeamsObj = {
        "Rams": true, "Browns": true, "Broncos": true, "Cowboys": true, "Buccaneers": true, "Steelers": true, "Cardinals": true, "Chiefs": true, "Colts": true, "Bills": true, "Titans": false, "Texans": false, "Dolphins": true, "Chargers": true, "Niners": true, "Eagles": true, "Patriots": true, "Packers": null
     }

    const [userPicks, setUserPicks] = useState([{'Team':''}]);
    const [userStats, setUserStats] = useState({});

    const [userCurrTeam, setUserCurrTeam] = useState(Object.keys(matchupsArr[activePage-1])[0]);

    useEffect(() => {
        getSession(setNewSession)
          .then((session) => {
            console.log('Session Activated');
          })
          .catch((err) => {
            console.log('Session: ', err);
          });
        
      }, []);

    function establishPicks(picks) {
        console.log(picks);

        setUserPicks(picks);


        let updatedPicks = {...currentPickArr}
        let tempVal;
        picks.forEach((val,i) => {
            tempVal = Object.keys(val)[0];
            if(!tempVal.includes("Team")) updatedPicks[i] = tempVal;
            console.log(val);
        }) 

        console.log(updatedPicks);
        
        setCurrentPickArr(updatedPicks);
    }

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
        });
    }

    function getUserPicks() {
        // console.log('test');
        // console.log(newSession['idToken']['jwtToken']);
        axios.get('https://khvuxdskc6.execute-api.us-east-2.amazonaws.com/prod/userinfo', {
            headers: {
                Authorization: newSession['idToken']['jwtToken'],
                'Content-Type': 'application/json',
            },
            params: {'user': newSession['accessToken']['payload']['username']}
        }).then((response) => {
            console.log(response["data"]);
            setUserStats(response["data"]);
            establishPicks(response["data"]["user_picked_teams"]);
        }).catch((error) => {
            console.log(error); // NEED TO ADD ERROR HANDLING
        });
    }

    function submitUserPick(event) {
        event.preventDefault();
        console.log(currentPickArr[activePage-1].length);
        axios.put('https://khvuxdskc6.execute-api.us-east-2.amazonaws.com/prod/submit-pick', 
            {
                'username': newSession['accessToken']['payload']['username'],
                'weekNum': activePage,
                'pick': currentPickArr[activePage-1] || "Team" + activePage
            },
            {
                headers: {
                    Authorization: newSession['idToken']['jwtToken'],
                    'Content-Type': 'application/json'
                }
            }
        ).then((response) => {
            console.log(response["data"]);
            window.location.reload();
        }).catch((error) => {
            console.log(error); // NEED TO ADD ERROR HANDLING
        });

    }


      useEffect(() => {
        console.log(newSession)
        if(newSession != undefined) {
            getAllMatchups();
            getUserPicks();
        }
      }, [newSession]);



    // useEffect(() => {
    //     console.log("Current team: " + Object.keys(userPickedTeamsObj)[activePage-1]);
    //     console.log("Type: " + typeof(Object.keys(userPickedTeamsObj)));
    //     console.log("Keys: "+  Object.keys(userPickedTeamsObj));
    //     console.log(Object.values(userPickedTeamsObj)[11])
    // },[activePage])

    // setActivePage(active);
        // setCurrMatchups (beforeRenderCurrMatchups);
        // setUserCurrTeam(Object.keys(userPickedTeamsObj)[active]);


    
    console.log(activePage);
    let items = [];

    for(let i = 1; i < 19; ++i) {

        items.push(
            <Pagination.Item key={i} active={i === activePage} onClick={(event)=>{
                console.log(i);
                setActivePage(i);
                console.log("setting");
                console.log(Object.keys(userPicks[i-1]).includes("Team"));
                // let newActiveArr = {...activeButtonArr};
                // newActiveArr.map((val, i) => {

                // })
                // if(!Object.keys(userPicks[i-1]).includes("Team")) {
                //     console.log(i-1);
                //     console.log(Object.keys(userPicks[i-1]))
                //     newActiveArr[i-1] = true;
                // } 
                // setActiveButtonArr(newActiveArr);
            }}>
                {i}
            </Pagination.Item>
        );
    }

    const teamIcons = {"Cardinals": NFLIcons.Cardinals,"Falcons": NFLIcons.Falcons,"Ravens": NFLIcons.Ravens,"Bills": NFLIcons.Bills,"Panthers":NFLIcons.Panthers,
                   "Bears": NFLIcons.Bears,"Bengals": NFLIcons.Bengals,"Browns": NFLIcons.Browns,"Cowboys": NFLIcons.Cowboys,"Broncos": NFLIcons.Broncos,
                    "Lions": NFLIcons.Lions,"Packers": NFLIcons.Packers,"Texans": NFLIcons.Texans,"Colts": NFLIcons.Colts,"Jaguars": NFLIcons.Jaguars,
                    "Chiefs": NFLIcons.Chiefs,"Chargers": NFLIcons.Chargers,"Rams": NFLIcons.Rams,"Raiders": NFLIcons.Raiders,"Dolphins": NFLIcons.Dolphins,
                    "Vikings": NFLIcons.Vikings,"Patriots": NFLIcons.Patriots,"Saints": NFLIcons.Saints,"Giants": NFLIcons.Giants,"Jets": NFLIcons.Jets,
                    "Eagles": NFLIcons.Eagles,"Steelers": NFLIcons.Steelers,"Seahawks": NFLIcons.Seahawks,"Niners": NFLIcons.Niners,"Buccaneers": NFLIcons.Buccaneers,
                    "Titans": NFLIcons.Titans,"Commanders": NFLIcons.Commanders
    };

    function getCurrIcon(team) {
        var NFLTeam = teamIcons[team];
        return (
            <NFLTeam/>
        )
    }

    function handleTeamChosen(event, i) {
        let buttonText = event.target.innerText;
        // let newTeamSelectedArr = {...isTeamSelectedArr}
        console.log(buttonText);
        if(buttonText === undefined) {
            const iconText = (event.target.nearestViewportElement) ? event.target.nearestViewportElement.id : event.target.id;
            console.log(iconText);
            if(iconText === undefined) {
                // newTeamSelectedArr[activePage-1] = false;
                // setIsTeamSelectedArr(newTeamSelectedArr);
                console.log("UNDEFINED");
                return;
            }
            buttonText = iconText;
        }

        const currName = buttonText;
        console.log(currName.trim());
        console.log(currentPickArr[activePage-1])
        const unclickTeam = currName.trim() == currentPickArr[activePage-1].trim();

        let newActiveArr = {...activeButtonArr}
        let newActiveSubArr = new Array(32).fill(false);
        newActiveSubArr[i] = unclickTeam ? false : true;
        newActiveArr[activePage-1] = newActiveSubArr;
        setActiveButtonArr(newActiveArr);

        // newTeamSelectedArr[activePage-1] = unclickTeam ? false : true;
        // setIsTeamSelectedArr(newTeamSelectedArr);

        let newPickArr = {...currentPickArr};
        if(unclickTeam) newPickArr[activePage-1] = ""
        else newPickArr[activePage-1] = currName;
        setCurrentPickArr(newPickArr);
    }

    // API - current week (must write lambda function that writes user curr team into back of userPreviousTeams)
    // userCurrTeam == selected team on the page? 
    // if userCurrTeam == "", then userCurrTeam = userPickedTeamsArr(lastElement)

    let arrButtons = [];
    // arrButtons.push(
    //     <>
    //         <Button className='btn bg-transparent btn-outline-primary transparent-btn'> Away </Button>
    //         <p className='breaker-horizontal'/>
    //         <Button className='btn bg-transparent btn-outline-primary transparent-btn'> Home </Button>
    //         <p className='breaker'/>            
    //     </>
    // );    

    // TO-DO check if deadline past. Make objects non-selectable/submittable
    let firstTeam = "";
    let secondTeam = "";
    let isFirstTeamPicked;
    let isSecondTeamPicked;
    let buttonColor;
    let currKey;
    let currVal;
    for (let i = 0; i < matchupsArr[activePage-1].length * 2; i+=2) { 
        firstTeam = matchupsArr[activePage-1][i/2].split(' ')[0];
        secondTeam = matchupsArr[activePage-1][i/2].split(' ')[2];

        var NFLTeamOne = teamIcons[firstTeam];
        var NFLTeamTwo = teamIcons[secondTeam];

        currKey = Object.keys(userPicks[activePage-1])[0];
        currVal = Object.values(userPicks[activePage-1])[0];

        buttonColor = (typeof(currVal) == "string") ? "outline-primary" : (currVal ? "outline-success" : "outline-danger");

        isFirstTeamPicked = userPicks.filter(function (key) {
                                return key.hasOwnProperty(firstTeam);
                            }).length > 0;

        isSecondTeamPicked = userPicks.filter(function (key) {
                                return key.hasOwnProperty(secondTeam);
                            }).length > 0;
        
        arrButtons.push(
            <p className='breaker'/>
        );

        if(activePage < CurrentWeek() && currKey != firstTeam) {
            arrButtons.push(<Button variant="outline-secondary" className="pick-select-button-left" disabled> <NFLTeamOne/>{firstTeam}</Button>)
        } else if(activePage < CurrentWeek() && currKey == firstTeam) {
            arrButtons.push(<Button variant={buttonColor} className="pick-select-button-right" active> <NFLTeamOne/> {firstTeam}</Button>)
        } else if(isFirstTeamPicked && currKey != firstTeam) {
            arrButtons.push(<Button variant="outline-secondary" className="pick-select-button-left" disabled> <NFLTeamOne/>{firstTeam}</Button>)
        } else if (firstTeam !== currKey) {
            console.log("231")
            arrButtons.push(<Button variant="outline-primary" className="pick-select-button-left" active={(activeButtonArr[activePage-1][i] == null) ? false : activeButtonArr[activePage-1][i]} onClick={(event)=>handleTeamChosen(event,i)}> <NFLTeamOne/> {firstTeam} </Button>)
        } else {
            console.log("234");
            arrButtons.push(<Button variant="outline-primary" className="pick-select-button-left" active={(activeButtonArr[activePage-1][i] == null) ? true : activeButtonArr[activePage-1][i]} onClick={(event)=>handleTeamChosen(event,i)}> <NFLTeamOne/> {firstTeam} </Button>)
        }

        arrButtons.push(
            <p className='at-gap-section'> at </p>
        );

        if(activePage < CurrentWeek() && currKey != secondTeam) {
            arrButtons.push(<Button variant="outline-secondary" className="pick-select-button-right" disabled> <NFLTeamTwo/> {secondTeam}</Button>)
        } else if(activePage < CurrentWeek() && currKey == secondTeam) {
            arrButtons.push(<Button variant={buttonColor} className="pick-select-button-right" active> <NFLTeamTwo/> {secondTeam}</Button>)
        } else if(isSecondTeamPicked && currKey != secondTeam) {
            arrButtons.push(<Button variant="outline-secondary" className="pick-select-button-right" disabled> <NFLTeamTwo/> {secondTeam}</Button>)
        } else if (secondTeam !== currKey) {
            arrButtons.push(<Button variant="outline-primary" className="pick-select-button-right" active={(activeButtonArr[activePage-1][i+1] == null) ? false : activeButtonArr[activePage-1][i+1]} onClick={(event)=>handleTeamChosen(event,i+1)}> <NFLTeamTwo/> {secondTeam} </Button>)
        } else {
            arrButtons.push(<Button variant="outline-primary" className="pick-select-button-right" active={(activeButtonArr[activePage-1][i+1] == null) ? true : activeButtonArr[activePage-1][i+1]} onClick={(event)=>handleTeamChosen(event,i+1)}> <NFLTeamTwo/> {secondTeam} </Button>)
        }

    }

    function goToLogin() {
        navigate('/login')
    }

    if(!newSession) {
        return (
            <>
                <div className='login-button-section'>
                    <Button onClick={goToLogin}> Sign in </Button>
                </div>
            </>
        )
    }

    return (
        <>
            <div className='main-section'>
                <div className='team-section'>
                    <Form onSubmit={submitUserPick}>
                        <ButtonToolbar aria-label="Toolbar with button groups">
                            <ButtonGroup className="me-2 team-group" aria-label="First group">
                                {arrButtons}
                                <p className='breaker'/>
                                {/* <Button type="submit" disabled={!isTeamSelectedArr[activePage-1]}> Submit </Button> */}
                                <Button type="submit"> Submit </Button>
                            </ButtonGroup>
                        </ButtonToolbar>
                    </Form>
                    <Pagination className='pagination'>{items}</Pagination>
                </div>
                <div className='past-picks-section'>
                    <Card className='past-picks-card'>
                        <Card.Header className='past-picks-header-1'>Pick History </Card.Header>
                        <Card.Header>Start Streak: {userStats['start_streak']}</Card.Header>
                        <Card.Header>Total Correct: {userStats['total_correct']}</Card.Header>
                        <ListGroup variant="flush">
                            {

                                userPicks.map((team, i) => {
                                    let currTeam =  Object.keys(team)[0];
                                    let result = Object.values(team)[0];
                                    if(currTeam.includes("Team")) {
                                        return <ListGroup.Item className="modal-bg" style={{color: "blue"}}>Week {i+1}: </ListGroup.Item>;
                                    } else if(result == "") {
                                        return <ListGroup.Item className="modal-bg" style={{color: "blue"}}>Week {i+1}: {currTeam} {React.createElement(teamIcons[currTeam], {})} </ListGroup.Item>;
                                    } else if(result) {
                                        return <ListGroup.Item className="modal-bg" style={{color: "green"}}>Week {i+1}: {currTeam} {React.createElement(teamIcons[currTeam], {})} </ListGroup.Item>;
                                    } else {
                                        return <ListGroup.Item className="modal-bg" style={{color: "red"}}>Week {i+1}: {currTeam} {React.createElement(teamIcons[currTeam], {})} </ListGroup.Item>;
                                    }
                                })
                            }
                        </ListGroup>
                    </Card>
                </div>
            </div>
        </>
    )
}

export default EnterPicks;