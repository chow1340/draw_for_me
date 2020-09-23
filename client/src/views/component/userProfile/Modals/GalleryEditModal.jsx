import React, {useEffect, useState} from 'react';
import {Modal, Form, Button} from 'react-bootstrap';
import {useSelector, useDispatch} from 'react-redux';
import {CLOSE_GALLERY_BLOCK_UPLOAD_MODAL} from '../../../../redux/actionTypes/user/profileTypes'
import {useDropzone} from 'react-dropzone'
import Dropzone from 'react-dropzone';
import CropperComp from '../CropperComp';

const GalleryEditModal = () => { 
    const dispatch = useDispatch();
    const handleGalleryBlockUploadModalClose = () => {dispatch({type : CLOSE_GALLERY_BLOCK_UPLOAD_MODAL})};
    const showGalleryBlockUploadModal = useSelector(state => state.profileInfo.galleryBlockUploadModalState);

    return (
        <Modal show={showGalleryBlockUploadModal} onHide={handleGalleryBlockUploadModalClose}>
            <Modal.Header id="modalHeader" closeButton></Modal.Header>
            <Modal.Body> 
               <CropperComp 
                 type="galleryBlock"
                 apiUrl="/api/galleryImage/uploadGalleryImage"
                 successMessage = "Image has been added"
               />
            </Modal.Body>
        </Modal> 
    )
}

export default GalleryEditModal;