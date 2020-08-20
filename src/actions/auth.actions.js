import {auth,firestore} from 'firebase'
import { authConstant } from './constant';



export const signup=(user)=>{
    

      
    return (dispatch)=>{
      dispatch({
          type:authConstant.USER_LOGIN_REQUEST
      })

          const db=firestore();

        auth()
        .createUserWithEmailAndPassword(user.email,user.password)
        .then(data=>{
            console.log(user);
            const currentUser=auth().currentUser;
            const name=`${user.firstName} ${user.lastName}`
            currentUser.updateProfile({
                displayName:name
            })
              .then(()=>{
                  //if you are here means updated successfully
                  db.collection("users")
                  .doc(data.user.uid)
                  .set({
                      firstName:user.firstName,
                      lastName:user.lastName,
                      uid:data.user.uid,
                      createdAt:new Date(),
                      isOnline:true
                  })
                  .then(()=>{
                    const loggedInUser={
                        firstName:user.firstName,
                        lastName:user.lastName,
                        uid:data.user.uid,
                        email:user.email
                    }
                    localStorage.setItem('user',JSON.stringify(loggedInUser));
                    console.log('User logged in successfully')
                    dispatch({
                        type:authConstant.USER_LOGIN_SUCCESS, 
                        payload:{
                            user:loggedInUser
                        }
                    })
 
                 })
                 .catch(err=>{
                     console.log(err)
                     dispatch({
                         type:authConstant.USER_LOGIN_FAILURE,
                         payload:{
                             error:err
                         }
                     })
               })
              })
                

          })
        .catch(err=>{
            console.log(err)
        })
    }

}


export const login=(user)=>{
    
    return(dispatch)=>{

         dispatch({
             type:authConstant.USER_LOGIN_REQUEST
         })
         auth()
         .signInWithEmailAndPassword(user.email,user.password)
         .then(data=>{
            console.log(data);
            const db=firestore();
            db.collection('users')
               .doc(data.user.uid)  
               .update({
                   isOnline:true
               }) 
                 .then(()=>{
                    const name=data.user.displayName.split(' ');
                    const fName=name[0];
                    const lName=name[1];
       
                    const loggedInUser={
                       firstName:fName,
                       lastName:lName,
                       email:data.user.email,
                       uid:data.user.uid
       
                    }
                    localStorage.setItem('user',JSON.stringify(loggedInUser))
       
                    dispatch({
                        type:authConstant.USER_LOGIN_SUCCESS,
                        payload:{user:loggedInUser}
                    })
                    
                })
 
                 })   
                  .catch(err=>{
                      console.log(err)
                  })        


           .catch(err=>{
               console.log(err)
               dispatch({
                   type:authConstant.USER_LOGIN_FAILURE,
                   payload:{error:err}
               })
           })

    }

}

export const isLoggedInUser=()=>{
    return dispatch=>{
        const user=localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')):null;
        if(user){
            dispatch({
                type:authConstant.USER_LOGIN_SUCCESS,
                payload:{user:user}
            })
        }else{
            dispatch({
                type:authConstant.USER_LOGIN_FAILURE,
                payload:{error:"Please Login again"}
            })
        }
    }
}

export const logout=(uid)=>{
    return async dispatch=>{
        dispatch({ type:authConstant.USER_LOGOUT_REQUEST })

        const db=firestore();
        db.collection('users')
        .doc(uid)
        .update({isOnline:false})
        .then(()=>{
            auth()
            .signOut()
            .then(()=>{
                localStorage.clear();
                dispatch({type:authConstant.USER_LOGOUT_SUCCESS})
            })
            .catch(err=>{
                console.log(err)
                dispatch({type:authConstant.USER_LOGOUT_FAILURE ,payload:{error:err}})
            })
   

        })
          .catch(err=>{
              console.log(err)
          })

      

    }
}