import React,{useState} from 'react'
import Layout from '../../components/Layout/layout'
import Card from '../../components/UI/Card/Card'

import {signup} from '../../actions'
import {useDispatch,useSelector} from 'react-redux'
import {Redirect}from 'react-router-dom'

import './signUp.css'

const SignUp=()=> {

const [firstName,setFirstName]=useState('');
const [lastName,setLastName]=useState('');
const [email,setEmail]=useState('');
const [password,setPassword]=useState('');
const dispatch=useDispatch();
const auth=useSelector(state=>state.auths)


const registerUser=(e)=>{
    e.preventDefault();
   const user={
       firstName,lastName,email,password
   } 
   dispatch(signup(user))
}

if(auth.authenticated){
    // console.log("KKKK")
    console.log(auth.authenticated)
    return <Redirect to={`/`} />
}


    return (
        <Layout>
        <div className='registerContainer  '>
          <Card>
              <form onSubmit={registerUser}>
                  <h3>Sign up</h3>
                 
            <input
                type='text'
                value={firstName}
                onChange={(e)=>setFirstName(e.target.value)}
                placeholder="First Name"
            />

            <input
                type='text'
                value={lastName}
                onChange={(e)=>setLastName(e.target.value)}
                placeholder="Last Name"
            />

          <input
                type='text'
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                placeholder="Email"
            />

          <input
                type='password'
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                placeholder="Password"
            />

             <div>
                 <button>Sign up</button>
             </div>
              </form>
          </Card>
        </div>
        </Layout>
    )
}

export default SignUp
