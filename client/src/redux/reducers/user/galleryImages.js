import {SET_GALLERY_SORTABLE_TRUE,SET_GALLERY_SORTABLE_FALSE} from "../../actionTypes/user/profileTypes"
import {SET_GALLERY_PHOTOS, ADD_GALLERY_PHOTO} from "../../actionTypes/user/galleryTypes"

const initialState = {
    gallerySortable : false,
    galleryPhotos : []
}

export default function(state = initialState, action){
    switch(action.type) {

        case(SET_GALLERY_PHOTOS) : {
            return {
                ...state,
                galleryPhotos : action.payload
            }
        }

        case(ADD_GALLERY_PHOTO) : {
            console.log(state.galleryPhotos)
            return {
                ...state,
                galleryPhotos : [...state.galleryPhotos, action.payload]
            }
        }

        case(SET_GALLERY_SORTABLE_TRUE) : {
            return {
                ...state,
                gallerySortable : true
            }
        }

        case(SET_GALLERY_SORTABLE_FALSE) : {
            return {
                ...state,
                gallerySortable : false
            }
        }

        default : {
            return state
        }
    }
}

