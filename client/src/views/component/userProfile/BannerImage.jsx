import React, {useState} from 'react'
import '../../../views/assets/css/userprofile.css'
// import '../../../../node_modules/cropperjs/dist/cropper.css'
import "cropperjs/dist/cropper.css";
import CropperComp from '../userProfile/CropperComp.tsx';
import Lightbox from 'react-image-lightbox';
import Cropper from 'react-cropper';
import AvatarEditor from 'react-avatar-editor'
import {Slider } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';


const BannerImage = (props) => {
    const [image, setImage] = useState(props.bannerImageUrl);
    const [cropData, setCropData] = useState("#");
    const [cropper, setCropper] = useState();
    const onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

    const getCropData = () => {
        if (typeof cropper !== "undefined") {
        setCropData(cropper.getCroppedCanvas().toDataURL());
        }
    };

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
        
            {/* <AvatarEditor
                className = "avatarEditor"
                image={props.bannerImageUrl}
                height={250}
                border={50}
                color={[255, 255, 255, 0.6]} // RGBA
                scale={1.2}
                rotate={0}
            /> */}
            <div>
                {isOpen && (
                    <Lightbox
                        mainSrc={props.bannerImageUrl}
                        onCloseRequest={()=>setIsOpen(false)}
                    >
                    </Lightbox>
                )}
            </div>
            <CropperComp></CropperComp>
            
        </div>
    )
}

export default BannerImage;