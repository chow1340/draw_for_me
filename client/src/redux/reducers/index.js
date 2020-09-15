import { combineReducers } from "redux";
import profileInfo from "./user/profileInfo";
import cUserInfo from "./user/currentUserInfo";
import galleryImages from "./user/galleryImages";
export default combineReducers({
    profileInfo, cUserInfo, galleryImages
});
