import React, {useState} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import '../../../views/assets/css/userProfile/profileBlock.css';
import Lightbox from 'react-image-lightbox';
import {SET_BANNER_LIGHTBOX_CLOSE,SET_PROFILE_LIGHTBOX_OPEN, SET_PROFILE_LIGHTBOX_CLOSE} from '../../../redux/actionTypes/user/lightboxTypes'


const ProfileBlock = (props) => {
    const dispatch = useDispatch();

    const profileInfo = useSelector(state => state.profileInfo);
    const profileImageUrl = useSelector(state => state.profileInfo.profileImageUrl);

    //Lightbox
    const isOpenBannerLightbox = useSelector(state => state.lightbox.bannerLightbox);
    const isOpenProfileLightbox = useSelector(state => state.lightbox.profileLightbox);
    // const [isOpenProfileLightbox, setIsOpenProfileLightbox] = useState(false);
    const handleProfileLightboxOpen = (event) => {
        dispatch({type: SET_BANNER_LIGHTBOX_CLOSE})
        dispatch({type: SET_PROFILE_LIGHTBOX_OPEN})
    }

    const handleProfileLightboxClose = (event) => {
        dispatch({type: SET_PROFILE_LIGHTBOX_CLOSE})
        event.stopPropagation();
    }

    return (
        <div className="row profileBlock">
            <span className="profileImageContainer">
                <img 
                // onClick={handleProfileLightboxOpen} 
                onClick = {(event) => {event.stopPropagation();
                    handleProfileLightboxOpen()
                }}
                id="profileImage" src={profileImageUrl}></img>
            </span>
            <div className="profileBlockText">
                <h1 className="whiteHeader">{profileInfo.cProfile.username}</h1>
                <h4 className="whiteHeader">{profileInfo.cProfile.description}</h4>
                <span></span>
            </div>
            {
                isOpenProfileLightbox && 
                <Lightbox
                    mainSrc={profileImageUrl}
                    onCloseRequest={
                        handleProfileLightboxClose
                    }
                >
                </Lightbox>
            }
           
        </div>
    )
}

export default ProfileBlock