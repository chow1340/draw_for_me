import {loginType} from '../actionTypes'

const initialState = {
    isLoggedIn: false
};

export default function(state=initialState,  action) {
    switch(action.type) {
        case loginType.LOG_IN : {
            return {
                isLoggedIn: true 
            };
        };
        case loginType.LOG_OUT : {
            return {
                isLoggedIn: false
            };
        };
        
        default:
            return {
                ...state
            }
    }
}