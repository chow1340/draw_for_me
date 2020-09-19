import { combineReducers } from "redux";
import profileInfo from "./user/profileInfo";
import cUserInfo from "./user/currentUserInfo";
import galleryImages from "./user/galleryImages";
import lightbox from "./user/lightbox";

export default combineReducers({
    profileInfo, cUserInfo, galleryImages, lightbox
});
