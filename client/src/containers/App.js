import './App.css';
import React from 'react';
import {Route} from 'react-router-dom';

// Componentes
import Landing from '../components/Landing/Landing.jsx';
import Home from '../components/Home/Home.jsx';
import Create from '../components/Create/Create.jsx';
import Details from '../components/Details/Details.jsx';
import NavBar from '../components/NavBar/NavBar.jsx';


function App() {
  return (
    <div className="App">
      <Route exact path='/' component={Landing}/>
      <Route exact path='/home' children = {<><NavBar/><Home/></>}/>
      <Route exact path='/create' children = {<><NavBar/><Create/></>}/>
      <Route exact path='/details/:id' children = {<><NavBar/><Details/></>}/>
    </div>
  );
}

export default App;
