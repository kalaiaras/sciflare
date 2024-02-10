
import './App.css';
import Login from './componends/Login';
import Signup from './componends/Signup';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Nav from './componends/Nav';
import Datatable from './componends/Datatable';
import Logout from './componends/Logout';
import Update from './componends/Update';
import Privatecomp from './componends/Privatecomp';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <header className="App-header">
          <Routes>
            <Route element={<Privatecomp/>}>
            <Route path='/' element={<Datatable />}></Route>
            
            <Route path='/logout' element={<Logout />}></Route>
            <Route path='/update/:id' element={<Update />}></Route>
            <Route path='/profile' element={<h1>profile</h1>}></Route>
            
            </Route>
            <Route path='/login' element={<Login />}>Login</Route>
            <Route path='/signup' element={<Signup />}></Route>
          </Routes>


        </header>
      </BrowserRouter>
    </div>
  );
}

export default App;
