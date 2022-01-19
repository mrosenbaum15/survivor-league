import React, {useEffect, useState} from 'react';
import { ListGroup, Badge, Card } from 'react-bootstrap';
import './Standings.css';
import * as NFLIcons from '../../teamIcons'
import CurrentWeek from './../../utils/CurrentWeek';

// API article https://medium.com/swlh/skip-lambda-save-data-to-dynamodb-directly-using-api-gateway-process-later-with-streams-dab2ceef9a9d
function Standings() {
    const [activePage, setActivePage] = useState(CurrentWeek());

    const [startStreak, setStartStreak] = useState({});
    const [mostCorrect, setMostCorrect] = useState({});
    <ListGroup.Item className="modal-bg"> Hiiii </ListGroup.Item>

    const [startStreakSorted, setStartStreakSorted] = useState({});
    const [mostCorrectSorted, setMostCorrectSorted] = useState({});

    // API: get standings
    const [resultsObj, setResultsObj] = useState({
        "Rosey": [true, true, true, true, true, true, true, true, true, true, false, false, true, true, true, true, true, false],
        "Jeff": [true, true, true, true, true, true, true, true, false, true, false, true, false, false, true, true, true, true],
        "Drew": [false, true, true, true, true, true, true, true, true, false, true, false, true, true, true, false, true, false],
        "Swill": [true, true, true, true, true, true, true, false, true, true, false, false, false, true, true, false, true, false],
        "Glick": [false, true, true, true, true, true, true, true, true, false, true, true, false, true, false, true, true, false],
        "Brad": [false, true, true, true, true, true, true, true, true, false, true, false, false, true, true, false, true, false],
        "Gerstein": [true, true, true, true, true, true, true, false, true, false, true, false, true, true, true, false, true, false]
    });

    // API: get payoutsArr
    const [payoutsArr, setPayoutsArr] = useState([
        "Longest Start Streak: $50",
        "Second Longest Start Streak: $25",
        "Most Correct: $55",
        "Second Most Correct: $25"
    ]);

    useEffect(() => {
        let tempStartStreak = {};
        let tempMostCorrect = {};
        Object.keys(resultsObj).forEach((key) => {
            let startStreak = 0;
            let numCorrect = 0;
            let isOnStartStreak = true;
            resultsObj[key].forEach((val) => {
                if(val) numCorrect++;
                if(isOnStartStreak && val) startStreak++;
                else isOnStartStreak = false;
            })

            tempStartStreak[key] = startStreak;
            tempMostCorrect[key] = numCorrect;
        });

        setStartStreak(tempStartStreak);
        setMostCorrect(tempMostCorrect);

    },[resultsObj]);

    useEffect(() => {
        let tempStartSorted = Object.entries(startStreak)
        .sort(([,a],[,b]) => b-a)
        .reduce((r, [k, v]) => ({ ...r, [k]: v }), {})

        setStartStreakSorted(tempStartSorted);

    }, [startStreak]);

    useEffect(() => {
        let tempMostCorrect = Object.entries(mostCorrect)
        .sort(([,a],[,b]) => b-a)
        .reduce((r, [k, v]) => ({ ...r, [k]: v }), {})

        setMostCorrectSorted(tempMostCorrect);
    }, [mostCorrect]);


    let startStreakItems = []
    let prevVal = -1;
    Object.keys(startStreakSorted).forEach((key) => {
        if(startStreakSorted[key] == prevVal) {
            startStreakItems.push(
                <>
                    <ListGroup.Item className="d-flex justify-content-between align-items-start cursor"> 
                        <div className="ms-2 me-auto profile-button" style={{paddingLeft: '12px'}}>
                            {key}
                        </div>
                        <Badge style={{marginLeft: '10px'}} bg="success" pill>
                            {startStreakSorted[key]}
                        </Badge>
                    </ListGroup.Item>
                </>
            )
        } else {
            startStreakItems.push(
                <>
                    <ListGroup.Item action onClick={() => {console.log("hey")}} as="li" className="d-flex justify-content-between align-items-start cursor">
                        <div className="ms-2 me-auto profile-button">
                            {key}
                        </div>
                        <Badge style={{marginLeft: '10px'}} bg="success" pill>
                                {startStreakSorted[key]}
                        </Badge>
                    </ListGroup.Item>
                </>
            )
        }

        prevVal = startStreakSorted[key];
    });

    let mostCorrectItems = []
    prevVal = -1;
    Object.keys(mostCorrectSorted).forEach((key) => {
        if(mostCorrectSorted[key] == prevVal) {
            mostCorrectItems.push(
                <>
                    <ListGroup.Item className="d-flex justify-content-between align-items-start cursor"> 
                        <div className="ms-2 me-auto profile-button" style={{paddingLeft: '15px'}}>
                            {key}
                        </div>
                        <Badge style={{marginLeft: '10px'}} bg="success" pill>
                            {mostCorrectSorted[key]}
                        </Badge>
                    </ListGroup.Item>
                </>
            )
        } else {
            mostCorrectItems.push(
                <>
                    <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start cursor">
                        <div className="ms-2 me-auto profile-button">
                            {key}
                        </div>
                        <Badge style={{marginLeft: '10px'}} bg="success" pill>
                                {mostCorrectSorted[key]}
                        </Badge>
                    </ListGroup.Item>
                </>
            )
        }

        prevVal = mostCorrectSorted[key];
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

            </div>
        </>
    )
}

export default Standings;