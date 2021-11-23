import React, {useEffect} from 'react';
import {Autocomplete, Box, TextField} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {setUserCountryAction} from "../redux/actions";
import {getCountriesAsyncAction} from "../redux/asyncActions";

const GetUserCountryBlock = () => {

    const dispatch = useDispatch();

    const countriesList = useSelector(state => state.countriesReducer);

    useEffect(() => {
        dispatch(getCountriesAsyncAction())
    }, []);

    const handleOnChangeCountry = (event, country) => {
        dispatch(setUserCountryAction(country.name));
    }

    return (
        <>
            <Box className='usercountryblock' sx={{m: 2}}>
                <Autocomplete
                    // disablePortal
                    // id="usercountry"
                    //inputValue={userCountry}
                    onChange={handleOnChangeCountry}
                    options={countriesList.countries}
                    sx={{ width: 300 }}
                    autoHighlight
                    getOptionLabel={(option) => option.name}
                    renderOption={(props, option) => (
                        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                            <img
                                loading="lazy"
                                width="20"
                                src={option.flag}
                                srcSet={option.flag}
                                alt=""
                            />
                            {option.name}
                        </Box>
                    )}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Choose a country"
                            // onChange={handleOnChangeCountry}
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

export default GetUserCountryBlock;