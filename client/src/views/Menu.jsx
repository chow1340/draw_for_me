import React, {useState, useEffect} from 'react';
import Home from './Home';
import Register from './Register';
import Example from './Example';
import LogIn from './LogIn'
import UserProfile from './UserProfile';
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom';
import axios from 'axios';
import {SET_C_USER} from "../redux/actionTypes/user/currentUserTypes"
import Cookie from 'js-cookie';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink,UncontrolledDropdown,DropdownToggle,DropdownItem, DropdownMenu, NavbarText} from 'reactstrap';
import { FaUser, FaBars } from 'react-icons/fa';
import { useSelector, useDispatch } from "react-redux";
import "../views/assets/css/menu.css"


const Menu = (props) => {
    const dispatch = useDispatch();
    const [navProfileImage, setNavProfileImage] = useState();
    const cUserInfo = useSelector(state => state.cUserInfo.cUser);
    const [cUser, setCUser] = useState();
    useEffect(() => {
        if(cUserInfo) {
          setNavProfileImage(cUserInfo.profileImageUrl);
        }
      });
      

      useEffect(() => {
        async function getCurrentUser(){
            const result = await axios(
                "/api/profile/loggedInUserProfile"
            )
            .then(res => {
                const userData = res.data
                setCUser(userData);
                dispatch({type: SET_C_USER, payload: userData});
            })
            .catch(err => console.log(err));
        }
        
        getCurrentUser();
      }, []);
    
    //Dropdown
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    
    const cUserUsername = cUser ? cUser.username : "";
    // const cUser = Cookie.get("c_user");
    const navbarProfileImage = () => {
        if(navProfileImage) {
            return (
                <a id="navbarProfileImageContainer" href={"/user/"+ cUserUsername}><img id="navbarProfileImage" src={navProfileImage}></img></a>
            )
        } else {
            return (
              <a href={"/user/" + cUserUsername}><FaUser id="navbarUserIcon"></FaUser></a>
            )
        }
    }
    
    const logButton = () => {
        if(Cookie.get("c_user")) {
            return (
                <span className="navbarItems">
                    {navbarProfileImage()}
                    {/* <a href={"/user/"+cUser}><FaUser id="navbarUserIcon"></FaUser></a> */}
                    <NavLink href="/api/logout">Log Out</NavLink>
                </span>
            );
        } else {
            return (
                <span className = "navbarItems">
                    <NavItem>
                        <NavLink href="/logIn">Log In</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/register">Register</NavLink>
                    </NavItem>
                </span>
            );
        }
    }

    return(
        <Router>
        <div>
       
        <Navbar expand="md">
        <NavbarBrand id="navbarTitle" href="/">APP_TITLE</NavbarBrand>
        <NavbarToggler onClick={toggle} className="mr-2"/>
          <Nav className="ml-auto" navbar>
            <NavItem>
                {logButton()}
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
              <FaBars color="whitesmoke"></FaBars>
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  Option 1
                </DropdownItem>
                <DropdownItem>
                  Option 2
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  Reset
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
      </Navbar>
        </div>
        <Route path="/profile"  exact component={UserProfile} />
        <Route path="/register" exact component={Register} />
        <Route path="/logIn" exact component={LogIn} />
        <Route path="/example" exact component = {Example} />
        <Route path="/user/:username" component = {UserProfile} />
        <Route
            path='/user/:username'
        />
        </Router>
    );
}

export default Menu