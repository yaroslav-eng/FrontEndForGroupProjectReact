import React, {useEffect, useState} from 'react';

import classes from './Navigation.module.css';
// import NavigationItem from './NavigationItem/NavigationItem';
import {Link} from "react-router-dom";
// import AuthService from "../../../shared/servicesApi/auth.service";
// import CreateEmployee from "../../Page/CreateEmployee/CreateEmployee";


const Navigation = ( props ) => {
    const [showModeratorBoard, setShowModeratorBoard] = useState(false);
    const [showAdminBoard, setShowAdminBoard] = useState(false);
    const [showUserBoard, setShowUserBoard] = useState(false);
    const [currentUser, setCurrentUser] = useState(undefined);

    // useEffect(() => {
    //     const user = AuthService.getCurrentUser();
    //
    //     if (user) {
    //         setCurrentUser(user);
    //         setShowModeratorBoard(user.roles.includes("accountant"));
    //         setShowAdminBoard(user.roles.includes("admin"));
    //         setShowUserBoard(user.roles.includes("user"));
    //     }
    // }, []);
    //
    // console.log(currentUser, "USER");
    // console.log(setShowAdminBoard, "ADMIN BOARD");
    //
    //
    // const logOut = () => {
    //     AuthService.logout();
    // };

    return (
        <div className={classes.NavigationItems} style={{width:"100%"}} >

            <nav className="navbar navbar-expand">
                <div className="navbar-brand"> <h1>HOME</h1></div>
                {/*<Link to={"/"} className="navbar-brand">*/}
                {/*    <h1>HOME</h1>*/}
                {/*</Link>*/}

                <div className="navbar-nav mr-auto">
                    {/*<li className="nav-item">*/}
                    {/*    /!*<a className="nav-link" href="/home">Home</a>*!/*/}
                    {/*        <Link to={"/home"} className="nav-link">*/}
                    {/*            <div className={classes.login}>Home</div>*/}
                    {/*        </Link>*/}
                    {/*</li>*/}



                    {showModeratorBoard && (
                        <li className="nav-item">
                            <Link to={"/mod"} className="nav-link">
                                Auth: Moderator
                            </Link>
                        </li>
                    )}

                    {showAdminBoard && (
                        <li className="nav-item">
                            <Link to={"/admin"} className="nav-link">
                                Auth: Admin
                            </Link>
                        </li>
                    )}

                    {showUserBoard && (
                        <li className="nav-item">
                            <Link to={"/profile"} className="nav-link">
                                Auth: User
                            </Link>
                        </li>
                    )}
                </div>


                    <div className="navbar-nav ml-auto">
                        {/*<li className="nav-item">*/}
                        {/*    <Link to={"/profile"} className="nav-link">*/}
                        {/*        Hello {currentUser.username}*/}
                        {/*    </Link>*/}
                        {/*</li>*/}
                        <li className="nav-item">
                            <Link to={"/"} className="nav-link">
                                {/*<div href="/login" className="nav-link" onClick={logOut}>*/}
                                <div className={classes.logout}>
                                    LogOut
                                </div>
                            </Link>
                        </li>
                    </div>
            </nav>
        </div>
    );
}

export default Navigation;