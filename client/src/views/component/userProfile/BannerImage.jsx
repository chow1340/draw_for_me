import React, {useState} from 'react'
import '../../../views/assets/css/userProfile/banner.css'
import "cropperjs/dist/cropper.css";
import CropperComp from './CropperComp.jsx';
import Lightbox from 'react-image-lightbox';
import {Dropdown, Modal, Button} from 'react-bootstrap';
import {useSelector, useDispatch} from 'react-redux';
import {OPEN_PROFILE_INFO_MODAL, CLOSE_PROFILE_INFO_MODAL, CLOSE_BANNER_CROP_MODAL, OPEN_BANNER_CROP_MODAL, OPEN_PROFILE_CROP_MODAL} from '../../../redux/actionTypes/user/profileTypes'
import {FaEdit} from 'react-icons/fa'
import ProfileBlock from './ProfileBlock.jsx';
import $ from 'jquery';
const BannerImage = (props) => {
    const dispatch = useDispatch();
    const isOwnerOfProfile = useSelector(state => state.profileInfo.isOwnerOfProfile);

    // const bannerWidth = document.getElementsByClassName("bannerImgContainer").offsetWidth

    //Lightbox
    const [isOpenZoomedBanner, setIsOpenZoomedBanner] = useState(false);
    const handleZoomBanner = () => {setIsOpenZoomedBanner(true)}
    const bannerImageUrl = useSelector(state => state.profileInfo.bannerImageUrl);
   
    //Modal for banner
    const showCropModal = useSelector(state => state.profileInfo.cropModalState);
    const handleCloseBanner = () => dispatch({type : CLOSE_BANNER_CROP_MODAL});
    const handleShowBanner = () => dispatch({type : OPEN_BANNER_CROP_MODAL});

    //Modal for profile Crop
    const showProfileCropModal = useSelector(state => state.profileInfo.cropProfileState);
    const handleProfileCropOpen = () => dispatch({type : OPEN_PROFILE_CROP_MODAL});

    //Modal for profile Info
    const handleProfileInfoModalOpen = () => dispatch({type: OPEN_PROFILE_INFO_MODAL});

    var backgroundStyle = {};
    if(bannerImageUrl){
        backgroundStyle = {
            backgroundImage: `url(${bannerImageUrl})`,
        };    
    } else {
        backgroundStyle = {
            "background-color":"#DDDDDD",
        }
    }

    $(window).scroll(function() {
        var scrolledY = $(window).scrollTop();
        $('.bannerImageContainer').css('background-position', 'left ' + ((scrolledY)) + 'px');
      });

      $(document).ready(function(){
        var gradient =100 - ($(this).scrollTop() / 500)*60;
        $(".bannerImageContainerOverlay").css({
            'background':'-webkit-linear-gradient(top,rgba(255,153,153,0) 0%, rgba(255,153,153,0) ' + gradient + '%,rgba(0,0,0,1) 100%)',        
        });
        $(document).scroll(function() {
            gradient =100 - ($(this).scrollTop() / 500)*60;
            $(".bannerImageContainerOverlay").css({
                'background':'-webkit-linear-gradient(top,rgba(255,153,153,0) 0%, rgba(255,153,153,0) ' + gradient + '%,rgba(0,0,0,1) 100%)',        
            });
        });
    });
    return (
            <div className="bannerImageContainer" 
            style={backgroundStyle}
            onClick={handleZoomBanner}
            >
                <div className="bannerImageContainerOverlay"></div>
                <ProfileBlock/>
               {isOwnerOfProfile && 
                <Dropdown onClick = {(event) =>event.stopPropagation()} id="editBannerButton">
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    <FaEdit></FaEdit>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={handleShowBanner}>Edit Banner Image</Dropdown.Item>
                    <Dropdown.Item onClick={handleProfileCropOpen}>Edit Profile Image</Dropdown.Item>
                    <Dropdown.Item onClick={handleProfileInfoModalOpen}>Edit Profile Information</Dropdown.Item>
                </Dropdown.Menu>
                </Dropdown>
               } 
            <div>
                {isOpenZoomedBanner && showCropModal==false && showProfileCropModal==false &&   (
                    <Lightbox
                        mainSrc={bannerImageUrl}
                        onCloseRequest={()=>setIsOpenZoomedBanner(false)}
                    >
                    </Lightbox>
                )}
            </div>
            </div>
            
    )
}


export default BannerImage;