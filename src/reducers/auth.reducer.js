import { authConstant } from "../actions/constant"

const initialState={
    firstName:'',
    lastName:'',
    email:'',
    authenticating:false,
    authenticated:false,
    error:null
}

export default (state=initialState,action)=>{
    //console.log("dhshcjkshjfs")
    console.log(action)

    switch(action.type){
        case authConstant.USER_LOGIN_REQUEST:
            state={
                ...state,
                authenticating:true
            }
             break;
        case authConstant.USER_LOGIN_SUCCESS:
            state={
                ...state,
                ...action.payload.user,
                authenticated:true,
                authenticating:false

            }     
            break;
        case authConstant.USER_LOGIN_FAILURE:
            state={
                ...state,
                authenticating:false,
                authenticated:false,
                error:action.payload.error
            }  
            break; 

        case authConstant.USER_LOGOUT_REQUEST:
            break;
        case authConstant.USER_LOGOUT_SUCCESS:
            state={
                ...initialState
            }
            break;
        case authConstant.USER_LOGOUT_FAILURE:
              state={
                  ...state,
                  error:action.payload.error
              }
                  
            
    }
    
    return state;

}