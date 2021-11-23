import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Button, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {setCurrentLocationAction} from "../redux/actions";
import useLocalStorage from "react-use-localstorage";

function WeatherHeader() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.userReducer);
    const [currentLocation, setCurrentLocation] = useState(userInfo.currentLocation);
    const [userLocationsLocalStorage, setUserLocationsLocalStorage] = useLocalStorage('userlocations', '');

    const handleChangeCurrentLocation = (event) =>{
        console.log('handleChangeCurrentLocation >>  ', event.target.value)
        setCurrentLocation(event.target.value)
        navigate("/");
    }

    useEffect(() => {
        dispatch(setCurrentLocationAction(currentLocation))
    }, [currentLocation]);

    useEffect(() => {
        if(userInfo.locations.length > 0){
            setUserLocationsLocalStorage(JSON.stringify(userInfo.locations))
        }
    }, [userInfo.locations]);


    return (
        <div style={{display: "flex", justifyContent: "space-evenly"}}>

            <span style={{width: "100%"}}> Hello, {userInfo.userName ? userInfo.userName : 'guest'}!</span>

            <FormControl style={{width: "100%"}} sx={{m: 1}}>
                <InputLabel id="current-location-label">Current Location</InputLabel>
                <Select
                    labelId="current-location-label"
                    // id="demo-simple-select"
                    defaultValue = ""
                    value={currentLocation ? currentLocation : ''}
                    label="Current Location"
                    onChange={handleChangeCurrentLocation}
                >
                    {userInfo.locations.length > 0 && userInfo.locations.map((location, index)=>{
                            return <MenuItem key={index} value={index}>{location.userCity}({location.userCountry})</MenuItem>
                        }
                    )}
                </Select>
            </FormControl>

            <Button style={{flexShrink: "0"}} sx={{m: 1}} variant="contained" size="large" onClick={()=>navigate('/getinfo')}>Add new city</Button>
        </div>
    );
}

export default WeatherHeader;