import React, { useEffect, useState } from 'react';
import '../../assets/css/userProfile/galleryBlock.css';
import Gallery from 'react-photo-gallery';
import {Dropdown, Alert, Button} from 'react-bootstrap';
import cogoToast from 'cogo-toast';
import Carousel, { Modal, ModalGateway } from "react-images";
import {OPEN_GALLERY_BLOCK_UPLOAD_MODAL, SET_GALLERY_SORTABLE_TRUE,SET_GALLERY_SORTABLE_FALSE} from '../../../redux/actionTypes/user/profileTypes'
import { useDispatch , useSelector } from 'react-redux';
import axios from 'axios';
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";
import Photo from "./Photo";
import Loader from 'react-loader-spinner'

  
//Sortable Gallery
const SortablePhoto = SortableElement(item => <Photo {...item} />);
const SortableGallery = SortableContainer(({ items }) => (
  <Gallery photos={items} renderImage={props => <SortablePhoto {...props} />} />
));

const GalleryBlock = (props) => {
    const dispatch = useDispatch();
    const isOwnerOfProfile = useSelector(state => state.profileInfo.isOwnerOfProfile);

    const [galleryLoaded, setGalleryLoaded] = useState(false);
    const cProfile = useSelector(state => state.profileInfo);
    const cProfileId = cProfile ? cProfile.cProfile.id : "";

    const [galleryPhotos, setGalleryPhotos] = useState([]);

    const handleGalleryBlockUploadOpen = () => {dispatch({type : OPEN_GALLERY_BLOCK_UPLOAD_MODAL})};

    const gallerySortable = useSelector(state => state.galleryImages.gallerySortable);
    const handleGallerySortableOn = () => {dispatch({type : SET_GALLERY_SORTABLE_TRUE})};
    const handleGallerySortableOff = () => {dispatch({type : SET_GALLERY_SORTABLE_FALSE})};
    const onSortEnd = ({ oldIndex, newIndex }) => {
      setGalleryPhotos(arrayMove(galleryPhotos, oldIndex, newIndex));
    };

    const handleSaveOrder = () => {
      if(gallerySortable) {
        for(var i = 0; i < galleryPhotos.length; i++) {
          if(i != galleryPhotos[i].originalOrder){
            axios.post(
              "/api/galleryImage/adjustGalleryOrder",
              {
                galleryId: galleryPhotos[i].galleryId,
                newOrder: i
              }
            )
            .then(
              (res) => {
                console.log(res);
              }
            )
            .catch(
              err => console.log(err.response)
            )
          }
        }
      }
      cogoToast.success("Updated Gallery");
      handleGallerySortableOff();
    }

    //Three dot dropdown
    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
      <a
        href=""
        ref={ref}
        onClick={e => {
          e.preventDefault();
          onClick(e);
        }}
      >
        {children}
        <span className="threedots" />
      </a>
    ));
    
    useEffect(() => {
      async function getGalleryImages(cProfileId){
          await axios.get(
            "/api/galleryImage/loadGalleryImages",
            {
              params : {
                userId: cProfileId,
                offset: 0,
                limit: 20,
              }
            }
          )
          .then(res => {
            var imageList = res.data;
            if(imageList.length > 0){
              // console.log(JSON.stringify(res.data));
              console.log(res.data);
              //Insert images
              for(var i = 0; i < imageList.length; i++) {
                var image = imageList[i];
                var newImage = {
                  src: image.image.imageUrl,
                  width: image.aspectRatioWidth,
                  height: image.aspectRatioHeight,
                  originalOrder: image.imageOrder,
                  galleryId: image.id
                }
                setGalleryPhotos(oldArray => [newImage, ...oldArray])
              }
            }
          })
          .catch(err => {
            console.log(err);
          })
      }
      if(galleryLoaded === false && cProfileId) {
        getGalleryImages(cProfileId);
        setGalleryLoaded(true);
      }
    }, [cProfileId]);

    return(
      <div className = "galleryBlockContainer">
        <div className = "galleryTop">
          {gallerySortable && isOwnerOfProfile &&
            <Alert className="gallerySortAlert" variant="primary">
              <span>Drag the image to reposition.</span>
              <div className="rightButtons">
                <Button onClick={handleSaveOrder}>Save</Button>
                <Button onClick={handleGallerySortableOff}>Close</Button>
              </div>
            </Alert>
          }
         
         {isOwnerOfProfile && 
          <Dropdown>
            <Dropdown.Toggle as={CustomToggle} />
            <Dropdown.Menu size="sm" title="">
              <Dropdown.Item onClick={handleGalleryBlockUploadOpen}>Upload Image</Dropdown.Item>
              <Dropdown.Item onClick={handleGallerySortableOn}>Adjust Gallery Order</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
         }
        </div>
       
        <div className = "galleryDisplay">
          {!gallerySortable && galleryLoaded &&
            <Gallery photos={galleryPhotos} />
          }
          {gallerySortable && galleryLoaded &&
            <SortableGallery items={galleryPhotos} onSortEnd={onSortEnd} axis={"xy"} />
          }
        </div>
      </div>
    )
};


export default GalleryBlock