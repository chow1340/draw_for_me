import {SET_BANNER, CLOSE_CROP_MODAL, OPEN_CROP_MODAL} from '../actionTypes/profileTypes'

export function setBannerImageUrl(bannerImgUrl){
    return {
        type: SET_BANNER,
        bannerImgUrl
    }
}

//MODAL
export function closeCropModal(){
    return {
        type: CLOSE_CROP_MODAL,
        ...state
    }
}

export function openCropModal(){
    return {
        type: OPEN_CROP_MODAL,
        ...state
    }
}