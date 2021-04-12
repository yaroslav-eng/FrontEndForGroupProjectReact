import React, {Fragment} from "react";
import background from "../assets/ai.png";
import classes from './Landing.module.css';
// import Grid from '@material-ui/core/Grid';
// import { makeStyles } from '@material-ui/core/styles';

// import UserService from "../shared/servicesApi/user.service";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Link} from "react-router-dom";
import Button from "react-bootstrap/cjs/Button";
import Paper from '@material-ui/core/Paper';


// const useStyles = makeStyles((theme) => ({
//     root: {
//         flexGrow: 1,
//     },
//     paper: {
//         padding: theme.spacing(2),
//         textAlign: 'center',
//         color: theme.palette.text.secondary,
//     },
// }));
const Landing = () => {
    // const classes = useStyles();

    // const [content, setContent] = useState("");

    // useEffect(() => {
    //     UserService.getPublicContent().then(
    //         (response) => {
    //             setContent(response.data);
    //         },
    //         (error) => {
    //             const _content =
    //                 (error.response && error.response.data) ||
    //                 error.message ||
    //                 error.toString();
    //
    //             setContent(_content);
    //         }
    //     );
    // }, []);

    return (
        // <Fragment>
        <div className={classes.Landing} style={{ backgroundImage: `url(${background})`}}>
            <div className={classes.centered}>
                {/*change this to REGISTER*/}
                <Link to={"/register"} className="nav-link">
                    {/*<Link to={"/dashboard"} className="nav-link">*/}
                    <div className="mb-2">
                        <Button variant="primary" size="lg">
                            Sign Up
                        </Button>
                    </div>
                </Link>

                <Link to={"/login"} className="nav-link">
                    {/*<div className={classes.Register}>Join The Team by Signing Up</div>*/}
                    <div className="mb-2">
                        <Button variant="primary" size="lg">
                            Sign In
                        </Button>
                    </div>
                </Link>
            </div>
        </div>
        // {/*</Fragment>*/}

    );
};

export default Landing;