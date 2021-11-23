import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getWeatherAsyncAction} from "../redux/asyncActions";


function WeatherBlock() {
    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.userReducer);
    const weatherInfo = useSelector(state => state.weatherReducer);

    useEffect(() => {
        if(userInfo.currentLocation !== ''){
           dispatch(getWeatherAsyncAction(userInfo.locations[userInfo.currentLocation].userCity));
        }
    }, [userInfo.currentLocation]);



    return (
        <>
            <h2>{weatherInfo?.weather?.data?.name}</h2>
            {weatherInfo?.weather?.data?.weather?.map((el)=>
                <div style={{backgroundImage: "url('http://openweathermap.org/img/wn/"+ el.icon + ".png')", backgroundPosition: "center", backgroundSize: "contain", backgroundRepeat: "no-repeat"}}>
                    {/*<img src={"http://openweathermap.org/img/wn/" + el.icon + ".png"} alt=""/>*/}
                    <p>{el.main}</p>
                    <p>{el.description}</p>
                </div>
            )}
            <>
                Temp: {weatherInfo?.weather?.data?.main?.temp}
                <br/>
                Humidity: {weatherInfo?.weather?.data?.main?.humidity}
                <br/>
                Wind speed: {weatherInfo?.weather?.data?.wind?.speed}
            </>
        </>
    );
}

export default WeatherBlock;