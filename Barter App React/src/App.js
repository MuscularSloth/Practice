import './App.css';
import { Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Headerpage from './components/HeaderPage';
import Homepage from './components/Homepage';
import Loginpage from './components/Loginpage';
import Registrationpage from './components/Registrationpage';

function App() {
  return (
    
      <div className="App">
        <Headerpage />

        <div clas="content">
          
          <Routes>
            <Route path ="/" element={<Homepage />} />
            <Route path ="/login" element={<Loginpage />} />
            <Route path ="/registration" element={<Registrationpage />} />
          </Routes>
          
        </div>

      </div>
    
  );
}

export default App;
