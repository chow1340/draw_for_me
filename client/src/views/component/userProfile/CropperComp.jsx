import React, { useState, useEffect } from "react";
import {useDispatch} from "react-redux";
import Cropper from "react-cropper";
import axios from "axios";
import {Button} from 'react-bootstrap'
import {SET_BANNER} from '../../../redux/actionTypes/profileTypes'

export const CropperComp = (props) => {
  const defaultSrc = props.bannerImgUrl;
  const [image, setImage] = useState(defaultSrc);
  const [cropData, setCropData] = useState("");
  const [cropper, setCropper] = useState();
  const [imageChanged, setImageChanged] = useState(false);
  const dispatch = useDispatch();
  

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
        console.log(reader.result);
      };
      reader.readAsDataURL(files[0]);
    };


    const saveNewImage = () => {
      //Set redux state to new image
      dispatch({type : SET_BANNER, payload: image})

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
        // setCropData(cropper.getCroppedCanvas().toDataURL('image/jpeg'));
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
            <Button onClick={getCropData}>Crop Image</Button>
            <Button >Save</Button>
          </div>
        </div>
      <br />
    </div>
  );
};

export default CropperComp;
