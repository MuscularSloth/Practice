import React, {useEffect, useState} from 'react';
import {Box, Button, TextField} from "@mui/material";
import {useDispatch} from "react-redux";
import {setUserNameAction} from "../redux/actions";

const GetUserNameBlock = () => {


    const [userName, setUserName] = useState('');
    const dispatch = useDispatch();

    const handleFormSubmit = (e) =>{
        e.preventDefault();
        dispatch(setUserNameAction(userName));
    }

    useEffect(()=>{

    }, [])

    return (
        <>
            <form onSubmit={handleFormSubmit}>
                <Box className='usernameblock' sx={{m: 2}}>
                    <TextField
                        id="userName"
                        label="User Name"
                        variant="outlined"
                        sx={{mr: 2}}
                        autoComplete="off"
                        required
                        value={userName}
                        onChange={(e)=>setUserName(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        size="large"
                        type="submit"
                    >
                            NEXT
                    </Button>
                </Box>
            </form>
        </>
    );

}

export default GetUserNameBlock;