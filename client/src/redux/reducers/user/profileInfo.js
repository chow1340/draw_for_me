import {
    OPEN_PROFILE_INFO_MODAL, 
    CLOSE_PROFILE_INFO_MODAL, 
    SET_IS_OWNER_OF_PROFILE, 
    SET_C_PROFILE, SET_BANNER, 
    SET_PROFILE_IMAGE, 
    OPEN_PROFILE_CROP_MODAL, 
    CLOSE_PROFILE_CROP_MODAL, 
    OPEN_BANNER_CROP_MODAL, 
    CLOSE_BANNER_CROP_MODAL,
    CLOSE_GALLERY_BLOCK_UPLOAD_MODAL,
    OPEN_GALLERY_BLOCK_UPLOAD_MODAL,
} from '../../actionTypes/user/profileTypes'

const initialState = {
    cProfile : {},
    bannerImageUrl : "",
    cropModalState : false,
    profileInfoModalState : false,
    galleryBlockUploadModalState : false,
    cropProfileState : false,
    profileImageUrl : "",
    isOwnerOfProfile : false,
}

export default function(state = initialState, action) {
    switch(action.type){
        case SET_IS_OWNER_OF_PROFILE : {
            return {
                ...state,
                isOwnerOfProfile : action.payload
            }
        }
        case SET_C_PROFILE : {
            return {
                ...state,
                cProfile : action.payload
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
        case OPEN_BANNER_CROP_MODAL : {
            return {
                ...state,
                cropModalState: true
            }
        }

        case CLOSE_BANNER_CROP_MODAL : {
            return {
                ...state,
                cropModalState: false
            }
        }
        case OPEN_PROFILE_INFO_MODAL : {
            return {
                ...state,
                profileInfoModalState: true
            }
        }

        case CLOSE_PROFILE_INFO_MODAL : {
            return {
                ...state,
                profileInfoModalState: false
            }
        }

        case CLOSE_GALLERY_BLOCK_UPLOAD_MODAL : {
            return {
                ...state,
                galleryBlockUploadModalState: false
            }
        }

        case OPEN_GALLERY_BLOCK_UPLOAD_MODAL : {
            return {
                ...state,
                galleryBlockUploadModalState: true
            }
        }

        default : 
            return {
                ...state
            }
    }
}

