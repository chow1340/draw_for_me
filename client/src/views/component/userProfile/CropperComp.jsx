import React, { useState, useEffect } from "react";
import Cropper from "react-cropper";
import axios from "axios";

export const CropperComp = (props) => {
  console.log(props.bannerImageUrl)
  const defaultSrc = props.bannerImageUrl;
  const [image, setImage] = useState("https://s3.ca-central-1.amazonaws.com/aws-cloud-storage-jeffrey-chow/1599170010345-33345827_10211958793194292_1805915090906513408_o.jpg");
  const [cropData, setCropData] = useState("");
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
  };

  return (
    <div>
      <div style={{ width: "100%" }}>
        <input type="file" onChange={onChange} />
        <button>Use default img</button>
        <br />
        <br />
        <Cropper
          style={{ height: 400, width: "100%" }}
          initialAspectRatio={1}
          preview=".img-preview"
          src={props.bannerImageUrl}
          checkCrossOrigin={true}
          viewMode={2}
          guides={true}
          minCropBoxHeight={10}
          minCropBoxWidth={10}
          background={false}
          responsive={true }
          autoCropArea={1}
          checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
          onInitialized={(instance) => {
            setCropper(instance);
          }}
        />
      </div>
      <div>
        {/* <div className="box" style={{ width: "50%", float: "right" }}>
          <h1>Preview</h1>
          <div
            className="img-preview"
            style={{ width: "100%", float: "left", height: "300px" }}
          />
        </div> */}
        <div
          className="box"
          style={{ width: "100%", height: "300px" }}
        >
          <h1>
            <span>Crop</span>
            <button style={{ float: "right" }} onClick={getCropData}>
              Crop Image
            </button>
          </h1>
          <img style={{ width: "100%" }} src={cropData} alt="cropped" />
        </div>
      </div>
      <br style={{ clear: "both" }} />
    </div>
  );
};

export default CropperComp;
