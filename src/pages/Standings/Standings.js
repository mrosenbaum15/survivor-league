import React, {useEffect, useState, useContext} from 'react';
import axios from 'axios';
import { ListGroup, Badge, Card } from 'react-bootstrap';
import './Standings.css';
import { AccountContext } from './../../components/UserPool/Account';
import UserInfoModal from '../../components/UserInfoModal/UserInfoModal';

// API article https://medium.com/swlh/skip-lambda-save-data-to-dynamodb-directly-using-api-gateway-process-later-with-streams-dab2ceef9a9d
function Standings() {
    const { getSession } = useContext(AccountContext);
    const [newSession, setNewSession] = useState(undefined);

    const [startStreak, setStartStreak] = useState([]);
    const [mostCorrect, setMostCorrect] = useState([]);

    const [standings, setStandings] = useState({});

    const [showModal, setShowModal] = useState(false);
    const [showSpinnerInModal, setShowSpinnerInModal] = useState(true);
    const [fullUserInfo, setFullUserInfo] = useState(undefined);

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
        'Longest Start Streak: $',
        'Second Longest Start Streak: $',
        'Most Correct: $',
        'Second Most Correct: $'
    ]);      

    // API: get payoutsArr
    const [moneyDistributionArr, setMoneyDistributionArr] = useState([
        'Longest Start Streak: $',
        'Second Longest Start Streak: $',
        'Most Correct: $',
        'Second Most Correct: $'
    ]);

    function getUserInfo(username) {
        setShowModal(true);
        axios.get('https://khvuxdskc6.execute-api.us-east-2.amazonaws.com/prod/user-info-standings', {
            headers: {
                Authorization: newSession['idToken']['jwtToken'],
                'Content-Type': 'application/json',
            },
            params: {'user': username}
        }).then((response) => {
            setFullUserInfo(response['data']);
            setShowSpinnerInModal(false);
        }).catch((error) => {
            console.log(error); 
            alert('Unable to get user info. Refresh the page and try again.');
        })
    }

    function getPayoutTiers(currStreakArr, isMostCorrect) {
        let tierNum = 1;
        let highScore = -1;
        let firstTier = '';
        let secondTier = '';
        let val;

        let firstTierLen = 0;
        for(let i = 0; i < currStreakArr.length; i++) {                
            val = currStreakArr[i];
            currUser = Object.keys(val)[0];
            currStreak = isMostCorrect ? Object.values(val)[0] : Object.values(val)[0][0];
            if(currStreak > highScore) {
                firstTier = (firstTier === '') ? firstTier + currUser : firstTier + ', ' + currUser;
                highScore = currStreak;
                firstTierLen = 1;
            } else if(currStreak === highScore && tierNum === 1) {
                firstTier = (firstTier === '') ? firstTier + currUser : firstTier + ', ' + currUser;
                firstTierLen++;
            } else if(currStreak < highScore && tierNum === 1 && firstTierLen === 1) {
                secondTier = (secondTier === '') ? secondTier + currUser : secondTier + ', ' + currUser;
                highScore = currStreak;
                tierNum = 2;
            } else if(currStreak < highScore && tierNum === 1 && firstTierLen > 1) {
                secondTier = firstTier;
                break;
            } else if(currStreak === highScore && tierNum === 2) {
                secondTier = (secondTier === '') ? secondTier + currUser : secondTier + ', ' + currUser;                
            }
        };

        return [firstTier, secondTier]
    }

    function showUserInfoModal(event) {
        let username = event.target.innerText.split('\n')[0];
        getUserInfo(username);
    }


      useEffect(() => {
        if(newSession !== undefined) {
            const getStandings = () => {
                axios.get('https://khvuxdskc6.execute-api.us-east-2.amazonaws.com/prod/standings', {
                headers: {
                    Authorization: newSession['idToken']['jwtToken'],
                    'Content-Type': 'application/json'
                }
                }).then((response) => {
                    setStartStreak(response['data']['longest_start_streak']);
                    setMostCorrect(response['data']['most_correct']);
                    setStandings(response['data']);
                }).catch((error) => {
                    console.log(error); 
                    alert('Unable to standings. Refresh the page and try again.');
                })
            }
            getStandings()
        }
      }, [newSession]);

      useEffect(() => {
            let totalEntries = startStreak.length;
            let mostPayout = totalEntries * 6.25;
            let secondLongestPayout = Math.ceil(totalEntries * 2.77);
            
            let firstPayout = 25 * totalEntries - mostPayout - (secondLongestPayout * 2);

            setMoneyDistributionArr([
                'Longest Start Streak: $' + firstPayout.toFixed(2),
                'Second Longest Start Streak: $' + secondLongestPayout.toFixed(2),
                'Most Correct: $' + mostPayout.toFixed(2),
                'Second Most Correct: $' + secondLongestPayout.toFixed(2)
            ]);
            

            let startStreakTiers = getPayoutTiers(startStreak, false);
            let firstTierStartStreak = startStreakTiers[0];
            let secondTierStartStreak = startStreakTiers[1];

            let mostCorrectTiers = getPayoutTiers(mostCorrect, true);
            let firstTierMostStreak = mostCorrectTiers[0];
            let secondTierMostStreak = mostCorrectTiers[1];

            let numFirstStartCommas = 1 + (firstTierStartStreak.match(/,/g) || []).length;
            let numSecondStartCommas = 1 + (secondTierStartStreak.match(/,/g) || []).length;
            let numFirstMostCommas = 1 + (firstTierMostStreak.match(/,/g) || []).length;
            let numSecondMostCommas = 1 + (secondTierMostStreak.match(/,/g) || []).length;

            setPayoutsArr([
                'Longest Start Streak: ' + firstTierStartStreak + ' ($' +  (firstPayout / numFirstStartCommas).toFixed(2).toString() + ' each)',
                'Second Longest Start Streak: ' + secondTierStartStreak + ' ($' +  (secondLongestPayout / numSecondStartCommas).toFixed(2).toString() + ' each)',
                'Most Correct: ' + firstTierMostStreak + ' ($' +  (mostPayout / numFirstMostCommas).toFixed(2).toString() + ' each)',
                'Second Most Correct: ' + secondTierMostStreak + ' ($' +  (secondLongestPayout / numSecondMostCommas).toFixed(2).toString() + ' each)'
            ]);            
      }, [standings]);


    let startStreakItems = []
    let prevVal = -1;

    let currUser = '';
    let currStreak = 0;
    let isStreakAlive = true;
    let badgeStyle;
    startStreak.forEach((val, i) => {
        currUser = Object.keys(val)[0];
        currStreak = Object.values(val)[0][0];
        isStreakAlive = Object.values(val)[0][1];
        
        // add mappings between name and username here
        badgeStyle = isStreakAlive ? 'success' : 'danger';

        if(currStreak === prevVal) {
            startStreakItems.push(
                <>
                    <ListGroup.Item key={i+'-start-streak-arr'} action onClick={showUserInfoModal} className='d-flex justify-content-between align-items-start cursor'> 
                        <div key='ss-div' className='ms-2 me-auto profile-button' style={{paddingLeft: '12px'}}>
                            {currUser}
                        </div>
                        <Badge key='ss-badge' style={{marginLeft: '10px'}} bg={badgeStyle} pill>
                            {currStreak}
                        </Badge>
                    </ListGroup.Item>
                </>
            )
        } else {
            startStreakItems.push(
                <>
                    <ListGroup.Item key={i+'-start-streak-arr'} action onClick={showUserInfoModal} as='li' className='d-flex justify-content-between align-items-start cursor'>
                        <div key='ss-div' className='ms-2 me-auto profile-button'>
                            {currUser}
                        </div>
                        <Badge key='ss-badge' style={{marginLeft: '10px'}} bg={badgeStyle} pill>
                                {currStreak}
                        </Badge>
                    </ListGroup.Item>
                </>
            )
        }

        prevVal = currStreak;
    });

    let mostCorrectItems = []
    let currUserMost = '';
    let currStreakMost = 0;
    prevVal = -1;
    mostCorrect.forEach((val, i) => {
        currUserMost = Object.keys(val)[0];
        currStreakMost = Object.values(val)[0];

        if(currStreakMost === prevVal) {
            mostCorrectItems.push(
                <>
                    <ListGroup.Item key={i+'-most-arr'} action onClick={showUserInfoModal} className='d-flex justify-content-between align-items-start cursor'> 
                        <div key='mc-div' className='ms-2 me-auto profile-button' style={{paddingLeft: '15px'}}>
                            {currUserMost}
                        </div>
                        <Badge key='mc-badge' style={{marginLeft: '10px'}} bg='success' pill>
                            {currStreakMost}
                        </Badge>
                    </ListGroup.Item>
                </>
            )
        } else {
            mostCorrectItems.push(
                <>
                    <ListGroup.Item key={i+'-most-arr'} action onClick={showUserInfoModal} as='li' className='d-flex justify-content-between align-items-start cursor'>
                        <div key='mc-div' className='ms-2 me-auto profile-button'>
                            {currUserMost}
                        </div>
                        <Badge key='mc-badge' style={{marginLeft: '10px'}} bg='success' pill>
                                {currStreakMost}
                        </Badge>
                    </ListGroup.Item>
                </>
            )
        }

        prevVal = currStreakMost;
    });

    let payoutsItems = []
    payoutsArr.forEach((val, i) => {
        payoutsItems.push(
            <ListGroup.Item key={i+'-payouts-arr'}> 
                <div key='ah'> 
                    {val.split(':')[0]}
                </div>
                <div key='ahhhh' className='payouts-item'>
                    {val.split(':')[1]}
                </div>
            </ListGroup.Item>  
        );
    });

    let moneyDistItems = []
    moneyDistributionArr.forEach((val, i) => {
        moneyDistItems.push(
            <ListGroup.Item key={i+'-money-dist-arr'}> 
                <div key='ahh'> 
                    {val.split(':')[0]}
                </div>
                <div key='ahhh' className='payouts-item'>
                    {val.split(':')[1]}
                </div>
            </ListGroup.Item>  
        );
    });

    return (
        <>
            <div className='main-section-standings'>
            <div key='first-section' className='standings-card-section'>
                <Card key={7}className='standings-card'>
                        <Card.Header className='standings-header-1'> Longest Start Streak </Card.Header>
                        <ListGroup variant='flush' as='ol' numbered>
                            {startStreakItems}
                        </ListGroup>
                    </Card>
                </div>

                <div key='second-section' className='standings-card-section'>
                    <Card  key={8}className='standings-card'>
                        <Card.Header className='standings-header-1'> Most Correct </Card.Header>
                        <ListGroup variant='flush' as='ol' numbered>
                            {mostCorrectItems}
                        </ListGroup>
                    </Card>

                </div>

                <div key='third-section' className='standings-card-section'>
                    <Card  key={9}className='standings-card'>
                        <Card.Header  className='standings-header-1'> Payouts </Card.Header>
                        <ListGroup  variant='flush'>
                            
                            {payoutsItems}

                        </ListGroup>
                    </Card>
                </div>

                <div key='fourth-section' className='standings-card-section'>
                    <Card key={10}className='standings-card'>
                        <Card.Header className='standings-header-1'> Money Distribution </Card.Header>
                        <ListGroup variant='flush'>
                            
                            {moneyDistItems}

                        </ListGroup>
                    </Card>
                </div>
            </div>
            <UserInfoModal
                fullUserInfo={fullUserInfo}
                showModal={showModal}
                setShowModal={setShowModal}
                showSpinnerInModal={showSpinnerInModal}
                setShowSpinnerInModal={setShowSpinnerInModal}
                setFullUserInfo={setFullUserInfo}
            />
        </>
    )
}

export default Standings;