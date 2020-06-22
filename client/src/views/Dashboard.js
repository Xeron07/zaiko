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
  Modal,
  ModalBody,
  ModalFooter,
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
      stockData: [],
      selectedProducts: [],
      profit: 0,
      fishTypes: 0,
      totalLoss: 0,
      isLoading: true,
      modalDemo: false,
      todayLoss: [],
      show: true,
    };
  }

  toggleModalDemo() {
    this.state.modalDemo = !this.state.modalDemo;
    this.setState(this.state);
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
        this.state.stockData = [...data.stockData];
        this.state.totalLoss = data.totalLoss;
        this.state.fishTypes = data.fishTypes;
        this.state.todayLoss = data.todayLoss;
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
          <h5>Due Of Today : {this.state.purchaseData.due}</h5>
        </div>
      );
    }
  };

  stockInfo = () => {
    if (this.state.stockData.length <= 0) {
      return <h3>🎣 No Stock Data</h3>;
    } else {
      let totalFish = 0;
      let totalStock = 0;
      //console.clear();
      // console.log(this.state.stockData);
      for (let i = 0; i < this.state.stockData.length; i++) {
        totalFish += +this.state.stockData[i].totalFish;
        totalStock += +this.state.stockData[i].totalStock;
      }

      return (
        <div className='ml-2'>
          <h5>
            Total Fish Of Type(s) :&nbsp;
            <i>
              <b style={{ color: "orange" }}>{this.state.fishTypes}</b>
            </i>{" "}
          </h5>
          <h5>
            Total Fish :{" "}
            <i>
              <b style={{ color: "yellow" }}>{totalFish}</b>
            </i>{" "}
            Unit(s)
          </h5>
          <h5>
            Total Amount:{" "}
            <i>
              <b style={{ color: "green" }}>{totalStock}</b>
            </i>{" "}
          </h5>
          <h5>
            Loss Amount:{" "}
            <i>
              <b style={{ color: "#b33939" }}>{this.state.totalLoss}</b>
            </i>{" "}
          </h5>
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
            <th>Items</th>
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

                <td>{m.amount.totalAmount}</td>
                <td>{m.amount.totalItems}</td>
                <td>{m.payment.paid}</td>

                <td>
                  <Link to={`/admin/client/${m.cid}`}>Client</Link>
                </td>

                <td>
                  <Link
                    to={`/admin/exp/${m.eid}`}
                    style={
                      m.eid == 0 ? { display: "none" } : { display: "block" }
                    }>
                    Expense
                  </Link>
                </td>
                <td style={{ cursor: "pointer" }}>
                  <a
                    style={{ color: "#7158e2" }}
                    onClick={() => {
                      this.setState({
                        selectedProducts: [...m.products],
                        modalDemo: true,
                      });
                    }}>
                    Products
                  </a>
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
            <th>Items</th>
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

                <td>{m.amount.totalAmount}</td>
                <td>{m.amount.totalItems}</td>
                <td>{m.payment.paid}</td>

                <td>
                  <Link to={`/admin/client/${m.cid}`}>Client</Link>
                </td>

                <td>
                  <Link
                    to={`/admin/exp/${m.eid}`}
                    style={
                      m.eid == 0 ? { display: "none" } : { display: "block" }
                    }>
                    Expense
                  </Link>
                </td>
                <td style={{ cursor: "pointer" }}>
                  <a
                    style={{ color: "#7158e2" }}
                    onClick={() => {
                      this.setState({
                        selectedProducts: [...m.products],
                        modalDemo: true,
                      });
                    }}>
                    Products
                  </a>
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
                  <h5
                    className='card-category'
                    onClick={() => {
                      this.setState({ show: !this.state.show });
                    }}>
                    Total Shipments (Today-
                    {parseInt(this.state.totalSelled.length) +
                      parseInt(this.state.totalPurchased.length)}
                    )
                  </h5>
                  <CardTitle tag='h3'>
                    <i
                      className='tim-icons icon-bell-55 text-info'
                      onClick={() => {
                        this.setState({ show: !this.state.show });
                      }}
                    />
                    <span
                      style={
                        this.state.show
                          ? { display: "inline-block" }
                          : { display: "none" }
                      }>
                      {this.state.profit}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <h5
                    style={
                      this.state.show
                        ? { display: "block" }
                        : { display: "none" }
                    }>
                    Profit- 💸 {this.state.profit}
                  </h5>
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
                  <h5>
                    Total Loss:{" "}
                    <i style={{ color: "red" }}>
                      {this.state.todayLoss.length}
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
          <Modal
            className='lg'
            isOpen={this.state.modalDemo}
            toggle={() => {
              this.toggleModalDemo();
            }}>
            <div
              className='modal-header'
              style={{ backgroundColor: "#3d3d3d" }}>
              <h5
                className='modal-title'
                id='exampleModalLabel'
                style={{ color: "white" }}>
                Products
              </h5>
              {/* <button
                type='button'
                className='close'
                data-dismiss='modal'
                aria-hidden='true'
                onClick={() => {
                  this.toggleModalDemo();
                }}>
                <i className='tim-icons icon-simple-remove' />
              </button> */}
            </div>
            <ModalBody style={{ backgroundColor: "#3d3d3d" }}>
              {this.showProductList()}
            </ModalBody>
            <ModalFooter style={{ backgroundColor: "#3d3d3d" }}>
              <Button color='secondary' onClick={() => this.toggleModalDemo()}>
                Close
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </>
    );
  }
  showProductList = () => {
    console.clear();
    console.log(this.state.selectedProducts);
    return (
      <Table style={{ maxHeight: "80%", overflow: "auto" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th className='text-left'>Unit Price</th>
            <th className='text-left'>Quantity</th>
            <th className='text-left'>Total price</th>
          </tr>
        </thead>
        <tbody>
          {this.state.selectedProducts.map((p, i) => {
            return (
              <tr style={{ cursor: "pointer" }} map={p.p_id}>
                <td>{p.name}</td>
                <td className='text-center'>{p.unitPrice}</td>
                <td className='text-center'>x{p.quantity}</td>
                <td className='text-center'>{p.unitPrice * p.quantity}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  };
}

export default Dashboard;
