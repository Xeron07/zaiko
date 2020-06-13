/**
 * /*!
 *
 * =========================================================
 * Black Dashboard React v1.1.0
 * =========================================================
 *
 * Product Page: https://www.creative-tim.com/product/black-dashboard-react
 * Copyright 2020 Creative Tim (https://www.creative-tim.com)
 * Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)
 *
 * Coded by Creative Tim
 *
 * =========================================================
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * @format
 */

import React from "react";
import { Link } from "react-router-dom";
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";

// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Label,
  FormGroup,
  Input,
  Table,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

// core components
import {
  chartExample1,
  chartExample2,
  chartExample3,
  chartExample4,
} from "variables/charts.js";
import axios from "axios";
import Swal from "sweetalert2";
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.monthName = {
      1: "Jan",
      2: "Feb",
      3: "Mar",
      4: "Apr",
      5: "May",
      6: "Jun",
      7: "Jul",
      8: "Aug",
      9: "Sep",
      10: "Oct",
      11: "Nov",
      12: "Dec",
    };
    this.state = {
      sellData: {},
      purchaseData: {},
      totalSelled: [],
      totalPurchased: [],
      stockData: {},
      profit: 0,
      fishTypes: 0,
      isLoading: true,
    };
  }

  componentDidMount = () => {
    this.relaodData();
  };

  relaodData = () => {
    this.setState({ isLoading: true });
    fetch("/api/operation/all")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.state.sellData = data.sellData;
        this.state.purchaseData = data.purchaseData;
        this.state.totalSelled = [...data.totalSelled];
        this.state.totalPurchased = [...data.totalPurchased];
        this.state.profit = data.profit;
        this.state.stockData = { ...data.stockData[0] };
        this.state.fishTypes = data.fishTypes;
        this.setState(this.state);
      });

    this.setState({ isLoading: false });
  };

  sellInfo = () => {
    if (this.state.sellData == null) {
      return <h3>🍎 No Sell</h3>;
    } else {
      return (
        <div>
          <h5>Total Amount : {this.state.sellData.totalAmount}</h5>
          <h5>Recieved Today : {this.state.sellData.recieved}</h5>
          <h5>Due Of Today : {this.state.sellData.due}</h5>
        </div>
      );
    }
  };

  purchaseInfo = () => {
    if (this.state.purchaseData == null) {
      return <h5>🍏 No Purchase</h5>;
    } else {
      return (
        <div className='ml-2'>
          <h5>Total Amount : {this.state.purchaseData.totalAmount}</h5>
          <h5>Paid Today : {this.state.purchaseData.paid}</h5>
          <h5>Due Of Today : {this.state.sellData.due}</h5>
        </div>
      );
    }
  };

  stockInfo = () => {
    if (this.state.stockData.totalFish == null) {
      return <h3>🎣 No Stock Data</h3>;
    } else {
      return (
        <div className='ml-2'>
          <h5>Total Fish Of Type(s) : {this.state.fishTypes}</h5>
          <h5>Total Fish : {this.state.stockData.totalFish} Unit(s)</h5>
          <h5>Total Amount: {this.state.stockData.totalStock}</h5>
        </div>
      );
    }
  };

  sellDataUi = () => {
    if (this.state.totalSelled.length <= 0)
      return <h3 style={{ textAlign: "center" }}>No Data Found</h3>;
    const tdata = this.state.totalSelled.reverse();
    return (
      <Table className='tablesorter' responsive>
        <thead className='text-primary'>
          <tr>
            <th>Time</th>
            <th>Total</th>
            <th>Quantity</th>
            <th>Paid</th>

            <th>Client</th>
            <th>Expense</th>
            <th>product</th>
          </tr>
        </thead>
        <tbody>
          {tdata.map((m) => {
            let date = new Date(m.time);
            return (
              <tr>
                <td>{`${date.getDate()}/${
                  this.monthName[date.getMonth() + 1]
                }/${date.getFullYear()}`}</td>

                <td>{m.payment.amount}</td>
                <td>{m.product.quantity}</td>
                <td>{m.payment.paid}</td>

                <td>
                  <Link to={`/admin/clent/${m.cid}`}>Client</Link>
                </td>

                <td>
                  <Link
                    to={`/admin/exp/${m.payment.e_id}`}
                    disabled={m.payment.e_id == 0 ? true : false}>
                    Expense
                  </Link>
                </td>
                <td>
                  <Link to={`/admin/single/${m.product.p_id}`}>Product</Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  };

  purchaseDataUi = () => {
    if (this.state.totalPurchased.length <= 0)
      return <h3 style={{ textAlign: "center" }}>No Data Found</h3>;
    const tdata = this.state.totalPurchased.reverse();
    return (
      <Table className='tablesorter' responsive>
        <thead className='text-primary'>
          <tr>
            <th>Time</th>
            <th>Total</th>
            <th>Quantity</th>
            <th>Paid</th>

            <th>Client</th>
            <th>Expense</th>
            <th>product</th>
          </tr>
        </thead>
        <tbody>
          {tdata.map((m) => {
            let date = new Date(m.time);
            return (
              <tr>
                <td>{`${date.getDate()}/${
                  this.monthName[date.getMonth() + 1]
                }/${date.getFullYear()}`}</td>

                <td>{m.payment.amount}</td>
                <td>{m.product.quantity}</td>
                <td>{m.payment.paid}</td>

                <td>
                  <Link to={`/admin/clent/${m.cid}`}>Client</Link>
                </td>

                <td>
                  <Link
                    to={`/admin/exp/${m.payment.e_id}`}
                    disabled={m.payment.e_id == 0 ? true : false}>
                    Expense
                  </Link>
                </td>
                <td>
                  <Link to={`/admin/single/${m.product.p_id}`}>Product</Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  };

  render() {
    return (
      <>
        <div className='content'>
          <Row>
            <Col lg='4'>
              <Card className='card-chart'>
                <CardHeader>
                  <h5 className='card-category'>
                    Total Shipments (Today-
                    {parseInt(this.state.totalSelled.length) +
                      parseInt(this.state.totalPurchased.length)}
                    )
                  </h5>
                  <CardTitle tag='h3'>
                    <i className='tim-icons icon-bell-55 text-info' />
                    {this.state.profit}
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <h5>Profit- 💸 {this.state.profit}</h5>
                  <h5>
                    Total Sold:{" "}
                    <i style={{ color: "#16a085" }}>
                      {this.state.totalSelled.length}
                    </i>
                  </h5>
                  <h5>
                    Total Purchased:{" "}
                    <i style={{ color: "#16a085" }}>
                      {this.state.totalPurchased.length}
                    </i>
                  </h5>
                </CardBody>
              </Card>
            </Col>
            <Col lg='4'>
              <Card className='card-chart'>
                <CardHeader>
                  <h5 className='card-category'>Sells & Purchase</h5>
                  <CardTitle tag='h3'>
                    <i className='tim-icons icon-delivery-fast text-primary' />{" "}
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col className='pr-md-1' md='6'>
                      <p>
                        <b>
                          <i>Sell</i>
                        </b>
                      </p>
                      {this.sellInfo()}
                    </Col>
                    <Col className='pr-md-1' md='6'>
                      <p>
                        <b>
                          <i>Purchase</i>
                        </b>
                      </p>
                      {this.purchaseInfo()}
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col lg='4'>
              <Card className='card-chart'>
                <CardHeader>
                  <h5 className='card-category'>Total Stock: </h5>
                  <CardTitle tag='h3'>
                    <i className='tim-icons icon-send text-success' /> 💰{" "}
                    {this.state.stockData.totalStock}
                  </CardTitle>
                </CardHeader>
                <CardBody>{this.stockInfo()}</CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col lg='6' md='12'>
              <Card className='card-tasks'>
                <CardHeader>
                  <h6 className='title d-inline'>
                    Sells({this.state.totalSelled.length})
                  </h6>
                  <p className='card-category d-inline'> today</p>
                </CardHeader>
                <CardBody>{this.sellDataUi()}</CardBody>
              </Card>
            </Col>
            <Col lg='6' md='12'>
              <Card className='card-tasks'>
                <CardHeader>
                  <h6 className='title d-inline'>
                    Purchases({this.state.totalPurchased.length})
                  </h6>
                  <p className='card-category d-inline'> today</p>
                </CardHeader>
                <CardBody>{this.purchaseDataUi()}</CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Dashboard;
