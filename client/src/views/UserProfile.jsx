import React,{useState} from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'
const UserProfile = () => {
    const[message, setMessage] = useState();
    axios.get('/api/test/context', {
        headers:{
            "Authorization" : Cookies.get("accessToken")
        }
    })
    .then(res => console.log(res))
    .catch(err => console.log(err.response))
    console.log(Cookies.get("accessToken"));
    return(
        <div>
            {message}
        </div>
    );
}

export default UserProfile