import React, { useState, useEffect } from 'react'
import {Container, Row, Col, Form, FormControl, InputGroup, Button, Alert } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { addBarterAsyncAction } from '../redux/asyncActions';

export default function AddBarterForm() {

    const dispatch = useDispatch();

    const userLoggedInfo = useSelector(state => state.userReducer);

    const [barterData, setbarterData] = useState({})
    const [errorsHandler, seterrorsHandler] = useState({
        isWantlearnCorrect: null,
        isCanteachCorrect: null,
        isDescriptionCorrect: null,
    })

    const barterSendData = () => {
        seterrorsHandler({
            isWantlearnCorrect: !barterData.wantlearn ? false : true,
            isCanteachCorrect: !barterData.canteach ? false : true,
            isDescriptionCorrect: !barterData.description ? false : true,
        })
    }

    useEffect(() => {
        if(errorsHandler.isWantlearnCorrect && errorsHandler.isCanteachCorrect && errorsHandler.isDescriptionCorrect){
            dispatch(addBarterAsyncAction(barterData, userLoggedInfo.userToken));
            setbarterData({});
        }

    }, [errorsHandler])

    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <Form onSubmit={barterSendData}>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="addBarterFormLearn">I want learn</InputGroup.Text>
                                <FormControl
                                    type="text"
                                    placeholder=""
                                    aria-label="wantlearn"
                                    aria-describedby="addBarterFormLearn"
                                    value={barterData?.wantlearn ? barterData.wantlearn : ''}
                                    onChange={ (e) => setbarterData({...barterData, wantlearn: e.target.value}) }
                                />
                            </InputGroup>
                            <Alert show={errorsHandler?.isWantlearnCorrect === false} variant="danger">
                                Field can't be empty
                            </Alert>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="addBarterFormTeach">I can teach</InputGroup.Text>
                                <FormControl
                                    type="text"
                                    placeholder=""
                                    aria-label="canteach"
                                    aria-describedby="addBarterFormTeach"
                                    value={barterData?.canteach ? barterData.canteach : ''}
                                    onChange={ (e) => setbarterData({...barterData, canteach: e.target.value}) }
                                />
                            </InputGroup>
                            <Alert show={errorsHandler?.isCanteachCorrect === false} variant="danger">
                                Field can't be empty
                            </Alert>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="addBarterFormDescription">Description</InputGroup.Text>
                                <FormControl
                                    type="text"
                                    placeholder=""
                                    aria-label="description"
                                    aria-describedby="addBarterFormDescription"
                                    value={barterData?.description ? barterData.description : ''}
                                    onChange={ (e) => setbarterData({...barterData, description: e.target.value}) }
                                />
                            </InputGroup>
                            <Alert show={errorsHandler?.isDescriptionCorrect === false} variant="danger">
                                Description can't be empty
                            </Alert>
                            <Button variant="primary" onClick={barterSendData}>Submit</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
