import React from 'react';
import { OverlayTrigger, Button, Tooltip } from 'react-bootstrap';
import { Alarm } from 'react-bootstrap-icons';
import GetTargetDate from '../../utils/GetTargetDate';
import './DeadlineTooltip.css';

function DeadlineTooltip({
    weekNum
}) {
    const monthNames = [
                        'January', 'February', 'March', 'April', 'May', 'June',
                        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    let deadline = (weekNum !== 16) ? 'normal' : 'normal_christmas';
    let dow = (weekNum !== 16) ? 'Sunday' : 'Saturday'

    let tar = GetTargetDate(weekNum, deadline);

    return (
        <>
            <div className='deadline-tooltip-section'>
                <OverlayTrigger
                    placement='bottom'
                    overlay={
                        <Tooltip id='button-tooltip-2'>
                            The deadline to submit a pick is {monthNames[tar.getMonth()]} {tar.getDate()} at 12pm CST.
                            If a game is being played before {dow} at 12, the pick must be submitted before the game's kickoff.
                        </Tooltip>}
                    >
                    {({ ref, ...triggerHandler }) => (
                        <Button
                        variant='light'
                        {...triggerHandler}
                        className='d-inline-flex align-items-center tooltip-outline'
                        >
                        <Alarm className='deadline-tooltip-icon' />
                        <span className='deadline-tooltip-display' ref={ref}>Weekly Deadline - {monthNames[tar.getMonth()]} {tar.getDate()}</span>
                        </Button>
                    )}
                </OverlayTrigger>
            </div>
        </>       
    );

}

export default DeadlineTooltip;