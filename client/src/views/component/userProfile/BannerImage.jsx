import React, {useState} from 'react'
import '../../../views/assets/css/userprofile.css'
const BannerImage = (props) => {
    var backgroundStyle = {
        "background-color":"#DDDDDD"
    };
    // const defaultImageOrCustom = () => {
    if(props.bannerImageUrl){
        backgroundStyle = {
            backgroundImage : `url(${props.bannerImageUrl})`
        }
    }
    // }
    return (
        <div class="bannerImage" style = {backgroundStyle}>
        </div>
    )
}

export default BannerImage;