import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import CropperComp from '../CropperComp.jsx';
import {Modal} from 'react-bootstrap';
import {CLOSE_BANNER_CROP_MODAL, OPEN_BANNER_CROP_MODAL} from '../../../../redux/actionTypes/user/profileTypes'

const BannerCropModal = () => {
    const dispatch = useDispatch();
    //Modal for banner
    const showCropModal = useSelector(state => state.profileInfo.cropModalState);
    const handleCloseBanner = () => dispatch({type : CLOSE_BANNER_CROP_MODAL});
    const handleShowBanner = () => dispatch({type : OPEN_BANNER_CROP_MODAL});
    const bannerImageUrl = useSelector(state => state.profileInfo.bannerImageUrl);

    return (
     <Modal show={showCropModal} onHide={handleCloseBanner}>
        <Modal.Header id="modalHeader" closeButton></Modal.Header>
        <Modal.Body> 
            <CropperComp
                imageUrl = {bannerImageUrl}
                apiUrl = "/api/profile/uploadBannerImage"
                type = "banner"
                aspectRatioWidth = {1440}
                aspectRatioHeight = {400}
                successMessage = "Banner saved"
            ></CropperComp>
        </Modal.Body>
    </Modal>
    )
}

export default BannerCropModal