import React, {useEffect, useState} from "react";
import classes from "./WorkPage.module.css";
import background from "../assets/ai.png";
import Navigation from "./Navigation/Navigation";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import apiPostgres from "../shared/api/apiPostgres";
import AuthService from "../shared/servicesApi/auth.service";
import {Link} from "react-router-dom";
import Button from "react-bootstrap/cjs/Button";

const WorkPage = () => {
    const currentUser = AuthService.getCurrentUser();
    const [customerTrans, setCustomerTrans] = useState([]);


    const [defUser, setDefUser] = useState("");

    useEffect(()=> {
        onChangeUser()
    }, []);


    const onChangeUser = () => {
        const defUser = currentUser.user;
        setDefUser(defUser);
        getUserInfo(defUser.user_id);
    };

    console.log(defUser, "THIS IS USEER");


    // Your GET method to fill in the table goes here
    const getUserInfo = async (props) => {
        const response = await apiPostgres.getUserAccounts(props);
        setCustomerTrans(response.data);
        // console.log(response, "RESPONSE for GET USER")

        console.log(response.data, "RESPONSE for GET USER DATA");

    }


    const arr = customerTrans[0];
    console.log(arr, " customer new")
    const customer = customerTrans.map((account) => (

        <tbody>
        <tr  key = {account.acc_id}>

            <th>{account.acc_id}</th>
            <th>{account.account_number}</th>
            <th>{account.account_type}</th>
            <th style={{margin:"0"}}>{account.balance}</th>
            <th style={{margin:"0"}}>    <Link to={"/transactionsView"} className="nav-link">
                <div className="mb-2">
                    <Button variant="primary" size="sm">
                        view transactions
                    </Button>
                </div>
            </Link></th>
            {/*<th>*/}
            {/*    {item.pay_stub ? (*/}
            {/*        <span onClick={()=>pdfClick(index, item.id)} style={{cursor:"pointer"}}> PDF</span>*/}
            {/*    ) : null}*/}
            {/*</th>*/}
        </tr>
        </tbody>
    ));
    return (
        <div className={classes.WorkPage} style={{ backgroundImage: `url(${background})`}}>
        <Navigation/>

                <Container>
                    <Row>
                        <Col className={classes.tables}>
                            <Table bordered hover size="sm">
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th> Account Number</th>
                                    <th>Account Type</th>
                                    <th>Balance</th>
                                    <th>Transactions</th>
                                </tr>
                                </thead>
                                {customer}
                            </Table>
                        </Col>
                    </Row>
                </Container>
        </div>
    );
}

export default WorkPage;