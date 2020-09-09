import React, {useState} from 'react'
import '../../../views/assets/css/banner.css'
import "cropperjs/dist/cropper.css";
import CropperComp from './CropperComp.jsx';
import Lightbox from 'react-image-lightbox';
import {Dropdown, Modal, Button} from 'react-bootstrap';
import {useSelector, useDispatch} from 'react-redux';
import {CLOSE_BANNER_CROP_MODAL, OPEN_BANNER_CROP_MODAL, OPEN_PROFILE_CROP_MODAL} from '../../../redux/actionTypes/user/profileTypes'
import {FaEdit} from 'react-icons/fa'
import ProfileBlock from './ProfileBlock.jsx';
const BannerImage = (props) => {
    const dispatch = useDispatch();
    
    const isOwnerOfProfile = useSelector(state => state.profileInfo.isOwnerOfProfile);

    //Lightbox
    const [isOpen, setIsOpen] = useState(false);
    const bannerImageUrl = useSelector(state => state.profileInfo.bannerImageUrl);
   
    //Modal for banner
    const showCropModal = useSelector(state => state.profileInfo.cropModalState);
    const handleCloseBanner = () => dispatch({type : CLOSE_BANNER_CROP_MODAL});
    const handleShowBanner = () => dispatch({type : OPEN_BANNER_CROP_MODAL});

    //Modal for profile
    const showProfileCropModal = useSelector(state => state.profileInfo.cropProfileState);
    const handleProfileCropOpen = () => dispatch({type : OPEN_PROFILE_CROP_MODAL});


    var backgroundStyle = {};
    if(!bannerImageUrl){
        backgroundStyle = {
            "background-color":"#DDDDDD"
        };    
    }

    return (
        <div>
            <div className="bannerImageContainer" style={backgroundStyle}>
                {bannerImageUrl && 
                    <img className="bannerImageon" onClick = {() => setIsOpen(true)}  src={bannerImageUrl}></img>
                }
                <ProfileBlock/>
               {isOwnerOfProfile && 
                <Dropdown id="editBannerButton">
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    <FaEdit></FaEdit>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={handleShowBanner}>Edit Banner Image</Dropdown.Item>
                    <Dropdown.Item onClick={handleProfileCropOpen}>Edit Profile Image</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Edit Profile Information</Dropdown.Item>
                </Dropdown.Menu>
                </Dropdown>
               } 
               
            </div>
            <Modal show={showCropModal} onHide={handleCloseBanner}>
                <Modal.Header id="modalHeader" closeButton></Modal.Header>
                <Modal.Body> 
                    <CropperComp
                        imageUrl = {bannerImageUrl}
                        apiUrl = "/api/profile/uploadBannerImage"
                        type = "banner"
                    ></CropperComp>
                </Modal.Body>
            </Modal>
            <div>
                {isOpen && (
                    <Lightbox
                        mainSrc={bannerImageUrl}
                        onCloseRequest={()=>setIsOpen(false)}
                    >
                    </Lightbox>
                )}
            </div>
           
            
        </div>
    )
}

export default BannerImage;