import React from 'react';
import { Link } from "react-router-dom";
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../redux/actions';

const Headerpage = () => {

    const dispatch = useDispatch();

    const userLoggedInfo = useSelector(state => state.userReducer);

    function handleLogOut(){
        dispatch(logoutUser())
    }

    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <Nav
                        activeKey="/">
                            <Nav.Item>
                                <Link className="nav-link" to="/">Home</Link>
                            </Nav.Item>
                            {!userLoggedInfo?.isLogged ?
                            <>
                                <Nav.Item>
                                    <Link className="nav-link" to="/login">Login</Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Link className="nav-link" to="/registration">Registration</Link>
                                </Nav.Item>
                            </>
                            :
                            <>
                            <Nav.Item>
                                <span className="nav-link" >Hello, {userLoggedInfo?.userName}!  <a onClick={handleLogOut} href="#">Logout</a></span>
                            </Nav.Item>
                            </>
                            }
                        </Nav>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Headerpage;
