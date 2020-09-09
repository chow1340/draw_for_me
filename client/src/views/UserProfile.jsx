import React,{useState, useEffect} from 'react';
import axios from 'axios';
import SingleFileUploader from '../views/component/SingleFileUploader';
import BannerImage from '../views/component/userProfile/BannerImage';
import ProfileBlock from '../views/component/userProfile/ProfileBlock'
import {useDispatch, useSelector} from 'react-redux'
import {SET_IS_OWNER_OF_PROFILE,SET_BANNER, SET_PROFILE_IMAGE, SET_C_PROFILE} from '../redux/actionTypes/user/profileTypes'

const UserProfile = (props) => {
    const profileUsername = props.match.params.username;
    const[cProfile, setcProfile] = useState({});
    const cProfileRedux = useSelector(state => state.cProfile);
    const cUserInfo = useSelector(state => state.cUserInfo);
   

    // const isOwnerOfProfile = false;
    // if(cUserInfo.id == cProfile.id) {
    //     isOwnerOfProfile = true;
    // }
    const dispatch = useDispatch();
    useEffect(async () => {
        async function getCurrentProfile(){
            if(cProfileRedux === undefined) {
                await axios(
                    "/api/profile/getProfileByUsername",
                    {
                        params: {
                            username: profileUsername
                        }
                    }
                )
                .then(res => {
                    setcProfile(res.data);
                    dispatch({type : SET_C_PROFILE, payload: res.data});
                    dispatch({type : SET_BANNER , payload: res.data.bannerImageUrl});
                    dispatch({type : SET_PROFILE_IMAGE, payload : res.data.profileImageUrl});
                    console.log(JSON.stringify(res.data));
                })
                .catch(err => console.log(err.response.data));
            }
        }

        
        getCurrentProfile();
      }, []);
    if(cUserInfo.cUser && cProfile.id == cUserInfo.cUser.id) {
        console.log("ran");
        dispatch({type : SET_IS_OWNER_OF_PROFILE, payload: true});
    }
    return(
        <div className="pageContainer">
            <div className="bannerContainer">
                <BannerImage
                    bannerImageUrl = {cProfile.bannerImageUrl}
                />
            </div>
            
            <div class="container">
                <SingleFileUploader
                    api="/api/profile/uploadProfilePicture"
                    profileId = {cProfile.id}
                />

                <SingleFileUploader
                    api="/api/profile/uploadBannerImage"
                    profileId = {cProfile.id}
                />  
            </div>
        </div>
    );
}

export default UserProfile