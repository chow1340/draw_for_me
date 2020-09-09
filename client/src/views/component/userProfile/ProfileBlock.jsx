import React from 'react'
import {useSelector,useDispatch} from 'react-redux'
import '../../../views/assets/css/profileBlock.css'
import {Button, Modal} from 'react-bootstrap';
import {FaEdit} from 'react-icons/fa';
import {OPEN_PROFILE_CROP_MODAL, CLOSE_PROFILE_CROP_MODAL, CLOSE_BANNER_CROP_MODAL, OPEN_BANNER_CROP_MODAL} from '../../../redux/actionTypes/user/profileTypes'
import CropperComp from './CropperComp';


const ProfileBlock = (props) => {
    const dispatch = useDispatch();

    //Modal
    const showProfileCropModal = useSelector(state => state.profileInfo.cropProfileState);
    const handleProfileCropClose = () => dispatch({type : CLOSE_PROFILE_CROP_MODAL});
    const profileImageUrl = useSelector(state => state.profileInfo.profileImageUrl);
    const userName = useSelector(state => state.profileInfo.cProfile.username);
    
    return (
        <div className="row profileBlock">
            <span className="profileImageContainer">
                <Modal show={showProfileCropModal} onHide={handleProfileCropClose}>
                    <Modal.Header id="modalHeader" closeButton></Modal.Header>
                    <Modal.Body> 
                        <CropperComp
                            imageUrl = {profileImageUrl}
                            apiUrl = "/api/profile/uploadProfilePicture"
                            type = "profileImage"
                        ></CropperComp>
                    </Modal.Body>
                </Modal> 
                <img id="profileImage" src={profileImageUrl}></img>
            </span>
            <div className="profileBlockText">
                <h3 className="whiteHeader">{userName}</h3>
                <span></span>
            </div>
        </div>
    )
}

export default ProfileBlock