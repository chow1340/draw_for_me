import {SET_BANNER, OPEN_CROP_MODAL, CLOSE_CROP_MODAL} from '../../actionTypes/profileTypes'

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

        case OPEN_CROP_MODAL : {
            return {
                ...state,
                cropModalState: true
            }
        }

        case CLOSE_CROP_MODAL : {
            return {
                ...state,
                cropModalState: false
            }
        }

        default : 
            return {
                ...state
            }
    }
}

