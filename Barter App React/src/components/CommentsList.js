import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Row, FormControl, Button } from 'react-bootstrap'
import CommentCard from './CommentCard';
import { addCommentAsyncAction } from '../redux/asyncActions';

export default function CommentsList({ commentsData, barterID }) {

    const [newComment, setNewComment] = useState('');

    const userLoggedInfo = useSelector(state => state.userReducer);
    const dispatch = useDispatch();

    const handleAddComment = () => {
        if(newComment){
           dispatch(addCommentAsyncAction(barterID, newComment, userLoggedInfo.userToken))
           setNewComment('')
        }
    }

    return (
        <div className="ms-5 me-4 mt-2">
            <Row className="mb-3">
                <FormControl
                    className="mb-2"
                    as="textarea"
                    value={newComment} 
                    onChange={ (e) => setNewComment(e.target.value) }
                />
                <Button variant="primary" disabled={!newComment} onClick={handleAddComment}>Submit</Button>
            </Row>
            {!!commentsData.length && commentsData.map((singleComment)=>(
                <CommentCard key={singleComment.id} barterID={barterID} singleComment={singleComment}/>
            )
            )}
        </div>
    )
}
