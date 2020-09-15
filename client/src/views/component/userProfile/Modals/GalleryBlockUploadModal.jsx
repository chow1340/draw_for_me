import React, {useEffect, useState} from 'react';
import {Modal, Form, Button} from 'react-bootstrap';
import {useSelector, useDispatch} from 'react-redux';
import {CLOSE_GALLERY_BLOCK_UPLOAD_MODAL} from '../../../../redux/actionTypes/user/profileTypes'
import {useDropzone} from 'react-dropzone'
import Dropzone from 'react-dropzone';

const GalleryBlockUploadModal = () => { 
    const [files, setFiles] = useState([]);
    const {getRootProps, getInputProps} = useDropzone({
      accept: 'image/*',
      onDrop: acceptedFiles => {
        setFiles(acceptedFiles.map(file => Object.assign(file, {
          preview: URL.createObjectURL(file)
        })));
      }
    });
    
    const thumbs = files.map(file => (
      <div className="thumb" key={file.name}>
        <div className="thumbInner">
          <img
            src={file.preview}
            className="thumbImg"
          />
        </div>
      </div>
    ));
  
    useEffect(() => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);

    const dispatch = useDispatch();
    const handleGalleryBlockUploadModalClose = () => {dispatch({type : CLOSE_GALLERY_BLOCK_UPLOAD_MODAL})};
    const showGalleryBlockUploadModal = useSelector(state => state.profileInfo.galleryBlockUploadModalState);
    return (
        <Modal show={showGalleryBlockUploadModal} onHide={handleGalleryBlockUploadModalClose}>
            <Modal.Header id="modalHeader" closeButton></Modal.Header>
            <Modal.Body> 
                {/* <Dropzone 
                // onDrop={acceptedFiles => console.log(acceptedFiles)}
                    getUploadParams={getUploadParams}
                    onChangeStatus={handleChangeStatus}
                    onSubmit={handleSubmit}
                    styles={{ dropzone: { minHeight: 200, maxHeight: 250 } }}
            
                >
                    {({getRootProps, getInputProps}) => (
                        <section>
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <p>Drag 'n' drop some files here, or click to select files</p>
                        </div>
                        </section>
                    )}
                </Dropzone> */}

                <section className="container">
                    <div {...getRootProps({className: 'dropzone'})}>
                        <input {...getInputProps()} />
                        <p>Drag 'n' drop some files here, or click to select files</p>
                    </div>
                    <aside className="thumbsContainer">
                        {thumbs}
                    </aside>
                </section>

          

            </Modal.Body>
        </Modal> 
    )
}

export default GalleryBlockUploadModal;