import React, {useState, useRef, Fragment} from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import classes from "./Register.module.css";
import AuthService from "../../shared/servicesApi/auth.service";
import {Link} from "react-router-dom";
// import CreateEmployee from "../Page/CreateEmployee/CreateEmployee";
import 'bootstrap/dist/css/bootstrap.min.css';
import background from "../../assets/ai.png";
// import Buttons from "../../UI/Button/Buttons";

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const validEmail = (value) => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                This is not a valid email.
            </div>
        );
    }
};

const vusername = (value) => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div className="alert alert-danger" role="alert">
                The username must be between 3 and 20 characters.
            </div>
        );
    }
};

const vpassword = (value) => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div className="alert alert-danger" role="alert">
                The password must be between 6 and 40 characters.
            </div>
        );
    }
};

const Register = (props) => {
    const form = useRef();
    const checkBtn = useRef();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };
    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };
    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const handleRegister = (e) => {
        e.preventDefault();

        setMessage("");
        setSuccessful(false);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            AuthService.register(username, email, password).then(
                (response) => {
                    setMessage(response.data.message);
                    setSuccessful(true);
                    props.history.push("/login");
                    window.location.reload();
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    setMessage(resMessage);
                    setSuccessful(false);
                }
            );
        }
    };

    return (
        <div className={classes.Register} style={{ backgroundImage: `url(${background})`}}>
            <nav className="navbar navbar-expand navbar-dark">
                <div className="navbar-brand">
                    <Link to={"/"} className="navbar-brand">
                        <h1>Home</h1>
                    </Link>
                </div>
            </nav>


            <div className={classes.centered}>

            <div className="col-md-12">
                <div className="card card-container bg-transparent"
                     style={{marginTop:"0px",
                         width:"20rem",
                         backdropFilter: "brightness(30%)",
                         color: "#FFFFFF",
                         fontFamily: "Raleway"}}>
                    <div className={classes.Reg}>Register</div>

                    <Form onSubmit={handleRegister} ref={form}>
                        {!successful && (
                            <div>
                                <div className="form-group">
                                    <label htmlFor="username"></label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        placeholder="username"
                                        value={username}
                                        onChange={onChangeUsername}
                                        validations={[required, vusername]}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email"></label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        placeholder="email"
                                        value={email}
                                        onChange={onChangeEmail}
                                        validations={[required, validEmail]}
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
                                        validations={[required, vpassword]}
                                    />
                                </div>

                                <div className="form-group">

                                    {/*<Buttons btnType="Success" className="btn btn-block">*/}
                                    {/*    Submit Employee*/}
                                    {/*</Buttons>*/}
                                    <button className="btn btn-block btn-primary">Sign Up</button>
                                </div>
                            </div>
                        )}

                        {message && (
                            <div className="form-group">
                                <div
                                    className={ successful ? "alert alert-success" : "alert alert-danger" }
                                    role="alert"
                                >
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

export default Register;