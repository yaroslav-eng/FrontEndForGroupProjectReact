import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import classes from "./Login.module.css";

import React, {useRef, useState} from "react";
import AuthService from "../../shared/servicesApi/auth.service";
import {Link} from "react-router-dom";
import background from "../../assets/ai.png";

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const Login = (props) => {
    const form = useRef();
    const checkBtn = useRef();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const handleLogin = (e) => {
        e.preventDefault();

        setMessage("");
        setLoading(true);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            AuthService.login(username, password).then(
                () => {
                    props.history.push("/dashboard");
                    window.location.reload();
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    setLoading(false);
                    setMessage(resMessage);
                }
            );
        } else {
            setLoading(false);
        }
    };

    return (
        <div className={classes.Login} style={{ backgroundImage: `url(${background})`}}>

        {/*<div className={classes.Login}>*/}
            <nav className="navbar navbar-expand navbar-dark">
                <div className="navbar-brand">
                    <Link to={"/"} className="navbar-brand">
                        <h1>Home</h1>
                    </Link>
                </div>
            </nav>


            <div className={classes.centered}>
            <div className={classes.MiddleContainer}>
                <div className="card card-container bg-transparent"
                     style={{marginTop:"0px",
                         backdropFilter: "brightness(30%)",
                         color: "#FFFFFF",
                         fontFamily: "Raleway"}}>
                    {/*<img*/}
                    {/*    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"*/}
                    {/*    alt="profile-img"*/}
                    {/*    className="profile-img-card"*/}
                    {/*/>*/}
                    <div className={classes.SignIn}>Sign In</div>
                    <Form onSubmit={handleLogin} ref={form}>
                        <div className="form-group">
                            <label htmlFor="username"></label>
                            <Input
                                type="text"
                                className="form-control"
                                placeholder="username"
                                value={username}
                                onChange={onChangeUsername}
                                validations={[required]}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password"></label>
                            <Input
                                type="password"
                                className="form-control"
                                placeholder="password"
                                value={password}
                                onChange={onChangePassword}
                                validations={[required]}
                            />
                        </div>

                        <div className="form-group">
                            <button className="btn btn-block btn-primary" disabled={loading}>
                                {loading && (
                                    <span className="spinner-border spinner-border-sm"></span>
                                )}
                                <span>Sign In</span>
                            </button>
                        </div>

                        {message && (
                            <div className="form-group">
                                <div className="alert alert-danger" role="alert">
                                    {message}
                                </div>
                            </div>
                        )}
                        <CheckButton style={{ display: "none" }} ref={checkBtn} />
                    </Form>
                </div>
            </div>
            </div>
        </div>

    );
};

export default Login;