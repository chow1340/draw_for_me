import React, {useState} from 'react'
import '../../../views/assets/css/userprofile.css'
import Lightbox from 'react-image-lightbox';

const BannerImage = (props) => {


    const [isOpen, setIsOpen] = useState(false);

    var backgroundStyle = {
        "background-color":"#DDDDDD"
    };
    if(props.bannerImageUrl){
        backgroundStyle = {
            backgroundImage : `url(${props.bannerImageUrl})`
        }
    }
    // }
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
        </div>
    )
}

export default BannerImage;