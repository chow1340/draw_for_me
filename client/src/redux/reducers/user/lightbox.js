import {SET_BANNER_LIGHTBOX_CLOSE, SET_BANNER_LIGHTBOX_OPEN, SET_PROFILE_LIGHTBOX_OPEN, SET_PROFILE_LIGHTBOX_CLOSE} from "../../actionTypes/user/lightboxTypes"

const initialState = {
    bannerLightbox : false,
    profileLightbox : false
}

export default function(state = initialState, action){
    switch(action.type) {
        case(SET_BANNER_LIGHTBOX_OPEN) : {
            return {
                ...state,
                bannerLightbox : true
            }
        }

        case(SET_BANNER_LIGHTBOX_CLOSE) : {
            return {
                ...state,
                bannerLightbox : false
            }
        }

        case(SET_PROFILE_LIGHTBOX_OPEN) : {
            return {
                ...state,
                profileLightbox : true
            }
        }

        case(SET_PROFILE_LIGHTBOX_CLOSE) : {
            return {
                ...state,
                profileLightbox : false
            }
        }


        default : {
            return state
        }
    }
}

