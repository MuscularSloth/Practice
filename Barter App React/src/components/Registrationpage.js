import React, { useState, useEffect } from 'react';
import {Container, Row, Col, Form, FormControl, InputGroup, Button, Alert, Card} from 'react-bootstrap'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import { useDispatch, useSelector } from 'react-redux';
import { registerUserAsyncAction } from '../redux/asyncActions';
import { Link } from 'react-router-dom';

const Registrationpage = () => {

    const [isDebugMode, setIsDebugMode] = useState(false);

    const dispatch = useDispatch();

    const userLoggedInfo = useSelector(state => state.userReducer);
    
    const [userData, setUserData] = useState([]);
    const [isDisabledRegistration, setisDisabledRegistration] = useState(true);
    const [isUserNameCorrect, setisUserNameCorrect] = useState(false);
    const [isPassCorrect, setisPassCorrect] = useState(false);

    function checkUserName(e){
        e.target.value.length > 0 ? setisUserNameCorrect(true) : setisUserNameCorrect(false);
        setUserData({...userData, name: e.target.value});
    }

    function checkPassword(e){
       e.target.value.length >= 6 ? setisPassCorrect(true) : setisPassCorrect(false);
       setUserData({...userData, pass: e.target.value}); 
    }

    function checkPasswordConfirm(e){
        setUserData({...userData, confirmPass: e.target.value});
    }

    function checkRegistrationPosibility(){
        if(isUserNameCorrect && isPassCorrect && userData.pass === userData.confirmPass) {
            setisDisabledRegistration(false)
        } else {
            setisDisabledRegistration(true)
        }
    }

    async function registerUser(){
        const userRegData = {
            'username': userData.name,
            'password': userData.pass
        }

        dispatch(registerUserAsyncAction(userRegData))
    }

   
    useEffect(() => {
        checkRegistrationPosibility();
    }, [userData]);


    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <h1 className="mb-5" >Registration Page</h1>
                        <h3 className="mb-5">
                            <span className="mr-5"> Debug Mode </span>
                            <BootstrapSwitchButton 
                                checked={isDebugMode} 
                                size="xs" 
                                onChange={() => setIsDebugMode(!isDebugMode)}
                                />
                        </h3>
                    </Col>
                </Row>

                {userLoggedInfo.isError &&
                <Row>
                    <Col>
                        <Card 
                        bg='danger'
                        text='white'
                        className="mb-5">
                            <Card.Body>
                                <Card.Title>
                                    {userLoggedInfo.errorMessage}
                                </Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>}

                {userLoggedInfo.isLogged ? 
                <Row>
                    <Col>You already logged in. Go to <Link to="/">Home Page</Link></Col>
                </Row>
                :
                <Row>
                    <Col>
                        <Form>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="regFormUsername">Username {isDebugMode ? userData.name : ''}</InputGroup.Text>
                                <FormControl
                                    type="text"
                                    placeholder=""
                                    aria-label="Username"
                                    aria-describedby="regFormUsername"
                                    value={userData?.name ? userData.name : ''}
                                    onChange={ checkUserName }
                                />
                            </InputGroup>
                            <Alert show={!isUserNameCorrect} variant="danger">
                                Username can't be empty
                            </Alert>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="regFormPassword">Password {isDebugMode ? userData.pass : ''}</InputGroup.Text>
                                <FormControl
                                    type="password"
                                    placeholder=""
                                    aria-label="Username"
                                    aria-describedby="regFormPassword"
                                    value={userData?.pass ? userData.pass : ''}
                                    onChange={ checkPassword }
                                />
                            </InputGroup>
                            <Alert show={!isPassCorrect} variant="danger">
                                Password must not be less than 6 characters
                            </Alert>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="regFormConfirmPassword">Confirm Password {isDebugMode ? userData.confirmPass : ''}</InputGroup.Text>
                                <FormControl
                                    type="password"
                                    placeholder=""
                                    aria-label="Username"
                                    aria-describedby="regFormConfirmPassword"
                                    value={userData?.confirmPass ? userData.confirmPass : ''}
                                    onChange={ checkPasswordConfirm }
                                />
                            </InputGroup>
                            <Alert show={!(userData.pass === userData.confirmPass)} variant="danger">
                                The Password and Confirm password fields must match
                            </Alert>
                            <Button variant="primary" disabled={isDisabledRegistration} onClick={registerUser}>Register</Button>
                        </Form>
                    </Col>
                </Row>
                }
            </Container>
        </div>
    );
}

export default Registrationpage;
