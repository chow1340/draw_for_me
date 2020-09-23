import React from "react";
import {FaEdit} from 'react-icons/fa'

const imgWithClick = { cursor: "pointer" };

const Photo = ({ index, onClick, photo, margin, direction, top, left }) => {
  const imgStyle = { margin: margin };
  if (direction === "column") {
    imgStyle.position = "absolute";
    imgStyle.left = left;
    imgStyle.top = top;
  }

  imgStyle.boxShadow = " 0px 0px 5px 5px rgba(20,20,20,1)";
  

  const handlePhotoEdit = (event) => {
    console.log(photo);
  }

  return (
    <div className="photoContainer">
      <img
        style={onClick ? { ...imgStyle, ...imgWithClick } : imgStyle}
        {...photo}
        alt="img"
        className = "sortableGalleryImage"
      />
      <button 
      className = "photoEdit"
      onClick = {handlePhotoEdit}
      >
        <FaEdit
          className="photoEditIcon"
        ></FaEdit>
      </button>

    </div>

  );
};

export default Photo;
