import React, { useEffect ,useState} from 'react';
import './home.css';
import Layout from '../../components/Layout/layout';
import {useDispatch,useSelector} from 'react-redux'
import { getRealtimeUsers,sendMessage, getRealtimeCoversations } from '../../actions';



const User=(props)=>{
    const {user,onClick}=props
    return(
        <div  className="displayName" onClick={()=>onClick(user)}>
        <div className="displayPic">
            <img src="https://i.pinimg.com/originals/be/ac/96/beac96b8e13d2198fd4bb1d5ef56cdcf.jpg" alt="" />
        </div>
        <div style={{display:'flex', flex:1,justifyContent:'space-between', margin: '0 10px'}}>
            <span style={{fontWeight: 500}}>{user.firstName} {user.lastName}</span>
            <span className={user.isOnline? 'onlineStatus':'onlineStatus off'} > </span>
        </div>
    </div>
    )
}

const HomePage = (props) => {

    const dispatch=useDispatch();
    const auth= useSelector(state => state.auths)
    const user=useSelector(state=>state.user)
    const [chatStarted,setChatStarted]=useState(false)
    const [chatUser,setChatUser]=useState('')
    const [message,setMessage]=useState('')
    const [userUid,setUserUid]=useState('')

    let unsubscribe;

useEffect(()=>{
    // console.log("sdfkjj")
    // console.log(auth)
  unsubscribe= dispatch(getRealtimeUsers(auth.uid))
     .then(unsubscribe=>{
         return unsubscribe
     })
     .catch(err=>{
         console.log(err)
     })
     
},[])
 
//componentWillUnmount
useEffect(()=>{
    return()=>{
        //cleanup
        unsubscribe.then(f=>{f();}).catch(err=>console.log(err))
    }
},[])

const initChat=(user)=>{
setChatStarted(true);

setChatUser(`${user.firstName} ${user.lastName}`)
setUserUid(user.uid)

dispatch(getRealtimeCoversations({uid_1:auth.uid,uid_2:user.uid}))

}

const submitMessage =()=>{
   const msgObj={
       user_uid_1:auth.uid,
       user_uid_2:userUid,
       message:message
   } 
   //console.log(msgObj)
   if(message!==""){
       dispatch(sendMessage(msgObj))
   }


}



// console.log(user)

  return (
      <Layout>
    <section className="container">
    <div className="listOfUsers">

    {
        user.users.length>0 ?
        user.users.map(user=>{
            return(
                <User key={user.uid} user={user} onClick={initChat}/>
                )
        }):null
    }
           
    </div>
    <div className="chatArea">
        <div className="chatHeader">
             {
            chatStarted ? chatUser:null
        } 
        </div>

        <div className="messageSections">
            {
                chatStarted ? 
               user.conversations.map(con=>
                <div key={con.createdAt} style={{ textAlign:con.user_uid_1==auth.uid? 'right': 'left' }}>
                <p className="messageStyle" >{con.message}</p>
               </div>):null
               
               
            }
        </div>
            {
                chatStarted ? <div className="chatControls">
                <textarea
                  value={message}
                  onChange={(e)=>setMessage(e.target.value)}
                  placeholder="Write Message"
                />
                <button onClick={submitMessage}>Send</button>
            </div>:null
            }
        
    </div>
</section>
</Layout>
  );
}

export default HomePage;