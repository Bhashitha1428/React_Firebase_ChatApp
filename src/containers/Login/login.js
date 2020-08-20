import React,{useState,useEffect} from 'react'
import Layout from '../../components/Layout/layout'
import Card from '../../components/UI/Card/Card'
import {useDispatch,useSelector} from 'react-redux'

import {login, isLoggedInUser} from '../../actions'


import './login.css'
import { Redirect } from 'react-router-dom'



const Login=()=>{
 

const[email,setEmail]=useState('');
const[password,setPassword]=useState('');
const dispatch=useDispatch();
const auth=useSelector(state=>state.auths)

// useEffect(()=>{
//     if(!auth.authenticated){
//         dispatch(isLoggedInUser())
//     }
// },[])


const userLogin=(e)=>{
    e.preventDefault();
    console.log("KKKK")
    console.log(auth.authenticated)
    console.log()
    if(email==""){
        alert("Email is required");
        return
    }
    if(password==""){
        alert("Password is required")
    }

    dispatch(login({email,password}));

}

if(auth.authenticated){
    // console.log("KKKK")
    console.log(auth.authenticated)
    return <Redirect to={`/`} />
}

    return (
        
        <Layout>
        <div className='loginContainer'>
            <Card>
                <form onSubmit={userLogin}>
            <input
                type='text'
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                placeholder="Email"
           />

            <input
                type='text'
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                placeholder="Password"
           />
           <div>
               <button>Login</button>
           </div>

            </form>
            </Card>
        </div>
        </Layout>
    )
}

export default Login
