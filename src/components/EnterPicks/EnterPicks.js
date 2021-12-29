import React, {useState} from 'react';
import { Alert, ButtonGroup, ButtonToolbar, Button, Form} from 'react-bootstrap';
import './EnterPicks.css';
import * as NFLIcons from '../../teamIcons'

// API article https://medium.com/swlh/skip-lambda-save-data-to-dynamodb-directly-using-api-gateway-process-later-with-streams-dab2ceef9a9d
function EnterPicks() {
    const [isTeamSelected, setIsTeamSelected] = useState(false);
    const [currentPick, setCurrentPick] = useState("");
    const [activeButtonArr, setActiveButtonArr] = useState(Array(32).fill(null));


    // API - getMatchups
    let matchupsArr = [
        "Vikings (vs Rams)", "Rams (vs Vikings)", "Cowboys (vs Redksins)", "Redskins (vs Cowboys)", 
        "Chargers (vs Texans)", "Texans (vs Chargers)", "Chiefs (vs Steelers)", "Steelers (vs Chiefs)",
        "Cardinals (vs Colts)", "Colts (vs Cardinals)", "Saints (vs Dolphins)", "Dolphins (vs Saints)",
        "Buccaneers (vs Panthers)", "Panthers (vs Buccaneers)", "Packers (vs Browns)", "Browns (vs Packers)",
        "Titans (vs Niners)", "Niners (vs Titans)", "Jets (vs Jaguars)", "Jaguars (vs Jets)",
        "Bears (vs Seahwawks)", "Seahawks (vs Bears)", "Raiders (vs Broncos)", "Broncos (vs Raiders)",
        "Bengals (vs Ravens)", "Ravens (vs Bengals)", "Patriots (vs Bills)", "Bills (vs Patriots)",
        "Lions (vs Falcons)", "Falcons (vs Lions)", "Giants (vs Eagles)", "Eagles (vs Giants)"
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

    // API - user (teams selected)
    let userPickedTeamsArr = [
        "Vikings", "Chiefs", "Cowboys", "Eagles", "Chargers", "Buccaneers", "Bills"
    ];

    // API - current week (must write lambda function that writes user curr team into back of userPreviousTeams)
    // if userCurrTeam == "", then userCurrTeam = userPickedTeamsArr(lastElement)
    let userCurrTeam = "Niners";

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
        
        if(userPickedTeamsArr.indexOf(currTeam) > -1) {
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
    )
}

export default EnterPicks;