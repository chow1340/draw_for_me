import React,{useState, useEffect} from 'react';
import axios from 'axios';
import '../views/assets/css/userprofile.css';
import SingleFileUploader from '../views/component/SingleFileUploader';
import BannerImage from '../views/component/userProfile/BannerImage';
const UserProfile = (props) => {
    const[cUser, setcUser] = useState({});
    const[file, setFile] = useState(); 
    const[profilePic, setProfilePic] = useState(); 

    useEffect(async () => {
        async function getCurrentUser(){
            const result = await axios(
                "/api/profile/loggedInUserProfile",
            )
            .then(res => {
                setcUser(res.data);
                console.log(JSON.stringify(res.data));
            })
            .catch(err => console.log(err.response.data));
        }
        
        getCurrentUser();
      }, []);
    
    return(
        <div>
            <div className="bannerContainer">
                <BannerImage
                    bannerImageUrl = {cUser.bannerImageUrl}
                ></BannerImage>
            </div>
            
            <div class="container">
                {/* {JSON.stringify(cUser)}
                <SingleFileUploader
                    api="/api/profile/uploadProfilePicture"
                    profileId = {cUser.id}
                />

                <SingleFileUploader
                    api="/api/profile/uploadBannerImage"
                    profileId = {cUser.id}
                />   */}
            </div>
        </div>
    );
}

export default UserProfile