import React, {useEffect, useState, useContext} from 'react';
import axios from 'axios';
import { ListGroup, Badge, Card } from 'react-bootstrap';
import './Standings.css';
import * as NFLIcons from '../../teamIcons'
import CurrentWeek from './../../utils/CurrentWeek';
import { AccountContext } from './../../components/UserPool/Account';

// API article https://medium.com/swlh/skip-lambda-save-data-to-dynamodb-directly-using-api-gateway-process-later-with-streams-dab2ceef9a9d
function Standings() {
    const { authenticate, getSession, logout } = useContext(AccountContext);
    const [newSession, setNewSession] = useState(undefined);

    const [activePage, setActivePage] = useState(CurrentWeek());

    const [startStreak, setStartStreak] = useState([]);
    const [mostCorrect, setMostCorrect] = useState([]);

    const [standings, setStandings] = useState({});

    useEffect(() => {
        getSession(setNewSession)
          .then((session) => {
            console.log('Session Activated');
          })
          .catch((err) => {
            console.log('Session: ', err);
          });
        
      }, []);

    // API: get payoutsArr
    const [payoutsArr, setPayoutsArr] = useState([
        "Longest Start Streak: $",
        "Second Longest Start Streak: $",
        "Most Correct: $",
        "Second Most Correct: $"
    ]);      

    // API: get payoutsArr
    const [moneyDistributionArr, setMoneyDistributionArr] = useState([
        "Longest Start Streak: $",
        "Second Longest Start Streak: $",
        "Most Correct: $",
        "Second Most Correct: $"
    ]);

    function getStandings() {
        console.log("GETTING STANDINGS");
        axios.get('https://khvuxdskc6.execute-api.us-east-2.amazonaws.com/prod/standings', {
            headers: {
                Authorization: newSession['idToken']['jwtToken'],
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            console.log(response["data"]);
            setStartStreak(response["data"]["longest_start_streak"]);
            setMostCorrect(response["data"]["most_correct"]);
        }).catch((error) => {
            console.log(error); // NEED TO ADD ERROR HANDLING
        })
    }

    function getUserInfo(username) {
        console.log("GETTING USER INFO for " + username);
        axios.get('https://khvuxdskc6.execute-api.us-east-2.amazonaws.com/prod/userinfo', {
            headers: {
                Authorization: newSession['idToken']['jwtToken'],
                'Content-Type': 'application/json',
            },
            params: {'user': username}
        }).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error); // NEED TO ADD ERROR HANDLING
        })
    }

    function getPayoutTiers(currStreakArr) {
        let tierNum = 1;
        let highScore = -1;
        let firstTier = "";
        let secondTier = "";
        let val;

        console.log(currStreakArr);
        for(let i = 0; i < currStreakArr.length; i++) {                
            val = currStreakArr[i];
            currUser = Object.keys(val)[0];
            currStreak = Object.values(val)[0][0];
            if(currStreak > highScore) {
                firstTier = (firstTier == "") ? firstTier + currUser : firstTier + ", " + currUser;
                highScore = currStreak;
            } else if(currStreak == highScore && tierNum == 1) {
                firstTier = (firstTier == "") ? firstTier + currUser : firstTier + ", " + currUser;
                tierNum = 2; 
            } else if(currStreak < highScore && tierNum == 1) {
                secondTier = (secondTier == "") ? secondTier + currUser : secondTier + ", " + currUser;
                highScore = currStreak;
                tierNum = 2; 
            } else if(currStreak == highScore && tierNum == 2) {
                secondTier = (secondTier == "") ? secondTier + currUser : secondTier + ", " + currUser;
                break;
                
            }
        };

        return [firstTier, secondTier]
    }

    function showUserInfoModal(event) {
        let username = event.target.innerText.split('\n')[0];
        getUserInfo(username);
    }


      useEffect(() => {
        if(newSession != undefined) getStandings();
      }, [newSession]);

      useEffect(() => {
            let totalEntries = startStreak.length;
            let mostPayout = totalEntries * 6.25;
            let secondLongestPayout = Math.ceil(totalEntries * 2.77);
            
            let firstPayout = 25 * totalEntries - mostPayout - (secondLongestPayout * 2);

            setMoneyDistributionArr([
                "Longest Start Streak: $" + firstPayout,
                "Second Longest Start Streak: $" + secondLongestPayout,
                "Most Correct: $" + mostPayout,
                "Second Most Correct: $" + secondLongestPayout
            ]);
            

            let startStreakTiers = getPayoutTiers(startStreak);
            let firstTierStartStreak = startStreakTiers[0];
            let secondTierStartStreak = startStreakTiers[1];


            let mostCorrectTiers = getPayoutTiers(mostCorrect);
            let firstTierMostStreak = mostCorrectTiers[0];
            let secondTierMostStreak = mostCorrectTiers[1];

            let numFirstStartCommas = 1 + (firstTierStartStreak.match(/,/g) || []).length;
            let numSecondStartCommas = 1 + (secondTierStartStreak.match(/,/g) || []).length;
            let numFirstMostCommas = 1 + (firstTierMostStreak.match(/,/g) || []).length;
            let numSecondMostCommas = 1 + (secondTierMostStreak.match(/,/g) || []).length;

            setPayoutsArr([
                "Longest Start Streak: " + firstTierStartStreak + " ($" +  (firstPayout / numFirstStartCommas).toString() + ")",
                "Second Longest Start Streak: " + secondTierStartStreak + " ($" +  (secondLongestPayout / numSecondStartCommas).toString() + ")",
                "Most Correct: " + firstTierMostStreak + " ($" +  (mostPayout / numFirstMostCommas).toString() + ")",
                "Second Most Correct: " + secondTierMostStreak + " ($" +  (secondLongestPayout / numSecondMostCommas).toString() + ")"
            ]);            
      }, [startStreak]);

    let startStreakItems = []
    let prevVal = -1;

    let currUser = "";
    let currStreak = 0;
    let isStreakAlive = true;
    let badgeStyle;
    let index = 0;
    startStreak.forEach((val) => {
        currUser = Object.keys(val)[0];
        currStreak = Object.values(val)[0][0];
        isStreakAlive = Object.values(val)[0][1];
        
        // add mappings between name and username here
        badgeStyle = isStreakAlive ? "success" : "danger";

        if(currStreak == prevVal) {
            startStreakItems.push(
                <>
                    <ListGroup.Item action onClick={showUserInfoModal} className="d-flex justify-content-between align-items-start cursor"> 
                        <div className="ms-2 me-auto profile-button" style={{paddingLeft: '12px'}}>
                            {currUser}
                        </div>
                        <Badge style={{marginLeft: '10px'}} bg={badgeStyle} pill>
                            {currStreak}
                        </Badge>
                    </ListGroup.Item>
                </>
            )
        } else {
            startStreakItems.push(
                <>
                    <ListGroup.Item action onClick={showUserInfoModal} as="li" className="d-flex justify-content-between align-items-start cursor">
                        <div className="ms-2 me-auto profile-button">
                            {currUser}
                        </div>
                        <Badge style={{marginLeft: '10px'}} bg={badgeStyle} pill>
                                {currStreak}
                        </Badge>
                    </ListGroup.Item>
                </>
            )
        }

        prevVal = currStreak;
        index++;
    });

    let mostCorrectItems = []
    let currUserMost = "";
    let currStreakMost = 0;
    prevVal = -1;
    index = 0;
    mostCorrect.forEach((val) => {
        currUserMost = Object.keys(val)[0];
        currStreakMost = Object.values(val)[0];

        if(currStreakMost == prevVal) {
            mostCorrectItems.push(
                <>
                    <ListGroup.Item action onClick={showUserInfoModal} className="d-flex justify-content-between align-items-start cursor"> 
                        <div className="ms-2 me-auto profile-button" style={{paddingLeft: '15px'}}>
                            {currUserMost}
                        </div>
                        <Badge style={{marginLeft: '10px'}} bg="success" pill>
                            {currStreakMost}
                        </Badge>
                    </ListGroup.Item>
                </>
            )
        } else {
            mostCorrectItems.push(
                <>
                    <ListGroup.Item action onClick={showUserInfoModal} as="li" className="d-flex justify-content-between align-items-start cursor">
                        <div className="ms-2 me-auto profile-button">
                            {currUserMost}
                        </div>
                        <Badge style={{marginLeft: '10px'}} bg="success" pill>
                                {currStreakMost}
                        </Badge>
                    </ListGroup.Item>
                </>
            )
        }

        prevVal = currStreakMost;
        index++;
    });

    let payoutsItems = []
    payoutsArr.forEach((val) => {
        payoutsItems.push(
            <ListGroup.Item > 
                <div> 
                    {val.split(":")[0]}
                </div>
                <div className="payouts-item">
                    {val.split(":")[1]}
                </div>
            </ListGroup.Item>  
        );
    });

    let moneyDistItems = []
    moneyDistributionArr.forEach((val) => {
        moneyDistItems.push(
            <ListGroup.Item > 
                <div> 
                    {val.split(":")[0]}
                </div>
                <div className="payouts-item">
                    {val.split(":")[1]}
                </div>
            </ListGroup.Item>  
        );
    });

    return (
        <>
            <div className='main-section'>
                <div className='start-streak-section'>
                    <Card className='past-picks-card'>
                        <Card.Header className='past-picks-header-1'> Longest Start Streak </Card.Header>
                        <ListGroup as="ol" numbered>
                            {startStreakItems}
                        </ListGroup>
                    </Card>
                </div>

                <div className='most-correct-section'>
                    <Card className='past-picks-card'>
                        <Card.Header className='past-picks-header-1'> Most Correct </Card.Header>
                        <ListGroup className="most-correct-section"as="ol" numbered>
                            {mostCorrectItems}
                        </ListGroup>
                    </Card>

                </div>

                <div className='payout-section'>
                    <Card className='past-picks-card'>
                        <Card.Header className='past-picks-header-1'> Payouts </Card.Header>
                        <ListGroup variant="flush">
                            
                            {payoutsItems}

                        </ListGroup>
                    </Card>
                </div>

                <div className='money-distribution-section'>
                    <Card className='past-picks-card'>
                        <Card.Header className='past-picks-header-1'> Money Distribution </Card.Header>
                        <ListGroup variant="flush">
                            
                            {moneyDistItems}

                        </ListGroup>
                    </Card>
                </div>

            </div>
        </>
    )
}

export default Standings;