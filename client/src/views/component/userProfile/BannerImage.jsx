import React, {useState} from 'react'
import '../../../views/assets/css/userprofile.css'
// import '../../../../node_modules/cropperjs/dist/cropper.css'
import "cropperjs/dist/cropper.css";
import CropperComp from './CropperComp.jsx';
import Lightbox from 'react-image-lightbox';
import Cropper from 'react-cropper';
import AvatarEditor from 'react-avatar-editor'
import {Slider } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';


const BannerImage = (props) => {
    //Lightbox
    const [isOpen, setIsOpen] = useState(false);

    var backgroundStyle = {
        "background-color":"#DDDDDD"
    };
    if(props.bannerImageUrl){
        backgroundStyle = {
            backgroundImage : `url(${props.bannerImageUrl})`
        }
    }

    return (
        <div>
            <div onClick = {() => setIsOpen(true)} class="bannerImage" style = {backgroundStyle}>
                <button className="editBannerButton">
                    Edit Banner
                </button>
            </div>
            <div>
                {isOpen && (
                    <Lightbox
                        mainSrc={props.bannerImageUrl}
                        onCloseRequest={()=>setIsOpen(false)}
                    >
                    </Lightbox>
                )}
            </div>
            <CropperComp
                bannerImageUrl = {props.bannerImageUrl}
            ></CropperComp>
            
        </div>
    )
}

export default BannerImage;