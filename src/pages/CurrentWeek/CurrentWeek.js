import React from 'react';
import {Spinner} from 'react-bootstrap';
import './CurrentWeek.css';

function CurrentWeek() {
    return (
        <>
            <div className='diff-section'>
                <div className='spinner-section'>
                    <p>
                        Come back once games have kicked off...
                    </p>
                    <div className='spinner'>
                        <Spinner animation="grow" />
                    </div>
                </div>
            </div> 
        </>
    )
}

export default CurrentWeek;