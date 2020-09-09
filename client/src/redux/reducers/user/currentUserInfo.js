import {SET_C_USER} from "../../actionTypes/user/currentUserTypes"

const initialState = {
    cUser : null
}

export default function(state = initialState, action){
    switch(action.type) {
        case(SET_C_USER) : {
            return {
                ...state,
                cUser : action.payload
            }
        }

        default : {
            return state
        }
    }
}

