import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './Component/Login';
import Navigation from './Component/Navigation';
import SignUp from './Component/SignUp';
import Moviedetail from './Component/Moviedetail';
import FURules from './Component/FURules';
function App() {
  return (
    <div className="App">
       <Navigation/>
       <Routes>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<SignUp/>}></Route>
        <Route path='/rule' element={<FURules/>}></Route>
        <Route path='/detail' element={<Moviedetail/>}></Route>
       </Routes>
    </div>
  );
}

export default App;
