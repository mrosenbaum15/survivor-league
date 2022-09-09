import React from 'react';
import { Card } from 'react-bootstrap';
import './PastPicksCard.css'
import teamIcons from './../../utils/teamIcons';

function PastPicksCard({
    stats,
    picks
}) {

    
    return (
        <>
            <div className='past-picks-section'>
                <Card.Header className='past-picks-header-1'>Pick History </Card.Header>
                <Card.Header className='past-picks-header-2'>Start Streak: {stats['start_streak']}</Card.Header>
                <Card.Header className='past-picks-header-2'>Total Correct: {stats['total_correct']}</Card.Header>
                <p className='breaker'/>
                {

                    picks.map((team, i) => {
                        let currTeam =  Object.keys(team)[0];
                        let result = Object.values(team)[0];
                        if(currTeam.includes("Team")) {
                            return (
                                    <Card.Header key={i} className="modal-bg past-picks-list-group-items" style={{color: "blue"}}>Week {i+1}: </Card.Header>
                                );
                        } else if(result === "") {
                            return (
                                    <Card.Header key={i} className="modal-bg past-picks-list-group-items" style={{color: "blue"}}>Week {i+1}: {React.createElement(teamIcons[currTeam], {})} </Card.Header>
                            );
                        } else if(result) {
                            return (
                                    <Card.Header key={i} className="modal-bg past-picks-list-group-items" style={{color: "green"}}>Week {i+1}: {React.createElement(teamIcons[currTeam], {})} </Card.Header>
                            );
                        } else {
                            return (
                                    <Card.Header key={i} className="modal-bg past-picks-list-group-items" style={{color: "red"}}>Week {i+1}: {React.createElement(teamIcons[currTeam], {})} </Card.Header>
                            );
                        }
                    })
                }
            </div>
        </>       
    );

}

export default PastPicksCard;