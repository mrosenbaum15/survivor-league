import React, {useEffect, useState, useContext} from 'react';
import axios from 'axios';
import {Spinner, Pagination, Table } from 'react-bootstrap';
import './CurrentWeek.css';
import { AccountContext } from './../../components/UserPool/Account';
import CurrentWeekNum from './../../utils/CurrentWeekNum';
import PickEligibility from './../../utils/PickEligibility';
import GetTargetDate from '../../utils/GetTargetDate';
import teamIcons from '../../utils/teamIcons';

function CurrentWeek() {
    const { getSession } = useContext(AccountContext);
    const [newSession, setNewSession] = useState(undefined);

    const [activePage, setActivePage] = useState(CurrentWeekNum());
    const [weekIsAvailable, setWeekIsAvailable] = useState(false);
    const [targetDate, setTargetDate] = useState(undefined);

    const [selections, setSelections] = useState({
        'team': '',
        'users': [],
        'count': 0
    });

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    // {
    //     'team': 'Ravens',
    //     'users': [],
    //     'count': 3
    // }
    

    useEffect(() => {
        getSession(setNewSession)
          .then((session) => {
            console.log('Session Activated');
          })
          .catch((err) => {
            console.log('Session: ', err);
          });
        
      }, []);

    function sortPicks(picks) {
        let teamToUser = {};
        let sortedPicks = [];

        let currVal; let currTeam; let currUser;
        for(let i = 0; i < picks.length; i++) {
            console.log(picks);
            currVal = picks[i];
            currTeam = Object.keys(Object.values(currVal)[0])[0];
            currUser = Object.keys(currVal)[0];

            // this is for adding a section for users who did not pick
            if(currTeam.includes('Team')) currTeam = 'N/A'

            if(teamToUser[currTeam]) teamToUser[currTeam].push(currUser)
            else teamToUser[currTeam] = [currUser]
        }


        let currLength;
        
        Object.keys(teamToUser).map((team, i) => {
            currLength = teamToUser[team].length;

            if(sortedPicks.length < 1) {
                sortedPicks = [[team, currLength,teamToUser[team]]];
            }

            for(let j = 1; j <= i; j++) {
                if (team === 'N/A') {
                    sortedPicks.push([team, currLength,teamToUser[team]]);
                    break;
                }
                else if(currLength > sortedPicks[j-1][1] || sortedPicks[j-1][0] === 'N/A') {
                    sortedPicks.splice(j-1, 0, [team, currLength,teamToUser[team]]);
                    break;
                } else if(j === i) {
                    sortedPicks.push([team, currLength,teamToUser[team]]);
                }
            }

        });
        setSelections(sortedPicks);
    }

    function getAllPicks(weekNum) {
        if(PickEligibility(weekNum, (weekNum !== 16) ? 'normal' : 'normal_christmas')) {
            alert('Games will be available after 12pm CST kickoff');
            return;
        }

        axios.get('https://khvuxdskc6.execute-api.us-east-2.amazonaws.com/prod/all-users', {
            headers: {
                Authorization: newSession['idToken']['jwtToken'],
                'Content-Type': 'application/json',
            },
            params: {'week_num': weekNum}
        }).then((response) => {
            if('access_denied' in response['data']) setWeekIsAvailable(false)
            else sortPicks(response['data']);
        }).catch((error) => {
            console.log(error); 
            alert('Unable to get picks for this week. Refresh the page and try again.');
        });
    }      

    useEffect(() => {
        let nextAvailability = !PickEligibility(activePage, (activePage !== 16) ? 'normal' : 'normal_christmas');
        setWeekIsAvailable(nextAvailability);
        setTargetDate(GetTargetDate(activePage, (activePage !== 16) ? 'normal' : 'normal_christmas'));

        if(newSession !== undefined && nextAvailability) {
            getAllPicks(activePage);
        }
    },[newSession, activePage]);

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

    if(!weekIsAvailable) {
        return (
            <>
                <div className='current-week-section'>
                    <div className='spinner-section'>
                        <p>
                           {
                              targetDate 
                                ? 'Come back once games have kicked off at 12pm CST on ' + monthNames[targetDate.getMonth()] + ' ' + targetDate.getDate()
                                : 'Come back once games have kicked off at 12pm'
                           }
                        </p>
                        <div className='spinner'>
                            <Spinner animation='grow' />
                        </div>
                    </div>

                </div>   
                <Pagination className='pagination-current-week'>{items}</Pagination>
          
            </>
        )
    }


    return (
        <>
            <div className='current-week-section'>
                <Table size='sm' striped='columns' bordered hover className='current-week-table'>
                    <thead>
                        <tr>
                            <th># Picks</th>
                            <th>Team</th>
                            <th>Users</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            selections && selections.length
                                ? Object.keys(selections).map((val, i) => {
                                    if(selections[val][0] === 'N/A') {
                                        return (
                                            <tr>
                                                <td className='current-week-table-td'> {selections[val][1]}</td>
                                                <td className='current-week-table-td'> - </td>
                                                <td className='current-week-table-td'>
                                                    {
                                                        selections[val][2]
                                                        ? selections[val][2].join(', ')
                                                        : ''
                                                    }
                                                </td>
                                            </tr>
                                        )
                                    }

                                    let NFLTeam = teamIcons[selections[val][0]];
                                    return (
                                        <tr>
                                            <td className='current-week-table-td'> {selections[val][1]}</td>
                                            <td className='current-week-table-td'> <NFLTeam/> </td>
                                            <td className='current-week-table-td'>
                                                {
                                                    selections[val][2]
                                                    ? selections[val][2].join(', ')
                                                    : ''
                                                }
                                            </td>
                                        </tr>
                                    )
                                })

                                : <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        }
                    </tbody>
                </Table>
            </div>   
            <Pagination className='pagination-current-week'>{items}</Pagination>
        </>
    )
}

export default CurrentWeek;