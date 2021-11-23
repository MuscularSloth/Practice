import './App.css';
import React, {useEffect} from "react";
import { Route, Routes } from 'react-router-dom'
import WeatherHeader from "./components/WeatherHeader";
import {Box} from "@mui/material";
import GetInfoPage from "./components/GetInfoPage";
import HomePage from "./components/HomePage";
import {addLocationFormStorageAction, setUserNameAction} from "./redux/actions";
import useLocalStorage from "react-use-localstorage";
import {useDispatch} from "react-redux";

function App() {

  const dispatch = useDispatch();
  const [userNameLocalStorage, setUserNameLocalStorage] = useLocalStorage('username', '');
  const [userLocationsLocalStorage, setUserLocationsLocalStorage] = useLocalStorage('userlocations', '');

  useEffect(()=>{
    if(userNameLocalStorage && userNameLocalStorage!==''){
      dispatch(setUserNameAction(userNameLocalStorage));
    }
    if(userLocationsLocalStorage && userLocationsLocalStorage !== ''){
      dispatch(addLocationFormStorageAction(JSON.parse(userLocationsLocalStorage)));
    }
  }, [])

  return (
    <div className="App">
      <Box sx={{display: 'flex', flexDirection: "column", height: "100vh"}}>
        <WeatherHeader />
        <Box sx={{ display: 'flex', alignItems: "center", justifyContent: "center", height: "100%"}}>
          <Routes>
            <Route path ="/" element={<HomePage />} />
            <Route path ="/getinfo" element={<GetInfoPage />} />
          </Routes>
        </Box>
      </Box>
    </div>
  );
}

export default App;
