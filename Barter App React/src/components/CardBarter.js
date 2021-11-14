import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Card, Row, Col, FormControl } from 'react-bootstrap'
import { FiEdit3 } from 'react-icons/fi'
import { RiDeleteBin2Line } from 'react-icons/ri'
import { GiCancel, GiCheckMark } from 'react-icons/gi'
import { FaComments } from 'react-icons/fa'
import CommentsList from './CommentsList';
import { deleteBarterAsyncAction, saveBarterAsyncAction } from '../redux/asyncActions';



export default function CardBarter({barterInfo}) {

    
    const userLoggedInfo = useSelector(state => state.userReducer);

    const dispatch = useDispatch();

    const [isEditable, setIsEditable] = useState(false);
    const [barterData, setBarterData] = useState(barterInfo);
    const [isShowCommentsPart, setIsShowCommentsPart] = useState(false);  

    const showCommentsPart = () => setIsShowCommentsPart(!isShowCommentsPart);

    const activateEditing = () => setIsEditable(true);
    const deactivateEditing = () => setIsEditable(false);

    const handleDeleteBarter = () => {
        if (window.confirm('Are you sure?')) {
            dispatch(deleteBarterAsyncAction(barterData.id, userLoggedInfo.userToken))
        }
    } 

    const handleSaveBarter = () => {
        dispatch(saveBarterAsyncAction(barterData, userLoggedInfo.userToken));
        setIsEditable(false);
    };
    
    return (
        <div className="mb-2" >
            <Card>
                <Card.Body>
                    <Card.Title>
                        { isEditable 
                            ? <FormControl type="text" value={barterData.barter} onChange={ (e) => setBarterData({...barterData, barter: e.target.value }) } />
                            : barterData.barter
                        }
                    </Card.Title>
                    <Card.Text as="div">
                        <Row className="mb-4">
                            <Col>
                                I want to learn
                                <br />
                                { isEditable 
                                    ? <FormControl type="text" value={barterData.learn} onChange={ (e) => setBarterData({...barterData, learn: e.target.value }) } />
                                    : barterData.learn
                                }
                            </Col>
                            <Col>
                                I can teach
                                <br />
                                { isEditable 
                                    ? <FormControl type="text" value={barterData.teach} onChange={ (e) => setBarterData({...barterData, teach: e.target.value }) } />
                                    : barterData.teach
                                }
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <span style={{ cursor: "pointer" }} className="me-5" onClick={showCommentsPart}>
                                    <FaComments className="me-2" /> 
                                    { isShowCommentsPart 
                                        ? <>Hide Comments</>
                                        : <>Show Comments ({barterData.comments?.length})</>
                                    }
                                </span>
                            </Col>

                            {userLoggedInfo.isLogged && barterData.author.id === userLoggedInfo.userID ? 
                            
                            !isEditable 
                            
                            ?   <Col>
                                    <span style={{ cursor: "pointer" }} className="me-5" onClick={activateEditing}><FiEdit3 /> Edit</span>
                                    <span style={{ cursor: "pointer" }} onClick={handleDeleteBarter}><RiDeleteBin2Line /> Delete</span>
                                </Col>

                            :   <Col>
                                    <span style={{ cursor: "pointer" }} className="me-5" onClick={handleSaveBarter}><GiCheckMark /> Save</span>
                                    <span style={{ cursor: "pointer" }} onClick={deactivateEditing}><GiCancel /> Cancel</span>
                                </Col>

                            : ''    
                            }
                        </Row>
                    </Card.Text>
                </Card.Body>
            </Card>
            { !!isShowCommentsPart &&
                <CommentsList commentsData={barterInfo.comments} barterID={barterInfo.id} />
            }
        </div>
    )
}
