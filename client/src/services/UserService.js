import React, {useState} from "react";
import axios from 'axios'
import { connect, useSelector, useDispatch } from "react-redux";
import { loginType } from "../redux/actionTypes";

export default function IsLoggedInState(){
    // const dispatch = useDispatch();
    // const isLoggedIn = useSelector(state => state.isLoggedIn);
    // axios.get(
    //     '/api/auth/isLoggedIn'
    // )
    // .then(
    //     res => {
    //         console.log("ran");
    //         dispatch({
    //             type: loginType.LOG_OUT
    //         });
    //     }
    // ).catch(
    //     err => {
    //         dispatch({
    //             type: loginType.LOG_OUT
    //         });
    //     }
    // )
    // return isLoggedIn;
}

