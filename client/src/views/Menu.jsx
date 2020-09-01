import React, {useState, useEffect} from 'react';
import Home from './Home';
import Register from './Register';
import Example from './Example';
import LogIn from './LogIn'
import UserProfile from './UserProfile';
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom'
import LogOutButton from '../views/component/LogOutButton';
import Cookie from 'js-cookie';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink,UncontrolledDropdown,DropdownToggle,DropdownItem, DropdownMenu, NavbarText} from 'reactstrap';
import useScript from '../hooks/useScript';
import { FaUser, FaBars } from 'react-icons/fa';


function Menu(){
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
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
                    <FaUser id="navbarUserIcon"></FaUser>
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
    // const registerButton = () => {
    //     if(!isLoggedIn){
    //         return (
    //         )
    //     }
    // }
    return(
        <Router>
        <div className="navCustom">
       
        <Navbar  expand="md">
        <NavbarBrand id="navbarTitle" href="/">APP_TITLE</NavbarBrand>
        <NavbarToggler onClick={toggle} className="mr-2"/>
        {/* <Collapse isOpen={isOpen} navbar> */}
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
        {/* </Collapse> */}
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