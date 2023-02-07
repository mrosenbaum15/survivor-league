import React, {useEffect, useState, useContext} from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { ButtonGroup, ButtonToolbar, Button, Form, Pagination} from 'react-bootstrap';
import './EnterPicks.css';
import CurrentWeekNum from './../../utils/CurrentWeekNum';
import PickEligibility from './../../utils/PickEligibility';
import teamIcons from './../../utils/teamIcons';
import { AccountContext } from './../../components/UserPool/Account';
import PastPicksCard from '../../components/PastPicksCard/PastPicksCard';
import DeadlineTooltip from '../../components/DeadlineTooltip/DeadlineTooltip';
import { Lock } from 'react-bootstrap-icons';
import GameDeadlineTitle from '../../utils/GameDeadlineTitle';

// API article https://medium.com/swlh/skip-lambda-save-data-to-dynamodb-directly-using-api-gateway-process-later-with-streams-dab2ceef9a9d
function EnterPicks() {
    const { getSession } = useContext(AccountContext);
    const [newSession, setNewSession] = useState(undefined);

    let navigate = useNavigate(); 

    // const [isTeamSelectedArr, setIsTeamSelectedArr] = useState(Array(18).fill(false));
    const [currentPickArr, setCurrentPickArr] = useState(Array(18).fill(""));
    const [activeButtonArr, setActiveButtonArr] = useState(Array(18).fill(Array(32).fill(null)));

    // API - current week of season
    const [activePage, setActivePage] = useState(CurrentWeekNum());

    const [locked, setLocked] = useState(Array(18).fill(true));
    const [matchupsArr, setMatchupsArr] = useState([[]]);
    const [deadlinesArr, setDeadlinesArr] = useState([[]]);
    const [showSubmitButton, setShowSubmitButton] = useState(false);

    const [userPicks, setUserPicks] = useState([{'Team':''}]);
    const [userStats, setUserStats] = useState({});


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
        setUserPicks(picks);

        let updatedPicks = {...currentPickArr}
        let tempVal;
        picks.forEach((val,i) => {
            tempVal = Object.keys(val)[0];
            if(!tempVal.includes("Team")) updatedPicks[i] = tempVal;
        }) 
        
        setCurrentPickArr(updatedPicks);
    }

    function getAllMatchups() {
        axios.get('https://khvuxdskc6.execute-api.us-east-2.amazonaws.com/prod/get-all-matchups', {
            headers: {
                Authorization: newSession['idToken']['jwtToken'],
                'Content-Type': 'application/json'
            },
            params: {'username': newSession['accessToken']['payload']['username']}
        }).then((response) => {
            setLocked(response["data"]["locked"]);
            setMatchupsArr(response["data"]["matchups"]);
            setDeadlinesArr(response["data"]["deadlines"]);
            setShowSubmitButton(true);
        }).catch((error) => {
            console.log(error); 
            alert("Unable to get matchups. Refresh the page and try again.");
        });
    }

    function getUserPicks() {
        axios.get('https://khvuxdskc6.execute-api.us-east-2.amazonaws.com/prod/userinfo', {
            headers: {
                Authorization: newSession['idToken']['jwtToken'],
                'Content-Type': 'application/json',
            },
            params: {'user': newSession['accessToken']['payload']['username']}
        }).then((response) => {
            setUserStats(response["data"]);
            establishPicks(response["data"]["user_picked_teams"]);
        }).catch((error) => {
            console.log(error); 
            alert("Unable to get picks. Refresh the page and try again.");
        });
    }

    function submitUserPick(event) {
        event.preventDefault();
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
            window.location.reload();
        }).catch((error) => {
            console.log(error);
            if(error["response"]["status"] == 403) alert("The deadline has passed for this week and your pick cannot be submitted.");
            else alert("Unable to submit pick. Please text 847-630-2489 to submit.");
        });

    }


    useEffect(() => {
        if(newSession !== undefined) {
            getAllMatchups();
            getUserPicks();
        }
      }, [newSession]);

    let items = [];
    for(let i = 1; i < 19; ++i) {

        items.push(
            <Pagination.Item key={i} active={i === activePage} onClick={(event)=>{
                setActivePage(i);
            }}>
                {i}
            </Pagination.Item>
        );
    }

    function handleTeamChosen(event, i) {
        let buttonText = event.target.innerText;
        // let newTeamSelectedArr = {...isTeamSelectedArr}
        if(buttonText === undefined) {
            const iconText = (event.target.nearestViewportElement) ? event.target.nearestViewportElement.id : event.target.id;
            if(iconText === undefined) {
                return;
            }
            buttonText = iconText;
        }

        const currName = buttonText;
        let trimmedName = currName.trim();
        const unclickTeam = trimmedName === currentPickArr[activePage-1].trim();

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

    let arrButtons = [];
    let weeklyButtons = [];
    let firstTeam = "";
    let secondTeam = "";
    let prevDeadline = "";
    let isFirstTeamPicked, isSecondTeamPicked, buttonColor, currKey, currVal, currDeadline, eligibility;

    if(!locked[activePage-1] && matchupsArr.length > 1 && userPicks.length > 1) {
        for (let i = 0; i < matchupsArr[activePage-1].length * 2; i+=2) { 
            firstTeam = matchupsArr[activePage-1][i/2].split(' ')[0];
            secondTeam = matchupsArr[activePage-1][i/2].split(' ')[2];
    
            var NFLTeamOne = teamIcons[firstTeam];
            var NFLTeamTwo = teamIcons[secondTeam];
    
            currKey = Object.keys(userPicks[activePage-1])[0];
            currVal = Object.values(userPicks[activePage-1])[0];
    
            buttonColor = (typeof(currVal) === "string") ? "outline-primary" : (currVal ? "outline-success" : "outline-danger");
            
            isFirstTeamPicked = userPicks.filter(function (key) {
                                    return key.hasOwnProperty(firstTeam);
                                }).length > 0;
    
            isSecondTeamPicked = userPicks.filter(function (key) {
                                    return key.hasOwnProperty(secondTeam);
                                }).length > 0;
            
            if(i > 0) {
                arrButtons.push(
                    <p key={i+'-p'} className='breaker'/>
                );
            }
    
            currDeadline = deadlinesArr.length > 1 ? deadlinesArr[activePage-1][i/2] : "";
            if(currDeadline !== prevDeadline) {
                console.log("Banner")
                arrButtons.push(
                    <span key={i+'-span'} className={'game-day-header'}> {GameDeadlineTitle(currDeadline, activePage)} </span>
                )
                
            } 
    
            prevDeadline = currDeadline;
            eligibility = PickEligibility(activePage, currDeadline);
            if((activePage < CurrentWeekNum() || !eligibility) && currKey !== firstTeam) {
                arrButtons.push(<Button key={i} variant="outline-secondary" className="pick-select-button" disabled> <NFLTeamOne/>{firstTeam}</Button>)
            } else if((activePage < CurrentWeekNum() || !eligibility) && currKey !== firstTeam) {
                arrButtons.push(<Button key={i} variant={buttonColor} className="pick-select-button" disabled> <NFLTeamOne/>{firstTeam}</Button>)
            } else if(activePage < CurrentWeekNum() && currKey === firstTeam) {
                arrButtons.push(<Button key={i} variant={buttonColor} className="pick-select-button" active> <NFLTeamOne/> {firstTeam}</Button>)
            } else if(isFirstTeamPicked && currKey !== firstTeam) {
                arrButtons.push(<Button key={i} variant="outline-secondary" className="pick-select-button" disabled> <NFLTeamOne/>{firstTeam}</Button>)
            } else if (firstTeam !== currKey) {
                arrButtons.push(<Button key={i} variant="outline-primary" className="pick-select-button" active={(activeButtonArr[activePage-1][i] === null) ? false : activeButtonArr[activePage-1][i]} onClick={(event)=>handleTeamChosen(event,i)}> <NFLTeamOne/> {firstTeam} </Button>)
            } else if(!eligibility) {
                arrButtons.push(<Button key={i} variant={buttonColor} className="pick-select-button" active={true}> <NFLTeamOne/> {firstTeam} </Button>)
            } else {
                arrButtons.push(<Button key={i} variant={buttonColor} className="pick-select-button" active={(activeButtonArr[activePage-1][i] === null) ? true : activeButtonArr[activePage-1][i]} onClick={(event)=>handleTeamChosen(event,i)}> <NFLTeamOne/> {firstTeam} </Button>)
            }
    
            if((activePage < CurrentWeekNum() || !eligibility) && currKey !== secondTeam) {
                arrButtons.push(<Button key={i+1} variant="outline-secondary" className="pick-select-button" disabled> <NFLTeamTwo/> {secondTeam}</Button>)
            } else if((activePage < CurrentWeekNum() || !eligibility) && currKey !== secondTeam) {
                arrButtons.push(<Button key={i+1} variant={buttonColor} className="pick-select-button" disabled> <NFLTeamTwo/> {secondTeam}</Button>)
            } else if(activePage < CurrentWeekNum() && currKey === secondTeam) {
                arrButtons.push(<Button key={i+1} variant={buttonColor} className="pick-select-button" active> <NFLTeamTwo/> {secondTeam}</Button>)
            } else if(isSecondTeamPicked && currKey !== secondTeam) {
                arrButtons.push(<Button key={i+1} variant="outline-secondary" className="pick-select-button" disabled> <NFLTeamTwo/> {secondTeam}</Button>)
            } else if (secondTeam !== currKey) {
                arrButtons.push(<Button key={i+1} variant="outline-primary" className="pick-select-button" active={(activeButtonArr[activePage-1][i+1] === null) ? false : activeButtonArr[activePage-1][i+1]} onClick={(event)=>handleTeamChosen(event,i+1)}> <NFLTeamTwo/> {secondTeam} </Button>)
            } else if(!eligibility) {
                arrButtons.push(<Button key={i+1} variant={buttonColor} className="pick-select-button" active={true}> <NFLTeamTwo/> {secondTeam} </Button>)
            } else {
                arrButtons.push(<Button key={i+1} variant={buttonColor} className="pick-select-button" active={(activeButtonArr[activePage-1][i+1] === null) ? true : activeButtonArr[activePage-1][i+1]} onClick={(event)=>handleTeamChosen(event,i+1)}> <NFLTeamTwo/> {secondTeam} </Button>)
            }
        }
    }

    else if(locked[activePage-1] && matchupsArr.length > 1 && userPicks.length > 1) {
        let team = Object.keys(userPicks[activePage-1])[0];

        if(team.includes("Team")) {
            weeklyButtons.push(
                <div key={activePage+'-locked'}className='locked-pick-section'>
                    <Lock className="locked-tooltip-icon" />
                    Your pick is locked for Week {activePage}: None
                </div>
            )
        } else {
            var NFLTeam = teamIcons[Object.keys(userPicks[activePage-1])[0]];

            weeklyButtons.push(
                <div key={activePage+'-locked'}className='locked-pick-section'>
                    <Lock className="locked-tooltip-icon" />
                    Your pick is locked for Week {activePage}:
                    <span className='locked-pick-offset'>
                        <NFLTeam/>
                    </span>
                        
                </div>
            )
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
                <DeadlineTooltip
                    weekNum={activePage}
                />
                <PastPicksCard 
                    stats={userStats}
                    picks={userPicks}
                />
                <div className='team-section'>
                    
                    <Form onSubmit={submitUserPick}>
                        <ButtonToolbar aria-label="Toolbar with button groups">
                            <ButtonGroup className="me-2 team-group" aria-label="First group">
                                {arrButtons}
                                <p className='breaker'/>
                                {/* <Button type="submit" disabled={!isTeamSelectedArr[activePage-1]}> Submit </Button> */}
                                {
                                    !locked[activePage-1]
                                        ? <Button type="submit" disabled={!PickEligibility(activePage, "normal")}> Submit </Button>
                                        : ""
                                }
                                    
                            </ButtonGroup>
                        </ButtonToolbar>
                    </Form>
                    {
                        weeklyButtons
                    }
                    {
                         showSubmitButton
                         ? <Pagination className='pagination-enter-picks'>{items}</Pagination>
                         : ""
                    }
                    
                </div>
            </div>
        </>
    )
}

export default EnterPicks;