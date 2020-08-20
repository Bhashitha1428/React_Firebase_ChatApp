import React from 'react'
import {Route, Redirect} from 'react-router-dom'

function PrivateRoute({component:Component,...rest}) {
    return (
       <Route {...rest} exact component={(props)=>{
           const user=localStorage.getItem('user')? JSON.parse(localStorage.getItem('user')):null;
           if(user){
               console.log(rest.name)
               console.log(rest)
               return <Component {...rest}/>
           }else{
               return <Redirect to={`\login`}/>
           }
           
       }}/>
    )
}

export default PrivateRoute
