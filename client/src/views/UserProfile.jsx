import React,{useState, useEffect, Fragment} from 'react';
import axios from 'axios';
import BannerImage from '../views/component/userProfile/BannerImage';
import ProfileCropModal from './component/userProfile/Modals/ProfileCropModal';
import ProfileEditorModal from './component/userProfile/Modals/ProfileEditorModal';
import BannerCropModal from './component/userProfile/Modals/BannerCropModal';
import GalleryBlockUploadModal from './component/userProfile/Modals/GalleryBlockUploadModal';
import {useDispatch, useSelector} from 'react-redux'
import {SET_IS_OWNER_OF_PROFILE,SET_BANNER, SET_PROFILE_IMAGE, SET_C_PROFILE} from '../redux/actionTypes/user/profileTypes'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import '../views/assets/css/userProfile/profile.css';
import GalleryBlock from './component/userProfile/GalleryBlock';

function TabPanel(props) {

    const { children, value, index, cProfile, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === 0 && (
          <GalleryBlock
            cProfile = {props.cProfile}
          ></GalleryBlock>
        )}
      </div>
    );
  }
  

const UserProfile = (props) => {
    
    const profileUsername = props.match.params.username;
    const[cProfile, setcProfile] = useState({});
    const cProfileRedux = useSelector(state => state.cProfile);
    const cUserInfo = useSelector(state => state.cUserInfo);
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    function a11yProps(index) {
        return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
        };
      }

    const dispatch = useDispatch();

    useEffect(() => {
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
                    // console.log(JSON.stringify(res.data));
                })
                .catch(err => console.log(err.response.data));
            }
        }
        getCurrentProfile();
      }, []);


    if(cUserInfo.cUser && cProfile.id == cUserInfo.cUser.id) {
        dispatch({type : SET_IS_OWNER_OF_PROFILE, payload: true});
    }
    return(
        <div className="pageContainer">
            <div className="bannerContainer">
                <BannerImage
                    bannerImageUrl = {cProfile.bannerImageUrl}
                />
            </div>
            <div className = "pageBodyContainer">
                <AppBar position="static" style={{backgroundColor:"black"}}>
                    <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                        <Tab label="Gallery" {...a11yProps(0)} ></Tab>
                        <Tab label="About" {...a11yProps(1)} />
                        <Tab label="Item Three" {...a11yProps(2)} />
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0} cProfile={cProfile}>
          
                </TabPanel>

                <TabPanel value={value} index={1}>
                </TabPanel>

                <TabPanel value={value} index={2}>
                </TabPanel>

            </div>
            <BannerCropModal/>
            <ProfileEditorModal/>
            <ProfileCropModal/>
            <GalleryBlockUploadModal />
          
        </div>
    );
}

export default UserProfile