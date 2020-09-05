import {SET_BANNER} from '../actionTypes/profileTypes'

const initialState = {
    bannerImgUrl : "",
}

export default function(state = initialState, action) {
    switch(action.type){
        case SET_BANNER : {
            console.log(action);
            return {
                bannerImgUrl: action.payload
            }
        }
        default : 
            return {
                ...state
            }
    }
}

