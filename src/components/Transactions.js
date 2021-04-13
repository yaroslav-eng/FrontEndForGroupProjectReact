import React, {useEffect, useState} from "react";
import classes from "./Transactions.module.css";
import background from "../assets/ai.png";
import Navigation from "./Navigation/Navigation";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import apiPostgres from "../shared/api/apiPostgres";
import AuthService from "../shared/servicesApi/auth.service";
import Button from "react-bootstrap/cjs/Button";
import {Link} from "react-router-dom";
import Popup from './Popup';
import { useHistory } from "react-router-dom";


const Transactions = (props) => {
    // const currentAccount= AuthService.getCurrentAccount();
    const [transactions, setTransactions] = useState([]);

    const [lgShow, setLgShow] = useState(false);

    const [curTrans, setCurTrans] = useState('Transfer')
    const [dest_user_id,setDestUserId] = useState(0);
    const [amount, setAmount] = useState(0);
    const [accNumber,setAccNumber] = useState(0);
    const [id, setId] = useState(0);

    const [error, setError] = useState('')
    const [success,setSuccess] = useState('');

    const [transactionType, setTransactionType] = useState(['Transfer','Withdraw','Deposit'])
    const Transaction = transactionType.map(Transaction => Transaction)

    let history = useHistory();

    useEffect(()=> {
        if (props.location.aboutProps != null) {
            localStorage.setItem("accountNumber", props.location.aboutProps.number);
            localStorage.setItem("user_id", props.location.aboutProps.user_id);
        }
        const num =localStorage.getItem("accountNumber");

        getTransactionInfo(num);
    }, []);


    const addTransaction = async () => {
        if (curTrans === 'Transfer' && dest_user_id === 0) {
            setError("Need a recepient id")
        }

        if(amount <= 0) {
            setError('amount needs to be more than 0')
        }

        const account_number =localStorage.getItem("accountNumber");
        const user_id = localStorage.getItem("user_id");
        switch(curTrans) {
            case 'Withdraw':
                console.log("withdraw logic ");
                console.log("amount: ", amount);
                console.log("account_number: ", account_number);
                console.log("user_id: ", user_id);
                await apiPostgres.withdraw({
                    amount,
                    account_number,
                    user_id
                });
                window.location.reload();
                break;
            case 'Deposit':
                console.log("deposit logic");
                console.log("amount: ", amount);
                console.log("account_number: ", account_number);
                console.log("user_id: ", user_id);
               await apiPostgres.deposit({
                    amount,
                    account_number,
                    user_id,

                });
                window.location.reload();
                break;
            case 'Transfer':
                console.log("transfer logic")
                const src_account_number =localStorage.getItem("accountNumber");
                console.log("amount: ", amount);
                console.log("account_number: ", src_account_number);
                console.log("user_id: ", user_id);
               await apiPostgres.transfer({
                    amount,
                    src_account_number,
                    user_id,
                    dest_user_id
                });
                window.location.reload();
                break;
            default:
                break;
        }
        console.log("Amount: " + String(amount))
        console.log("Recipent ID: " + String(dest_user_id))
    }

    // const onChangeAccount = () => {
    //     const defAccount = currentAccount.user; //.user is wrong NEEDS TO BE CHANGED
    //     setDefAccount(defAccount);
    //     getTransactionInfo(defAccount.acc_number);
    // };
    //
    // console.log(defAccount, "THIS IS current account");
    //

    // Your GET method to fill in the table goes here
    const getTransactionInfo = async (props) => {
        console.log("about", props);
        // const number = props.location.aboutProps;
        // console.log(number.number, "RESPONSE for TRANSACTIONS");
        const response =  await apiPostgres.getAccountTransactions(props);
        setTransactions(response.data);
        // console.log(response, "RESPONSE for GET USER")
        // console.log(number, "RESPONSE for TRANSACTIONS");

    }


    // const arr = tranactions[0];
    // console.log(transactions, " Transactions list")
    const transaction = transactions.map((transaction) => (

        <tbody>
        <tr  key = {transaction.t_id}>

            <th>{transaction.info}</th>
            <th>{transaction.amount}</th>
            <th>{transaction.date}</th>
            <th style={{margin:"0"}}>{transaction.sender_num}</th>
            <th style={{margin:"0"}}>{transaction.receiver_num}</th>
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
                <Row >
                   <Col>
                            <Button onClick={() => history.goBack()}>Back</Button>
                        </Col>
                        <Col>
                            <Button onClick={() => setLgShow(true)}>Transaction Menu</Button>
                        </Col>
                </Row>
            </Container>
            {/*<Button onClick={() => setLgShow(true)}>Transaction Menu</Button>*/}
            <Modal
                size="lg"
                show={lgShow}
                onHide={() => setLgShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Transactions
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h1>Add a transaction</h1>
                    <br/>
                    {
                        success && <div className={"alert alert-success"}>{success}</div>
                    }
                    {
                        error && <div className={"alert alert-danger"}>{error}</div>
                    }
                    <br />
                    <select
                        onChange={e => setCurTrans(transactionType[e.target.value])}
                        className="browser-default custom-select" >
                        {
                            Transaction.map((trans, key) => <option value={key}>{trans}</option>)
                        }
                    </select>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Amount</label>
                        <input  value={amount} onChange={(e) => setAmount(e.target.value)}  type="number" className="form-control" step="0.01" placeholder="54.34" />
                        {
                            curTrans === 'Transfer' && <>
                                <label htmlFor="exampleFormControlInput1" className="form-label">Recipient ID #</label>
                                <input value={dest_user_id} onChange={(e) => setDestUserId(e.target.value)} type="number" className="form-control" placeholder="323423" />
                            </>
                        }
                        <button className={"btn btn-primary"} onClick={() => addTransaction()}>Add Transaction</button>
                    </div>

                </Modal.Body>
            </Modal>

        </div>
    );
}

export default Transactions;