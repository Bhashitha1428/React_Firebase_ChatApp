import {combineReducers} from 'redux'
import authReducer from './auth.reducer'
import userReducer from './user.reducer';


const rootReducer=combineReducers({
    auths:authReducer,
    user:userReducer,
})

export default rootReducer;
