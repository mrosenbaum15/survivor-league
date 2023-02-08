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
    const [showSubmitButton, setShowSubmitButton] = useState(false);

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
        axios.get('https://khvuxdskc6.execute-api.us-east-2.amazonaws.com/prod/get-all-matchups', {
            headers: {
                Authorization: newSession['idToken']['jwtToken'],
                'Content-Type': 'application/json'
            },
            params: {'username': ''}
        }).then((response) => {
            setMatchupsArr(response['data']['matchups']);
            setShowSubmitButton(true);
        }).catch((error) => {
            console.log(error); 
            alert('Unable to get matchups. Try refreshing page and trying again.');
        })
    }

    function getCurrentResults() {
        axios.get('https://khvuxdskc6.execute-api.us-east-2.amazonaws.com/prod/admin-get-results', {
            headers: {
                Authorization: newSession['idToken']['jwtToken'],
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            setResultsArr(response['data'])
        }).catch((error) => {
            console.log(error); 
            alert('Unable to get results. Try refreshing page and trying again.');
        })
    }

    function submitResults(event, results) {
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
            window.location.reload();
        }).catch((error) => {
            console.log(error); 
            alert('Unable to submit results.');
        });
    }

    useEffect(() => {
        if(newSession !== undefined) {
            getAllMatchups();
            getCurrentResults();
        }
      }, [newSession]);

    let items = []
    for(let i = 1; i < 19; ++i) {
        items.push(
            <Pagination.Item key={i} active={i === activePage} onClick={(event)=>{
                setActivePage(i);
            }}>
                {i}
            </Pagination.Item>
        );
    }

    function handleTeamChosen(event, i, isFirst) {
        let buttonText = event.target.innerText;
        if(buttonText === undefined) {
            const iconText = (event.target.nearestViewportElement) ? event.target.nearestViewportElement.id : event.target.id;
            if(iconText === undefined) {
                return;
            }
            buttonText = iconText;
        }

        const currName = buttonText;
        let trimmedName = currName.trim();
        const unclickTeam = (typeof(resultsArr[activePage-1][trimmedName]) !== 'string' && resultsArr[activePage-1][trimmedName]) ? true : false;

        let newActiveArr = {...adminActiveButtonArr}
        let newActiveSubArr = newActiveArr[activePage-1];

        if(!newActiveArr[activePage-1][i]) {
            newActiveSubArr[i] = true;
            if(isFirst) newActiveSubArr[i+1] = false;
            else newActiveSubArr[i-1] = false;
        }
        else {
            newActiveSubArr[i] = null;
            if(isFirst) newActiveSubArr[i+1] = null;
            else newActiveSubArr[i-1] = null;
        }
        // newActiveSubArr[i] = unclickTeam ? false : true;

        newActiveArr[activePage-1] = newActiveSubArr;
        setAdminActiveButtonArr(newActiveArr);

        let newResultsArr = {...resultsArr};
        let otherTeam;

        if(isFirst) {
            otherTeam = matchupsArr[activePage-1][Math.floor(i/2)].split(' ')[2];
        }
        else {
            otherTeam = matchupsArr[activePage-1][Math.floor(i/2)].split(' ')[0];
        }

        if(unclickTeam) {
            newResultsArr[activePage-1][trimmedName] = '';
            newResultsArr[activePage-1][otherTeam] = '';
        } else {
            newResultsArr[activePage-1][trimmedName] = true;
            newResultsArr[activePage-1][otherTeam] = false;
        }
        setResultsArr(newResultsArr);
    }

    let arrButtons = [];

    let firstTeam = '';
    let secondTeam = '';
    let firstIncumbent;
    let secondIncumbent;
    if(matchupsArr.length > 1 && Object.keys(resultsArr).length > 1) {
        for (let i = 0; i < matchupsArr[activePage-1].length * 2; i+=2) { 
            firstTeam = matchupsArr[activePage-1][i/2].split(' ')[0];
            secondTeam = matchupsArr[activePage-1][i/2].split(' ')[2];
            var NFLTeamOne = teamIcons[firstTeam];
            var NFLTeamTwo = teamIcons[secondTeam];
            
            if(!resultsArr || resultsArr.length < 2) {
                firstIncumbent = false;
                secondIncumbent = false;
            } else {       
                firstIncumbent = (typeof(resultsArr[activePage-1][firstTeam]) == 'string' || !resultsArr[activePage-1][firstTeam]) ? false : true;
                secondIncumbent = (typeof(resultsArr[activePage-1][secondTeam]) == 'string' || !resultsArr[activePage-1][secondTeam]) ? false : true;             
            }

            arrButtons.push(<p key={i+'-p-admin'} className='breaker'/>);
            if(firstIncumbent) {
                arrButtons.push(<Button key={i} variant='outline-primary' className='pick-select-button' active onClick={(event)=>handleTeamChosen(event,i, true)}> <NFLTeamOne/> {firstTeam} </Button>)
            } else {
                arrButtons.push(<Button key={i} variant='outline-primary' className='pick-select-button' active={(resultsArr[activePage-1][firstTeam] === '') ? false : resultsArr[activePage-1][firstTeam]} onClick={(event)=>handleTeamChosen(event,i, true)}> <NFLTeamOne/> {firstTeam} </Button>)
            }

            if(secondIncumbent) {
                arrButtons.push(<Button key={i+1} variant='outline-primary' className='pick-select-button' active onClick={(event)=>handleTeamChosen(event,i+1, false)}> <NFLTeamTwo/> {secondTeam} </Button>)
            } else {
                arrButtons.push(<Button key={i+1} variant='outline-primary' className='pick-select-button' active={(resultsArr[activePage-1][secondTeam] === '') ? false : resultsArr[activePage-1][secondTeam]} onClick={(event)=>handleTeamChosen(event,i+1, false)}> <NFLTeamTwo/> {secondTeam} </Button>)
            }
        }
    }
    
    function handleAdminSubmit(event) {
        event.preventDefault();
        let weekResults = {};
        let firstTeam, secondTeam;

        for (let i = 0; i < matchupsArr[activePage-1].length * 2; i+=2) { 
            firstTeam = matchupsArr[activePage-1][i/2].split(' ')[0];
            secondTeam = matchupsArr[activePage-1][i/2].split(' ')[2];
            weekResults[firstTeam] = resultsArr[activePage-1][firstTeam];
            weekResults[secondTeam] = resultsArr[activePage-1][secondTeam];
        }

        submitResults(event, weekResults);
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
                        <ButtonToolbar aria-label='Toolbar with button groups'>
                            <ButtonGroup className='me-2 team-group-admin' aria-label='First group'>
                                {/* <div className='individual-matchup-section'> */}
                                    {arrButtons}
                                {/* </div> */}
                                <p className='breaker'/>
                                {
                                    showSubmitButton
                                        ? <Button className='admin-submit' type='submit'> Submit </Button>
                                        : ''
                                }                                
                            </ButtonGroup>
                        </ButtonToolbar>
                    </Form>
                    {
                        showSubmitButton
                         ? <Pagination className='pagination-admin'>{items}</Pagination>
                         : ''
                    }
                </div>
            </div>
        </>
    )
}

export default Admin;