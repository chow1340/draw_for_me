import {SET_C_PROFILE, SET_BANNER, SET_PROFILE_IMAGE, CLOSE_BANNER_CROP_MODAL, OPEN_BANNER_CROP_MODAL, SET_PROFILE_IMAGE} from '../../actionTypes/user/profileTypes'

export function setCurrentProfile(){
    return {
        type: SET_C_PROFILE,
        cProfile
    }
}

export function setBannerImageUrl(bannerImageUrl){
    return {
        type: SET_BANNER,
        bannerImageUrl
    }
}

export function setProfileImageUrl(profileImageUrl){
    return{
        type: SET_PROFILE_IMAGE,
        profileImageUrl
    }
}

//MODAL
export function closeCropModal(){
    return {
        type: CLOSE_BANNER_CROP_MODAL,
        ...state
    }
}

export function openCropModal(){
    return {
        type: OPEN_BANNER_CROP_MODAL,
        ...state
    }
}

export function closeProfileCropModal(){
    return {
        type: CLOSE_PROFILE_CROP_MODAL,
        ...state
    }
}

export function openProfileCropModal(){
    return {
        type: OPEN_PROFILE_CROP_MODAL,
        ...state
    }
}