  import {userConstants} from './constant';
  import {firestore} from 'firebase'
  

  export const getRealtimeUsers=(uid)=>{
      return async (dispatch)=>{

        dispatch({type:`${userConstants.GET_REALTIME_USERS}_REQUEST`})

        const db=firestore();

         const unsubscribe=db.collection("users")
         //.where("state", "==", "CA")
         .onSnapshot((querySnapshot)=> {
             const users = [];
             querySnapshot.forEach(function(doc) {
                 if(doc.data().uid!=uid){
                 users.push(doc.data());
                 }
             });
            // console.log(users);
            dispatch({
                type:`${userConstants.GET_REALTIME_USERS}_SUCCESS`,
                payload:{
                    users:users
                }

            })
     
             
         });
         return unsubscribe;
     
           }
       }

  export const sendMessage=(msgObj)=>{
      return async dispatch=>{
      const db=firestore();

      db.collection('conversations')
         .add({
             ...msgObj,
             isView:false,
             createdAt:new Date()
         })
           .then(data=>{
               console.log(data)
               //success
            //    dispatch({
            //        type:userConstants.GET_REALTIME_MESSAGES
            //    })
           })
           .catch(err=>{
               console.log(err)
           })

     
        }

  }    
  
  export const getRealtimeCoversations=(user)=>{
      return async dispatch=>{
          //console.log("hhhh")
          const db=firestore();

          db.collection('conversations')
          .where('user_uid_1','in',[user.uid_1,user.uid_2])
          .orderBy('createdAt','asc')
          .onSnapshot((querySnapshot)=>{
              const conversations=[];
              querySnapshot.forEach(doc=>{
             
                if(
                    (doc.data().user_uid_1==user.uid_1 && doc.data().user_uid_2==user.uid_2)
                    ||
                    (doc.data().user_uid_1==user.uid_2 && doc.data().user_uid_2==user.uid_1)
                ){
                    conversations.push(doc.data())
                }
              
             if(conversations.length>0){
                 dispatch({
                     type:userConstants.GET_REALTIME_MESSAGES,
                     payload:{
                       conversations:conversations
                     }
                 })
             }else{
                 dispatch({
                     type:`${userConstants.GET_REALTIME_MESSAGES}_FAILURE`,
                     payload:{
                         conversations:[]
                     }
                 })
             }

                  
              })
              console.log(conversations)
          })
      }
  }
