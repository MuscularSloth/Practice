import React, {useEffect} from 'react';
import WeatherBlock from "./WeatherBlock";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";


function HomePage() {


    const userInfo = useSelector(state => state.userReducer);
    const navigate = useNavigate();


    useEffect(()=>{
        if(!userInfo.userName || userInfo.userName === null || userInfo.locations.length < 1){
            navigate("/getinfo");
        }
    }, [userInfo.locations])


    return (
        <div>
            <WeatherBlock />
        </div>
    );
}

export default HomePage;