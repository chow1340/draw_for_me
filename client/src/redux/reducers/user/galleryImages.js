import {SET_GALLERY_SORTABLE_TRUE,SET_GALLERY_SORTABLE_FALSE} from "../../actionTypes/user/profileTypes"

const initialState = {
    gallerySortable : false
}

export default function(state = initialState, action){
    switch(action.type) {
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

