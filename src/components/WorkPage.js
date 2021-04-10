import React, {useEffect, useState} from "react";
import classes from "./WorkPage.module.css";
import background from "../assets/ai.png";
import Navigation from "./Navigation/Navigation";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import apiPostgres from "../shared/api/apiPostgres";


const WorkPage = () => {
    const [customerTrans, setCustomerTrans] = useState([]);


    useEffect(() => {
        getTransHistory();
    }, []);



    // Your GET method to fill in the table goes here
    const getTransHistory = async () => {
        // console.log(workerData.id, "RESPONSE for WORK IDDDdd")
        const response = await apiPostgres.getWorkHistory();
        setCustomerTrans(response.data);
        console.log(response, "RESPONSE for WORK HISTORY")

        console.log(response.data, "RESPONSE for WORK HISTORY DATA");

    }

    const customer = customerTrans.map((item, index) => (
        <tbody>
        <tr  key = {item.id}>

            <th>1</th>
            <th>{item.accountNumber}</th>
            <th>{item.accountType}</th>
            <th style={{margin:"0"}}>{item.Transaction}</th>
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
                                    <th>Account Number</th>
                                    <th>Account Type</th>
                                    <th>Transaction</th>
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