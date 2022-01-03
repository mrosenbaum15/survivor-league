import React, {useState} from 'react';
import { ButtonGroup, ButtonToolbar, Button, Form, Card, ListGroup} from 'react-bootstrap';
import './EnterPicks.css';
import * as NFLIcons from '../../teamIcons'

// API article https://medium.com/swlh/skip-lambda-save-data-to-dynamodb-directly-using-api-gateway-process-later-with-streams-dab2ceef9a9d
function EnterPicks() {
    const [isTeamSelected, setIsTeamSelected] = useState(false);
    const [currentPick, setCurrentPick] = useState("");
    const [activeButtonArr, setActiveButtonArr] = useState(Array(32).fill(null));


    // API - getMatchups
    let matchupsArr = [
        "Vikings (at Packers)", "Rams (at Ravens)", "Cowboys (vs Cardinals)", "Redskins (vs Eagles)", 
        "Chargers (vs Broncos)", "Texans (at Niners)", "Chiefs (at Bengals)", "Steelers (vs Browns)",
        "Cardinals (at Cowboys)", "Colts (vs Raiders)", "Saints (vs Panthers)", "Dolphins (at Titans)",
        "Buccaneers (at Jets)", "Panthers (at Saints)", "Packers (vs Vikings)", "Browns (at Steelers)",
        "Titans (vs Dolphins)", "Niners (vs Texans)", "Jets (vs Buccaneers)", "Jaguars (at Patriots)",
        "Bears (vs Giants)", "Seahawks (vs Lions)", "Raiders (at Colts)", "Broncos (at Chargers)",
        "Bengals (vs Chiefs)", "Ravens (vs Rams)", "Patriots (vs Jaguars)", "Bills (vs Falcons)",
        "Lions (at Seahawks)", "Falcons (at Bills)", "Giants (at Bears)", "Eagles (at Redskins)"
    ];

    const teamIcons = {"Cardinals": NFLIcons.Cardinals,"Falcons": NFLIcons.Falcons,"Ravens": NFLIcons.Ravens,"Bills": NFLIcons.Bills,"Panthers":NFLIcons.Panthers,
                   "Bears": NFLIcons.Bears,"Bengals": NFLIcons.Bengals,"Browns": NFLIcons.Browns,"Cowboys": NFLIcons.Cowboys,"Broncos": NFLIcons.Broncos,
                    "Lions": NFLIcons.Lions,"Packers": NFLIcons.Packers,"Texans": NFLIcons.Texans,"Colts": NFLIcons.Colts,"Jaguars": NFLIcons.Jaguars,
                    "Chiefs": NFLIcons.Chiefs,"Chargers": NFLIcons.Chargers,"Rams": NFLIcons.Rams,"Raiders": NFLIcons.Raiders,"Dolphins": NFLIcons.Dolphins,
                    "Vikings": NFLIcons.Vikings,"Patriots": NFLIcons.Patriots,"Saints": NFLIcons.Saints,"Giants": NFLIcons.Giants,"Jets": NFLIcons.Jets,
                    "Eagles": NFLIcons.Eagles,"Steelers": NFLIcons.Steelers,"Seahawks": NFLIcons.Seahawks,"Niners": NFLIcons.Niners,"Buccaneers": NFLIcons.Buccaneers,
                    "Titans": NFLIcons.Titans,"Redskins": NFLIcons.Redskins
    };

    if(matchupsArr.length) {
       matchupsArr = matchupsArr.sort();
    }

     let userPickedTeamsObj = {
        "Rams": true, "Browns": true, "Broncos": true, "Cowboys": true, "Buccaneers": true, "Steelers": true, "Cardinals": true, "Chiefs": true, "Colts": true, "Bills": true, "Titans": false, "Texans": false, "Dolphins": true, "Chargers": true, "Niners": true, "Eagles": true, "Patriots": true,
     }

    const numTotal = Object.keys(userPickedTeamsObj).length;
    var numCorrect = 0;
    var startStreak = 0;
    var streak = true;
    Object.keys(userPickedTeamsObj).map((team, i) => (
        (userPickedTeamsObj[team]) ? (numCorrect++, streak ? startStreak++ : null) : streak = false
    ));


    // API - current week (must write lambda function that writes user curr team into back of userPreviousTeams)
    // if userCurrTeam == "", then userCurrTeam = userPickedTeamsArr(lastElement)
    let userCurrTeam = "Jaguars";

    function getCurrIcon(team) {
        var NFLTeam = teamIcons[currTeam];
        return (
            <NFLTeam/>
        )
    }

    function handleTeamChosen(event, i) {
        console.log(event);
        const buttonText = event.target.innerText;
        if(buttonText === undefined) {
            setIsTeamSelected(false);
            console.log("UNDEFINED");
            return;
        }

        const currName = buttonText.split(' ')[1];
        console.log(i);
        let newActiveArr = new Array(32).fill(false);
        newActiveArr[i] = true;
        setActiveButtonArr(newActiveArr);
        console.log(newActiveArr);

        setIsTeamSelected(true);
        setCurrentPick(currName);
    }


    let arrButtons = [];
    let currTeam = "";
    for (let i = 0; i < matchupsArr.length; i++) { 
        currTeam = matchupsArr[i].split(' ')[0];
        var NFLTeam = teamIcons[currTeam];
        
        if(currTeam in userPickedTeamsObj) {
            arrButtons.push(<Button variant="outline-secondary" className="pick-select-button" disabled> <NFLTeam/> {matchupsArr[i]}</Button>)
        } else if (currTeam !== userCurrTeam) {
            arrButtons.push(<Button variant="outline-primary" className="pick-select-button" active={(activeButtonArr[i] == null) ? false : activeButtonArr[i]} onClick={(event)=>handleTeamChosen(event,i)}> <NFLTeam/> {matchupsArr[i]} </Button>)
        } else {
            arrButtons.push(<Button variant="outline-primary" className="pick-select-button" active={(activeButtonArr[i] == null) ? true : activeButtonArr[i]} onClick={(event)=>handleTeamChosen(event,i)}> <NFLTeam/> {matchupsArr[i]} </Button>)
        }

    }
    
    function handleSubmit(event) {
        event.preventDefault();
        console.log("Your pick is: "+ currentPick);

        // API - PUT - write to DynamoDB table entry - userCurrTeam
        // Refresh page, make sure week by week individual summary is updated and current team's button is active
    }

    return (
        <>
            <div className='main-section'>
                <div className='team-section'>
                    <Form onSubmit={handleSubmit}>
                        <ButtonToolbar aria-label="Toolbar with button groups">
                            <ButtonGroup className="me-2 team-group" aria-label="First group">
                                {arrButtons}
                                <Button type="submit" disabled={!isTeamSelected}> Submit </Button>
                            </ButtonGroup>
                        </ButtonToolbar>
                    </Form>
                </div>
                <div className='past-picks-section'>
                <Card className='past-picks-card'>
                    <Card.Header className='past-picks-header-1'>Pick History </Card.Header>
                    <Card.Header>Start Streak: {startStreak}</Card.Header>
                    <Card.Header>Total Correct: {numCorrect} of {numTotal}</Card.Header>
                        <ListGroup variant="flush">
                            {
                                Object.keys(userPickedTeamsObj).map((team, i) => (
                                    (userPickedTeamsObj[team]) ? 
                                        <ListGroup.Item className="modal-bg" style={{color: "green"}}>Week {i+1}: {team}  {React.createElement(teamIcons[team], {})}</ListGroup.Item> :
                                        <ListGroup.Item className="modal-bg" style={{color: "red"}}>Week {i+1}: {team}  {React.createElement(teamIcons[team], {})}</ListGroup.Item>
                                ))
                            }
                        </ListGroup>
                    </Card>
                </div>
            </div>
        </>
    )
}

export default EnterPicks;