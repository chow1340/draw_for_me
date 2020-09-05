import {SET_BANNER} from '../actionTypes/profileTypes'

export function setBannerImageUrl(bannerImageUrl){
    return {
        type: SET_BANNER,
        bannerImageUrl
    }
}