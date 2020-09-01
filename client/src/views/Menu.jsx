import React, {useState, useEffect} from 'react';
import Home from './Home';
import Register from './Register';
import Example from './Example';
import LogIn from './LogIn'
import UserProfile from './UserProfile';
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom'
import LogOutButton from '../views/component/LogOutButton';
import Cookie from 'js-cookie';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import useScript from '../hooks/useScript';
import { FaUser } from 'react-icons/fa';


function Menu(){
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [collapsed, setCollapsed] = useState(true);
    const toggleNavbar = () => setCollapsed(!collapsed);
    useEffect(() => {
        if(Cookie.get("loggedIn")) {
            setIsLoggedIn(true);
            console.log(isLoggedIn);
        } 
      });

    const logButton = () => {
        if(isLoggedIn) {
            return (
                <span className="navbarItems">
                    <FaUser></FaUser>
                    <NavLink href="/api/logout">Log Out</NavLink>
                </span>
            );
        } else {
            return (
                <span className = "navbarItems">
                    <NavLink href="/logIn">Log In</NavLink>
                    <NavLink href="/register">Register</NavLink>
                </span>
            );
        }
    }
    // const registerButton = () => {
    //     if(!isLoggedIn){
    //         return (
    //         )
    //     }
    // }
    return(
        <Router>
        <div>
       
        <Navbar color="faded" light>
            <NavbarBrand href="/" className="mr-auto">APP_TITLE</NavbarBrand>
            {/* {registerButton()} */}
            {logButton()}
            <NavbarToggler onClick={toggleNavbar} className="mr-2" />
            <Collapse isOpen={!collapsed} navbar>
            <Nav navbar>
                <NavItem>
                <NavLink href="/components/">Components</NavLink>
                </NavItem>
                <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
                </NavItem>
            </Nav>
            </Collapse>
        </Navbar>
        </div>
        <Route path="/profile"  exact component={UserProfile} />
        <Route path="/register" exact component={Register} />
        <Route path="/logIn" exact component={LogIn} />
        <Route path="/example" exact component = {Example} />
        </Router>
    );
}

export default Menu