import React from 'react';
import { Modal, ListGroup, Spinner } from 'react-bootstrap';
import './UserInfoModal.css'
import teamIcons from './../../utils/teamIcons';

function UserInfoModal({
    fullUserInfo,
    showModal,
    setShowModal,
    showSpinnerInModal,
    setShowSpinnerInModal,
    setFullUserInfo
}) {

    
    return (
        <>
            <Modal key='user-modal' className='standings-modal-section' show={showModal} onHide={()=>{setShowModal(false); setShowSpinnerInModal(false); setFullUserInfo(undefined)}}>
                    <Modal.Header key='modal-header' closeButton>
                        <Modal.Title key='modal-title'>
                            {
                                !showSpinnerInModal && fullUserInfo
                                    ? fullUserInfo["username"]
                                    : ""
                            }
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {
                            !showSpinnerInModal && fullUserInfo
                                ? 
                                    <ListGroup key='modal-lg'>
                                        <ListGroup.Item key={'fullname'} >Name: {fullUserInfo["fullname"]} </ListGroup.Item>
                                        <ListGroup.Item key={'start'} >Start streak: {fullUserInfo["start_streak"]} </ListGroup.Item>
                                        <ListGroup.Item key={'total'} >Total correct: {fullUserInfo["start_streak"]}</ListGroup.Item>
                                        <ListGroup.Item key={'alive'} >Is start streak alive? {fullUserInfo["is_start_streak_alive"] ? "Yes" : "No"}  </ListGroup.Item>
                                        
                                        <ListGroup.Item key={'selected'} > Teams selected:
                                            <ul key='modal-ul' className='no-bullet-list'>
                                            {
                                               fullUserInfo["user_picked_teams"].map((val, i) => {
                                                    console.log(val);
                                                    if(Object.keys(val)[0].includes("Team")) return (<li key={i+'-li'}> Week {i+1}: None </li>)
                                                    let CurrIcon = teamIcons[Object.keys(val)[0]];

                                                    return (
                                                        <li key={i+'-li'}>
                                                            Week {i+1}: <CurrIcon/>
                                                        </li>
                                                    )
                                                })
                                            } 
                                            </ul>
                                        </ListGroup.Item>
                                    </ListGroup>
                                : 
                                    <div key='spin-div' className='user-info-spinner'>
                                        <Spinner animation="border" role="status"/>
                                    </div>
                                    
                        }
                    </Modal.Body>
            </Modal>   
        </>       
    );

}

export default UserInfoModal;