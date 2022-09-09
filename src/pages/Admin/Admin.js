import React, {useEffect, useState, useContext} from 'react';
import axios from 'axios';
import { ButtonGroup, ButtonToolbar, Button, Form, Pagination} from 'react-bootstrap';
import './Admin.css';
import teamIcons from './../../utils/teamIcons';
import CurrentWeekNum from './../../utils/CurrentWeekNum';
import { AccountContext } from './../../components/UserPool/Account';

// API article https://medium.com/swlh/skip-lambda-save-data-to-dynamodb-directly-using-api-gateway-process-later-with-streams-dab2ceef9a9d
function Admin() {
    const { getSession } = useContext(AccountContext);
    const [newSession, setNewSession] = useState(undefined);

    const [adminActiveButtonArr, setAdminActiveButtonArr] = useState(Array(18).fill(Array(32).fill(null)));

    // API - current week of season
    const [activePage, setActivePage] = useState(CurrentWeekNum());
    const [currMatchups, setCurrMatchups] = useState([]);

    const [matchupsArr, setMatchupsArr] = useState([[]]);
    const [resultsArr, setResultsArr] = useState([[]]);

    useEffect(() => {
        getSession(setNewSession)
          .then((session) => {
            console.log('Session Activated');
          })
          .catch((err) => {
            console.log('Session: ', err);
          });
        
      }, []);

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
            setMatchupsArr(response["data"]["matchups"])
        }).catch((error) => {
            console.log(error); 
            alert("Unable to get matchups. Try refreshing page and trying again.");
        })
    }

    function getCurrentResults() {
        // console.log('test');
        // console.log(newSession['idToken']['jwtToken']);
        axios.get('https://khvuxdskc6.execute-api.us-east-2.amazonaws.com/prod/admin-get-results', {
            headers: {
                Authorization: newSession['idToken']['jwtToken'],
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            console.log(response["data"]);
            setResultsArr(response["data"])
        }).catch((error) => {
            console.log(error); 
            alert("Unable to get results. Try refreshing page and trying again.");
        })
    }

    function submitResults(event, results) {
        console.log(results);
        event.preventDefault();
        axios.put('https://khvuxdskc6.execute-api.us-east-2.amazonaws.com/prod/admin-submit-results', 
            {
                'weekNum': activePage,
                'results': results
            },
            {
                headers: {
                    Authorization: newSession['idToken']['jwtToken'],
                    'Content-Type': 'application/json'
                }
            }
        ).then((response) => {
            // window.location.reload();
        }).catch((error) => {
            console.log(error); 
            alert("Unable to submit results.");
        });
    }

    useEffect(() => {
        console.log(newSession)
        if(newSession !== undefined) {
            getAllMatchups();
            getCurrentResults();
        }
      }, [newSession]);


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
                console.log("UNDEFINED");
                return;
            }
            buttonText = iconText;
        }

        const currName = buttonText;
        let trimmedName = currName.trim();
        const unclickTeam = (typeof(resultsArr[activePage-1][trimmedName]) !== "string" && resultsArr[activePage-1][trimmedName]) ? true : false;

        let newActiveArr = {...adminActiveButtonArr}
        console.log(adminActiveButtonArr);
        let newActiveSubArr = newActiveArr[activePage-1];

        if(!newActiveArr[activePage-1][i]) {
            newActiveSubArr[i] = true;
            if(isFirst) newActiveSubArr[i+1] = false;
            else newActiveSubArr[i-1] = false;
        }
        else {
            console.log("Here");
            newActiveSubArr[i] = null;
            if(isFirst) newActiveSubArr[i+1] = null;
            else newActiveSubArr[i-1] = null;
        }
        // newActiveSubArr[i] = unclickTeam ? false : true;
        newActiveArr[activePage-1] = newActiveSubArr;
        console.log(newActiveArr);
        setAdminActiveButtonArr(newActiveArr);

        let newResultsArr = {...resultsArr};
        let otherTeam;

        if(isFirst) {
            otherTeam = matchupsArr[activePage-1][Math.floor(i/2)].split(' ')[2];
        }
        else {
            otherTeam = matchupsArr[activePage-1][Math.floor(i/2)].split(' ')[0];
        }
        console.log(otherTeam);
        
        if(unclickTeam) {
            console.log("unclick");
            newResultsArr[activePage-1][trimmedName] = "";
            newResultsArr[activePage-1][otherTeam] = "";
        } else {
            newResultsArr[activePage-1][trimmedName] = true;
            newResultsArr[activePage-1][otherTeam] = false;
        }

        console.log(newResultsArr);
        setResultsArr(newResultsArr);
        // setCurrentPick(currName);
    }

    // API - current week (must write lambda function that writes user curr team into back of userPreviousTeams)
    // userCurrTeam === selected team on the page? 
    // if userCurrTeam === "", then userCurrTeam = userPickedTeamsArr(lastElement)

    console.log(currMatchups);
    let arrButtons = [];

    

    // TO-DO check if deadline past. Make objects non-selectable/submittable
    let firstTeam = "";
    let secondTeam = "";
    let firstIncumbent;
    let secondIncumbent;
    for (let i = 0; i < matchupsArr[activePage-1].length * 2; i+=2) { 
        firstTeam = matchupsArr[activePage-1][i/2].split(' ')[0];
        secondTeam = matchupsArr[activePage-1][i/2].split(' ')[2];
        var NFLTeamOne = teamIcons[firstTeam];
        var NFLTeamTwo = teamIcons[secondTeam];
        
        if(!resultsArr || resultsArr.length < 2) {
            firstIncumbent = false;
            secondIncumbent = false;
        } else {
            // console.log(firstTeam + ": " + resultsArr[activePage-1][firstTeam]);
            // console.log(secondTeam + ": " + resultsArr[activePage-1][secondTeam]);
            // console.log(firstTeam + ": " + typeof(resultsArr[activePage-1][firstTeam]));
            // console.log(secondTeam + ": " + typeof(resultsArr[activePage-1][firstTeam]));            
            firstIncumbent = (typeof(resultsArr[activePage-1][firstTeam]) == "string" || !resultsArr[activePage-1][firstTeam]) ? false : true;
            secondIncumbent = (typeof(resultsArr[activePage-1][secondTeam]) == "string" || !resultsArr[activePage-1][secondTeam]) ? false : true;             
            // console.log(firstTeam + ": " + firstIncumbent);
            // console.log(secondTeam + ": " + secondIncumbent);
        }

        // console.log(firstTeam + ": " + activeButtonArr[activePage-1][i]);
        // console.log(secondTeam + ": " + activeButtonArr[activePage-1][i+1]);
        arrButtons.push(<p key={i+'-p-admin'} className='breaker'/>);

        if(firstIncumbent) {
            arrButtons.push(<Button key={i} variant="outline-primary" className="pick-select-button" active onClick={(event)=>handleTeamChosen(event,i, true, secondTeam)}> <NFLTeamOne/> {firstTeam} </Button>)
        } else {
            arrButtons.push(<Button key={i} variant="outline-primary" className="pick-select-button" active={(resultsArr[activePage-1][i] === "") ? false : resultsArr[activePage-1][i]} onClick={(event)=>handleTeamChosen(event,i, true, secondTeam)}> <NFLTeamOne/> {firstTeam} </Button>)
        }

        if(secondIncumbent) {
            arrButtons.push(<Button key={i+1} variant="outline-primary" className="pick-select-button" active onClick={(event)=>handleTeamChosen(event,i+1, false, firstTeam)}> <NFLTeamTwo/> {secondTeam} </Button>)
        } else {
            arrButtons.push(<Button key={i+1} variant="outline-primary" className="pick-select-button" active={(resultsArr[i+1] === "") ? false : resultsArr[activePage-1][i+1]} onClick={(event)=>handleTeamChosen(event,i+1, false, firstTeam)}> <NFLTeamTwo/> {secondTeam} </Button>)
        }
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
            weekResults[firstTeam] = resultsArr[activePage-1][firstTeam];
            weekResults[secondTeam] = resultsArr[activePage-1][secondTeam];
        }

        console.log("WEEK RESULTS");
        submitResults(event, weekResults);
        // API - PUT - write to DynamoDB table entry - userCurrTeam
        // Refresh page, make sure week by week individual summary is updated and current team's button is active
    }

    if(!newSession || (newSession['idToken']['payload']['cognito:groups'] && newSession['idToken']['payload']['cognito:groups'][0] !== 'admin')) {
        return (
            <>
                <div className='admin-reject-section'>
                    <p> This page is for admins only...</p>
                </div>
        </>
        )
    }

     

    return (
        <>
            <div className='main-section-admin'>
                <div className='team-section-admin'>
                    <Form onSubmit={handleAdminSubmit}>
                        <ButtonToolbar aria-label="Toolbar with button groups">
                            <ButtonGroup className="me-2 team-group-admin" aria-label="First group">
                                {/* <div className='individual-matchup-section'> */}
                                    {arrButtons}
                                {/* </div> */}
                                <p className='breaker'/>
                                <Button className="admin-submit" type="submit"> Submit </Button>
                            </ButtonGroup>
                        </ButtonToolbar>
                    </Form>
                    <Pagination className='pagination-admin'>{items}</Pagination>
                </div>
            </div>
        </>
    )
}

export default Admin;