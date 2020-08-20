import React,{useEffect} from 'react';

import './App.css';

import {BrowserRouter as Router,Route} from 'react-router-dom'
import HomePage from './containers/HomePage/home'
import Login from './containers/Login/login';
import SignUp from './containers/SignUp/signUp';
import PrivateRoute from './components/PrivateRoute';

import {useDispatch,useSelector} from 'react-redux'
import {isLoggedInUser} from './actions/index'

function App() {

const dispatch=useDispatch();
const auth=useSelector(state=>state.auths)

  useEffect(()=>{
    if(!auth.authenticated){
        dispatch(isLoggedInUser())
    }
},[])



  return (
    <div className="App">
     
    <Router>

       <PrivateRoute path='/' component={HomePage}/>  {/* only Logged in user can access this home route */}


        <Route path='/login' component={Login}/>
        <Route path='/signup' component={SignUp}/>
    </Router>


    </div>
  );
}

export default App;
