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
import Button from "react-bootstrap/cjs/Button";
import {Link} from "react-router-dom";

const Transactions = () => {
    const currentAccount= AuthService.getCurrentAccount();
    const [tranactions, setTransactions] = useState([]);


    const [defAccount, setDefAccount] = useState("");

    useEffect(()=> {
        onChangeAccount()
    }, []);


    const onChangeAccount = () => {
        const defAccount = currentAccount.user; //.user is wrong NEEDS TO BE CHANGED
        setDefAccount(defAccount);
        getTransactionInfo(defAccount.acc_number);
    };

    console.log(defAccount, "THIS IS current account");


    // Your GET method to fill in the table goes here
    const getTransactionInfo = async (props) => {
        const response = await apiPostgres.getAccountTransactions(props);
        setTransactions(response.data);
        // console.log(response, "RESPONSE for GET USER")

        console.log(response.data, "RESPONSE for GET Account DATA");

    }


    const arr = tranactions[0];
    console.log(arr, " Transactions list")
    const transaction = tranactions.map((transaction) => (

        <tbody>
        <tr  key = {transaction.t_id}>

            <th>{transaction.t_info}</th>
            <th>{transaction.t_amount}</th>
            <th>{transaction.t_date}</th>
            <th style={{margin:"0"}}>{transaction.sender_acc_num}</th>
            <th style={{margin:"0"}}>{transaction.receiver_acc_num}</th>
            {/*<th>*/}
            {/*    {item.pay_stub ? (*/}
            {/*        <span onClick={()=>pdfClick(index, item.id)} style={{cursor:"pointer"}}> PDF</span>*/}
            {/*    ) : null}*/}
            {/*</th>*/}
        </tr>
        </tbody>
    ));
    return (
        <div className={classes.Transactions} style={{ backgroundImage: `url(${background})`}}>
            <Navigation/>

            <Container>
                <Row>
                    <Col className={classes.tables}>
                        <Table bordered hover size="sm">
                            <thead>
                            <tr>
                                <th>Transaction Info</th>
                                <th>Amount</th>
                                <th>Date</th>
                                <th>Sender's Account</th>
                                <th>Receiver's Account</th>
                            </tr>
                            </thead>
                            {transaction}
                        </Table>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Transactions;