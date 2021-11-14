import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {Container, Row, Col, Button, Spinner } from 'react-bootstrap'
import AddBarterForm from './AddBarterForm';
import BartersList from './BartersList';
import { getBarters, reloginUserAsyncAction } from '../redux/asyncActions';

const Homepage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userLoggedInfo = useSelector(state => state.userReducer);
    const isBartersLoading = useSelector(state => state.barterReducer.isLoading);

    const [isShowAddingForm, setIsShowAddingForm] = useState(false);


    const handleGetAllBarters = () => dispatch(getBarters());
    const checkIfUserLoggedBefore = () => dispatch(reloginUserAsyncAction())
    

    useEffect(()=>{
        handleGetAllBarters();
        if(!userLoggedInfo.isLogged){
            checkIfUserLoggedBefore();
        }
    },[])


    const showAddingBarterForm = () =>{
        if(userLoggedInfo.isLogged){
            setIsShowAddingForm(true);
        }else{
            navigate('/login')
        }
    }

    return (
        <div>
             <Container>
                <Row>
                    <Col className="mb-5">
                        <Button variant="primary" onClick={showAddingBarterForm}>Add Barter</Button>
                    </Col>
                </Row>
            </Container>

            {isShowAddingForm && userLoggedInfo.isLogged &&
            <>
                <AddBarterForm />
            </>
            }

            <Container>
                <Row>
                    <Col>
                        <h1 className="mb-5" >Home Page</h1>
                    </Col>
                </Row>
                
            </Container>


            <Container>
                <Row>
                    <Col>
                       {isBartersLoading ? <Spinner animation="grow" /> :  <BartersList/>}
                    </Col>
                </Row>
                
            </Container>
            
        </div>
    );
}

export default Homepage;
