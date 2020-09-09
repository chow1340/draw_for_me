import { combineReducers } from "redux";
import profileInfo from "./user/profileInfo";
import cUserInfo from "./user/currentUserInfo";
export default combineReducers({
    profileInfo, cUserInfo
});
