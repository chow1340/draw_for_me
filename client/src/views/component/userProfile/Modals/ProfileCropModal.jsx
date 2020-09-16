import React from 'react';
import {Modal} from 'react-bootstrap';
import CropperComp from '../CropperComp';
import {OPEN_PROFILE_CROP_MODAL, CLOSE_PROFILE_CROP_MODAL, CLOSE_BANNER_CROP_MODAL, OPEN_BANNER_CROP_MODAL} from '../../../../redux/actionTypes/user/profileTypes'
import {useSelector,useDispatch} from 'react-redux'


const ProfileCropModal = () => {
    const dispatch = useDispatch();
    //Modal
    const showProfileCropModal = useSelector(state => state.profileInfo.cropProfileState);
    const handleProfileCropClose = () => dispatch({type : CLOSE_PROFILE_CROP_MODAL});
    const profileImageUrl = useSelector(state => state.profileInfo.profileImageUrl);

    return (
        <Modal show={showProfileCropModal} onHide={handleProfileCropClose}>
            <Modal.Header id="modalHeader" closeButton></Modal.Header>
            <Modal.Body> 
                <CropperComp
                    imageUrl = {profileImageUrl}
                    apiUrl = "/api/profile/uploadProfilePicture"
                    type = "profileImage"
                    aspectRatioWidth = {1}
                    aspectRatioHeight = {1}
                ></CropperComp>
            </Modal.Body>
        </Modal> 
    )
}

export default ProfileCropModal