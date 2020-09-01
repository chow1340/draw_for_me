import {loginType} from '../actionTypes'

const initialState = {
    isLoggedIn: false,
    count: 0
};

export default function(state=initialState,  action) {
    switch(action.type) {
        case loginType.LOG_IN : {
            console.log("loginrann");
            return {
                ...state,
                isLoggedIn: true,
            };
        };
        case loginType.LOG_OUT : {
            console.log("logoutrann");
            return {
                ...state,
                isLoggedIn: false
            };
        };
        
        default:
            return state;
    }
}