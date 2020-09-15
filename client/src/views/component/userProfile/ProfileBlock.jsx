import React from 'react'
import {useSelector,useDispatch} from 'react-redux'
import '../../../views/assets/css/userProfile/profileBlock.css'
import {Button, Modal} from 'react-bootstrap';
import {FaEdit} from 'react-icons/fa';
import {OPEN_PROFILE_CROP_MODAL, CLOSE_PROFILE_CROP_MODAL, CLOSE_BANNER_CROP_MODAL, OPEN_BANNER_CROP_MODAL} from '../../../redux/actionTypes/user/profileTypes'
import CropperComp from './CropperComp';


const ProfileBlock = (props) => {
    const dispatch = useDispatch();

    const profileInfo = useSelector(state => state.profileInfo);
    const profileImageUrl = useSelector(state => state.profileInfo.profileImageUrl);

    return (
        <div className="row profileBlock">
            <span className="profileImageContainer">
                <img id="profileImage" src={profileImageUrl}></img>
            </span>
            <div className="profileBlockText">
                <h1 className="whiteHeader">{profileInfo.cProfile.username}</h1>
                <h4 className="whiteHeader">{profileInfo.cProfile.description}</h4>
                <span></span>
            </div>
        </div>
    )
}

export default ProfileBlock