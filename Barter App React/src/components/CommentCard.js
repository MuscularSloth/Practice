import React from 'react'
import { Card } from 'react-bootstrap'
import { RiDeleteBin2Line } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCommentAsyncAction } from '../redux/asyncActions';

export default function CommentCard({singleComment, barterID}) {

    const dispatch = useDispatch();
    const userLoggedInfo = useSelector(state => state.userReducer)

    const handleDeleteCommet = () => dispatch(deleteCommentAsyncAction(barterID, singleComment.id, userLoggedInfo.userToken));


    return (
        <div>
             <Card className="mb-2">
                <Card.Body>
                    <Card.Title>
                        {singleComment.comment}
                    </Card.Title>
                    <Card.Text>
                        Author: {singleComment.author.username}
                    </Card.Text>
                    { userLoggedInfo.userID === singleComment.author.id &&
                        <Card.Footer>
                            <span style={{ cursor: "pointer" }} onClick={handleDeleteCommet}><RiDeleteBin2Line /> Delete</span>
                        </Card.Footer>
                    }
                </Card.Body>
            </Card>
        </div>
    )
}
