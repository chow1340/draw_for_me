import React, { useState } from "react";
import {useDispatch} from "react-redux";
import Cropper from "react-cropper";
import axios from "axios";
import {Button} from 'react-bootstrap'
import {SET_BANNER, CLOSE_BANNER_CROP_MODAL, CLOSE_PROFILE_CROP_MODAL,SET_PROFILE_IMAGE, CLOSE_GALLERY_BLOCK_UPLOAD_MODAL} from '../../../redux/actionTypes/user/profileTypes'
import cogoToast from 'cogo-toast';

export const CropperComp = (props) => {
  const dispatch = useDispatch();
  const defaultSrc = props.imageUrl;
  const [image, setImage] = useState(defaultSrc);
  const [cropper, setCropper] = useState();
  const [imageChanged, setImageChanged] = useState(false);

  const [cusFormData, setCusFormData] = useState({
    aspectRatioWidth: 1,
    aspectRatioHeight: 1,
  });

  const handleCloseBanner = (event) => {dispatch({type : CLOSE_BANNER_CROP_MODAL})};
  const handleProfileCropClose = (event) => {dispatch({type : CLOSE_PROFILE_CROP_MODAL}) };
  const handleGalleryBlockUploadModalClose = () => {dispatch({type : CLOSE_GALLERY_BLOCK_UPLOAD_MODAL})};

  //Aspect ratio
  const handleAspectRatioWidthChange = (e) => {
    setCusFormData({
      ...cusFormData,
      aspectRatioWidth : e.target.value,
    })
  }

  const handleAspectRatioHeightChange = (e) => {
    setCusFormData({
      ...cusFormData,
      aspectRatioHeight : e.target.value,
    })
  }
  


  const onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } 
    else if (e.target) {
      files = e.target.files;
    }
    if(files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(files[0]);
      setImageChanged(true);
    } else {
      setImage(defaultSrc);
    }
    
  };

  const saveNewImage = () => {
    //No changes made
    if(imageChanged == false) {
      if(props.type == "banner") {
        handleCloseBanner();
      } else if(props.type == "profileImage"){
        handleProfileCropClose();
      } else if(props.type == "galleryBlock"){

      }
      dispatch({type: CLOSE_BANNER_CROP_MODAL});
      return;
    }

    //Set redux state to new image
    if(props.type == "banner") {
      dispatch({type : SET_BANNER, payload: image})
    } else if(props.type == "profileImage") {
      dispatch({type : SET_PROFILE_IMAGE, payload: image})
    }
    // //Upload new image to db
    cropper.getCroppedCanvas().toBlob((blob) => {
    
      let formData = new FormData();
      formData.append('file', blob);

      //Gallery width/height
      if(props.type == "galleryBlock"){
        formData.append('aspectRatioWidth', cusFormData.aspectRatioWidth);
        formData.append('aspectRatioHeight', cusFormData.aspectRatioHeight);
        var date = new Date().toISOString().slice(0, 19).replace('T', ' ');;
        formData.append('date', date);
      }
      axios({
        url: props.apiUrl,
        method: "POST",
        data: formData,
        headers: {
            'content-type' : 'multipart/form-data'
        }
      })
      .then(res => {
        cogoToast.success(props.successMessage);
        handleGalleryBlockUploadModalClose();
      })
      .catch(err => {
          console.log(err.response.data);
      })
    }, 'image/jpeg')
  }

  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      setImageChanged(true);
      setImage(cropper.getCroppedCanvas().toDataURL('image/jpeg'));
    }
  };



  return (
    <div>
      <div style={{ width: "100%" }}>
        
        {image && <Cropper
          style={{ height: 400, width: "100%" , margin: "auto"}}
          className = "cropper"
          // aspectRatio = {props.aspectRatioWidth / props.aspectRatioHeight}
          preview=".img-preview"
          src={image}
          checkCrossOrigin={true}
          viewMode={2}
          guides={true}
          minCropBoxHeight={10}
          minCropBoxWidth={10}
          maxWidth={4096}
          maxHeight={4096}
          background={false}
          responsive={true}
          autoCropArea={100}
          checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
          onInitialized={(instance) => {
            setCropper(instance);
          }}
        />}
        
      </div>
        <div className="row cropButtons">
          <div>
            <input type="file" onChange={onChange}></input>
          </div>
          <div style={{float:"right"}}>
            
            {/* Choose gallery width/height */}
            {image && props.type=="galleryBlock" &&
            <span>
              <input
                className="aspectInput"
                style={{color:"black"}}
                type="number"
                placeholder="Width"
                value={props.aspectRatioWidth}
                onChange={handleAspectRatioWidthChange}
              >
              </input>
              <input
                className="aspectInput"
                style={{color:"black"}}
                type="number"
                placeholder="Height"
                value={props.aspectRatioHeight}
                onChange={handleAspectRatioHeightChange}
                >
              </input>
            </span>
            }
            {image && <Button onClick={getCropData}>Crop Image</Button>}
            <Button onClick={saveNewImage}>Save</Button>
          </div>
        </div>
      <br />
    </div>
  );
};

export default CropperComp;
