import React, {useEffect, useState, useContext} from 'react';
import {Card, ListGroup} from 'react-bootstrap';
import './Rules.css';
import { AccountContext } from './../../components/UserPool/Account';

function Rules() {
    const { authenticate, getSession, logout } = useContext(AccountContext);
    const [newSession, setNewSession] = useState(undefined);

    useEffect(() => {
        getSession(setNewSession)
          .then((session) => {
            console.log('Session Activated');
          })
          .catch((err) => {
            console.log('Session: ', err);
          });
        
      }, []);

    return (
        <>
            <div className='rules-main-section'>
                <div className='individual-rule-card-section'>
                <Card style={{ height: '22rem', width: '18rem' }}>
                    <Card.Header><b>Entry Fee</b></Card.Header>
                            <ListGroup variant="flush">
                             <ListGroup.Item>A. Venmo <span className='money'> $25 </span> to <b>@mrosenbaum15</b> </ListGroup.Item>
                             <ListGroup.Item>B. Pay in Beer</ListGroup.Item>
                             <ListGroup.Item>Must pay before kickoff of Sunday early afternoon games for Week 1</ListGroup.Item>
                        </ListGroup>
                    </Card>
                </div>
                
                <div className='individual-rule-card-section'>
                    <Card style={{ height: '22rem', width: '18rem' }}>
                        <Card.Header><b>Payouts</b></Card.Header>
                            <ListGroup variant="flush">
                             <ListGroup.Item>53% to longest start streak</ListGroup.Item>
                             <ListGroup.Item>25% to most correct in total</ListGroup.Item>
                             <ListGroup.Item>11% to second longest start streak</ListGroup.Item>
                             <ListGroup.Item>11% to second most correct in totalk</ListGroup.Item>
                             <ListGroup.Item>Payouts in each tier are split for ties (if two people tie for first, they will split the pot for the top two tiers)</ListGroup.Item>
                        </ListGroup>
                    </Card>
                </div>

                <div className='individual-rule-card-section'>
                <Card style={{ height: '22rem', width: '18rem' }}>
                    <Card.Header><b>Picking</b></Card.Header>
                            <ListGroup variant="flush">
                             <ListGroup.Item>Deadline: 12pm CST on Sundays</ListGroup.Item>
                             <ListGroup.Item>Thursday Night Football games lock at 7:20pm CST on Thursdays</ListGroup.Item>
                             <ListGroup.Item>London games lock at 8:30am CST on Sundays</ListGroup.Item>
                             <ListGroup.Item>Picks made by others will become viewable at 12pm CST on Sundays</ListGroup.Item>
                        </ListGroup>
                    </Card>
                </div>    

                <div className='individual-rule-card-section'>
                <Card style={{ height: '22rem', width: '18rem' }}>
                        <Card.Header><b>Results</b></Card.Header>
                            <ListGroup variant="flush">
                            <ListGroup.Item>A correct pick occurs ONLY when a team wins the game</ListGroup.Item>
                             <ListGroup.Item>A tie results in an incorrect pick</ListGroup.Item>
                             <ListGroup.Item>If the last undefeated teams all lose in the same week, those teams will split the first place payouts for longest start streak</ListGroup.Item>
                        </ListGroup>
                    </Card>
                </div>                            
                    
            </div> 
        </>
    )
}

export default Rules;