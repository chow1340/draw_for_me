import React,{useState, useEffect} from 'react';
import axios from 'axios';
import SingleFileUploader from '../views/component/SingleFileUploader';
import BannerImage from '../views/component/userProfile/BannerImage';
import ProfileBlock from '../views/component/userProfile/ProfileBlock'
import {useDispatch} from 'react-redux'
import {SET_BANNER} from '../redux/actionTypes/profileTypes'

const UserProfile = (props) => {
    const[cUser, setcUser] = useState({});
    const[file, setFile] = useState(); 
    const[profilePic, setProfilePic] = useState(); 
    const dispatch = useDispatch();

    useEffect(async () => {
        async function getCurrentUser(){
            const result = await axios(
                "/api/profile/loggedInUserProfile",
            )
            .then(res => {
                setcUser(res.data);
                dispatch({type : SET_BANNER , payload: res.data.bannerImageUrl})
                console.log(JSON.stringify(res.data));
            })
            .catch(err => console.log(err.response.data));
        }
        
        getCurrentUser();
      }, []);
    
    return(
        <div className="pageContainer">
            <div className="bannerContainer">
                <BannerImage
                    bannerImageUrl = {cUser.bannerImageUrl}
                />
                <ProfileBlock
                    profileImgUrl = {cUser.profileImgUrl}
                />
            </div>
            
            <div class="container">
                <SingleFileUploader
                    api="/api/profile/uploadProfilePicture"
                    profileId = {cUser.id}
                />

                <SingleFileUploader
                    api="/api/profile/uploadBannerImage"
                    profileId = {cUser.id}
                />  
            </div>
        </div>
    );
}

export default UserProfile