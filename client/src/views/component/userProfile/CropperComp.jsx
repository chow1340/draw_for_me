import React, { useState, useEffect } from "react";
import {useDispatch} from "react-redux";
import Cropper from "react-cropper";
import axios from "axios";
import {Button} from 'react-bootstrap'
import {SET_BANNER, CLOSE_CROP_MODAL, OPEN_CROP_MODAL} from '../../../redux/actionTypes/profileTypes'

export const CropperComp = (props) => {
  const dispatch = useDispatch();
  const defaultSrc = props.bannerImgUrl;
  const [image, setImage] = useState(defaultSrc);
  const [cropData, setCropData] = useState("");
  const [cropper, setCropper] = useState();
  const [imageChanged, setImageChanged] = useState(false);
  

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
      setImageChanged(true);
    };

    const saveNewImage = () => {
      //No changes made
      if(imageChanged == false) {
        dispatch({type: CLOSE_CROP_MODAL});
        return;
      }

      //Set redux state to new image
      dispatch({type : SET_BANNER, payload: image})
      //Upload new image to db
      cropper.getCroppedCanvas().toBlob((blob) => {

        let formData = new FormData();
        formData.append('file', blob);
        
        axios({
          url: "/api/profile/uploadBannerImage",
          method: "POST",
          data: formData,
          headers: {
              'content-type' : 'multipart/form-data'
          }
        })
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err.response.data);
        })
      })
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
        <Cropper
          style={{ height: 400, width: "80%" , margin: "auto"}}
          initialAspectRatio={24/9}
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
          responsive={true }
          autoCropArea={1}
          checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
          onInitialized={(instance) => {
            setCropper(instance);
          }}
        />
      </div>
        <div className="row cropButtons">
          <div>
            <input type="file" onChange={onChange}></input>
          </div>
          <div style={{float:"right"}}>
            {image && <Button onClick={getCropData}>Crop Image</Button>}
            <Button onClick={saveNewImage}>Save</Button>
          </div>
        </div>
      <br />
    </div>
  );
};

export default CropperComp;
