import React, {useState} from 'react'
import '../../../views/assets/css/userprofile.css'
import "cropperjs/dist/cropper.css";
import CropperComp from './CropperComp.jsx';
import Lightbox from 'react-image-lightbox';
import {Dropdown, Modal, Button} from 'react-bootstrap';
import {useSelector, useDispatch} from 'react-redux';
import {CLOSE_CROP_MODAL, OPEN_CROP_MODAL} from '../../../redux/actionTypes/profileTypes'

const BannerImage = (props) => {
    const dispatch = useDispatch();
    //Lightbox
    const [isOpen, setIsOpen] = useState(false);

    const bannerImgUrl = useSelector(state => state.bannerImg.bannerImgUrl);
   
    //Modal
    const showCropModal = useSelector(state => state.bannerImg.cropModalState);
    const handleClose = () => dispatch({type : CLOSE_CROP_MODAL});
    const handleShow = () => dispatch({type : OPEN_CROP_MODAL});


    var backgroundStyle = {
        "background-color":"#DDDDDD"
    };
   

    return (
        <div>
            <div className="bannerImageContainer" >
                <img className="bannerImg" onClick = {() => setIsOpen(true)}  src={bannerImgUrl}></img>
                    <div className="profileBlock">
                        
                    </div>
                    <Button onClick={handleShow} id = "editBannerButton">
                        Edit Banner
                    </Button>  
            </div>
            <Modal show={showCropModal} onHide={handleClose}>
                <Modal.Header id="modalHeader" closeButton></Modal.Header>
                <Modal.Body> 
                    <CropperComp
                        bannerImgUrl = {bannerImgUrl}
                    ></CropperComp>
                </Modal.Body>
            </Modal>
            <div>
                {isOpen && (
                    <Lightbox
                        mainSrc={props.bannerImgUrl}
                        onCloseRequest={()=>setIsOpen(false)}
                    >
                    </Lightbox>
                )}
            </div>
           
            
        </div>
    )
}

export default BannerImage;