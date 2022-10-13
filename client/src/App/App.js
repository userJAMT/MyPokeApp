import './App.css';
import React from 'react';
import {Route} from 'react-router-dom';

// Componentes
import Landing from '../Pages/Landing/Landing.jsx';
import Home from '../Pages/Home/Home.jsx';
import Create from '../Pages/Create/Create.jsx';
import Details from '../Pages/Details/Details.jsx';
import NavBar from '../components/NavBar/NavBar.jsx';


function App() {
  return (
    <div className='App'>
      <Route exact path='/' component={Landing}/>
      <Route path='/home' children = {<><NavBar/><Home/></>}/>
      <Route path='/create' children = {<><NavBar/><Create/></>}/>
      <Route path='/details/:id' children = {<><NavBar/><Details/></>}/>
    </div>
  );
}

export default App;
