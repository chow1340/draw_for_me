import {SET_C_USER, SET_BANNER, SET_PROFILE_IMAGE, OPEN_PROFILE_CROP_MODAL, CLOSE_PROFILE_CROP_MODAL, OPEN_BANNER_CROP_MODAL, CLOSE_BANNER_CROP_MODAL} from '../../actionTypes/profileTypes'

const initialState = {
    cUser : {},
    bannerImageUrl : "",
    cropModalState : false,
    cropProfileState : false,
    profileImageUrl : "",
}

export default function(state = initialState, action) {
    switch(action.type){
        case SET_C_USER : {
            return {
                ...state,
                cUser : action.payload
            }
        }
        case SET_BANNER : {
            return {
                ...state,
                bannerImageUrl: action.payload
            }
        }
        case SET_PROFILE_IMAGE : {
            return {
                ...state,
                profileImageUrl: action.payload
            }
        }
        case OPEN_PROFILE_CROP_MODAL : {
            return {
                ...state,
                cropProfileState: true
            }
        }

        case CLOSE_PROFILE_CROP_MODAL : {
            return {
                ...state,
                cropProfileState: false
            }
        }
        case OPEN_PROFILE_CROP_MODAL : {
            return {
                ...state,
                cropProfileState: true
            }
        }

        case CLOSE_BANNER_CROP_MODAL : {
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

