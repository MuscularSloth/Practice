import React, {useEffect, useState} from 'react';
import GetUserNameBlock from "./GetUserNameBlock";
import {useDispatch, useSelector} from "react-redux";
import GetUserCountryBlock from "./GetUserCountryBlock";
import GetUserCityBlock from "./GetUserCityBlock";
import {Button} from "@mui/material";
import {
    addLocationAction,
} from "../redux/actions";
import {useNavigate} from "react-router-dom";

function GetInfoPage(props) {



    const navigate = useNavigate();
    const userInfo = useSelector(state => state.userReducer);
    const dispatch = useDispatch();
    const [idAddingCity, setIdAddingCity] = useState(false);

    const handleSaveClick = () => {
        //sync location array and localstorage
        dispatch(addLocationAction());
        setIdAddingCity(false)
        navigate('/');
    }

    return (
        <div>
            {userInfo.userName === null ?
                <GetUserNameBlock /> :

                !idAddingCity ?
                 <Button variant="contained" size="large" onClick={()=>setIdAddingCity(true)}>Add new city</Button>
                :
                 <>
                    <GetUserCountryBlock />
                     {userInfo.selectedUserCountry && <GetUserCityBlock />}
                     {userInfo.selectedUserCountry && userInfo.selectedUserCity && <Button variant="contained" size="large" onClick={handleSaveClick}>Save</Button>}
                 </>
            }
        </div>
    );
}

export default GetInfoPage;