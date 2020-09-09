import React, {useEffect, useState} from 'react';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app
import './views/assets/vendor/aos/aos.css';
import './views/assets/vendor/bootstrap/css/bootstrap.css';
import './views/assets/vendor/icofont/icofont.min.css';
import './views/assets/css/main.css';
import Menu from './views/Menu';
import { useSelector, useDispatch } from "react-redux";
import {SET_C_USER} from "./redux/actionTypes/user/currentUserTypes";
import axios from 'axios';

function App() {
  const dispatch = useDispatch();
  const [cUser, setCUser] = useState();
 
  useEffect(async () => {
    async function getCurrentProfile(){
            const result = await axios(
                "/api/profile/loggedInUserProfile"
            )
            .then(res => {
                setCUser(res.data);
                dispatch({type: SET_C_USER, payload: res.data});
                console.log(JSON.stringify(res.data));
            })
            .catch(err => console.log(err.response.data));
    }
    
    getCurrentProfile();
  }, []);

  return (
    <div className="App">
      <Menu 
        cUser = {cUser}
      />
       
    </div>
  );
}

export default App;
