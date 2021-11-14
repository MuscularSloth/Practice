import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../redux/actions';
import {Container, Row, Col, Card, Form, FormControl, InputGroup, Alert, Button } from 'react-bootstrap'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import { Link } from "react-router-dom";
import { loginUserAsyncAction } from '../redux/asyncActions';

const Loginpage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isDebugMode, setIsDebugMode] = useState(false);


    const [userData, setUserData] = useState([]);
    const [isUserNameCorrect, setisUserNameCorrect] = useState(false);
    const [isPassCorrect, setisPassCorrect] = useState(false);
    const [isDisabledLogin, setisDisabledLogin] = useState(true);

    const userLoggedInfo = useSelector(state => state.userReducer);

    function checkUserName(e){
        e.target.value.length > 0 ? setisUserNameCorrect(true) : setisUserNameCorrect(false);
        setUserData({...userData, name: e.target.value});
    }

    function checkPassword(e){
       e.target.value.length >= 6 ? setisPassCorrect(true) : setisPassCorrect(false);
       setUserData({...userData, pass: e.target.value}); 
    }

    function checkLoginPosibility(){
        if(isUserNameCorrect && isPassCorrect) {
            setisDisabledLogin(false)
        } else {
            setisDisabledLogin(true)
        }
    }


    function handleLoginUser(){
        const userLoginData = {
            'username': userData.name,
            'password': userData.pass
        }

        dispatch(loginUserAsyncAction(userLoginData))
    }
    
    function handleLogOut(){
        dispatch(logoutUser())
    }

    useEffect(() => {
        checkLoginPosibility();
    }, [userData]);

    useEffect(() => {
        if(userLoggedInfo.isLogged){
            navigate('/');
        }
    }, [userLoggedInfo]);

    


    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <h1 className="mb-5" >Login Page</h1>
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
                            className="mb-5"
                        >
                            <Card.Body>
                                <Card.Title>
                                    {userLoggedInfo.errorMessage}
                                </Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>}


                {!userLoggedInfo?.isLogged ? 
                <>                    
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
                                
                                <Button variant="primary" disabled={isDisabledLogin} onClick={handleLoginUser}>Login</Button>
                            </Form>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Link to="/registration">Registration</Link>
                        </Col>
                    </Row>
                </>:
                <>
                   <Row>
                        <Col>
                            You have already logged in. <a onClick={handleLogOut} href="#">Logout</a>
                        </Col>
                    </Row>
                </>
                }
            </Container>
            
        </div>
    );
}

export default Loginpage;
