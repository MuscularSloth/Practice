import React, {useEffect} from 'react';
import {Autocomplete, Box, TextField} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {setUserCityAction} from "../redux/actions";
import {getCitiesAsyncAction} from "../redux/asyncActions";

const GetUserCityBlock = () => {

    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.userReducer);
    const citiesList = useSelector(state => state.citiesReducer);

    useEffect(() => {
        if(userInfo.selectedUserCountry){
            dispatch(getCitiesAsyncAction(userInfo.selectedUserCountry))
        }
    }, [userInfo.selectedUserCountry]);

    const handleOnChangeCity = (event, city) => {
        dispatch(setUserCityAction(city));
    }

    return (
        <>
            <Box className='usercountryblock' sx={{m: 2}}>
                <Autocomplete
                    // disablePortal
                    // id="usercountry"
                    //inputValue={userCountry}
                    onChange={handleOnChangeCity}
                    options={citiesList.cities}
                    sx={{ width: 300 }}
                    autoHighlight
                    getOptionLabel={(option) => option}
                    renderOption={(props, option) => (
                        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                           {option}
                        </Box>
                    )}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Choose a city"
                            // onChange={handleOnChangeCity}
                            inputProps={{
                                ...params.inputProps,
                                //autoComplete: 'new-password', // disable autocomplete and autofill
                            }}
                        />
                    )}
                />
            </Box>
        </>
    );

}

export default GetUserCityBlock;