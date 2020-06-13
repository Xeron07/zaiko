/** @format */

import React from "react";
import Swal from "sweetalert2";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Label,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import axios from "axios";
class Purchase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      clientUI: {
        old: false,
      },
      ui: 0,

      //data
      delivery_charge: {
        active: false,
        fee: 20,
      },
      productData: {
        p_id: 0,
        quantity: 0,
        remaining: 0,
      },
      paymentData: {
        paid: 0,
        unitPrice: 0,
        amount: 0,
        only_price: 0,
        discount: 0,
        quantity: 0,
        e_id: "0",
      },
      partialData: {
        active: false,
        paid: 0,
        due: 0,
      },
      expensePrice: 0,
      expenseData: {
        price: "",
        details: "",
        e_id: null,
      },
      phoneNum: "",
      clientInfo: {
        pn: "", //phone number
        email: "",
        address: "",
        city: "Chittagong",
        zip: "",
        name: "",
      },
      oldClients: [],
    };
  }

  componentDidMount = () => {
    this.reloadProductData();
  };

  allCalculation = () => {
    this.state.paymentData.only_price =
      this.state.productData.quantity * this.state.paymentData.unitPrice;
    this.state.paymentData.amount =
      this.state.paymentData.only_price +
      parseFloat(
        this.state.expenseData.price == "" ? 0 : this.state.expenseData.price
      ) -
      this.state.paymentData.discount;
    this.state.partialData.due =
      this.state.paymentData.amount - this.state.paymentData.paid;
    this.state.partialData.active =
      this.state.partialData.due == 0 ? false : true;
    this.state.partialData.paid = this.state.paymentData.paid;

    this.setState(this.state);
  };

  reloadProductData = () => {
    fetch("/api/product/all")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.err == "no") this.setState({ products: [...data.data] });
      });
  };

  handleProductSelect = (event) => {
    let pid = event.target.value;
    let data = this.state.products.filter((p) => {
      if (p.p_id === pid) return p;
    });
    data = data[0];
    this.state.productData.p_id = data.p_id;
    this.state.productData.remaining = data.amount;
    this.setState(this.state);
  };

  render() {
    return (
      <div className='content'>
        <Row>
          <Col md='12'>
            <Card>
              <CardHeader>
                <h5 className='title'>Purchase Form</h5>
              </CardHeader>
              <CardBody>
                <Form>
                  <fieldset
                    style={{
                      border: "1px solid ",
                      padding: "10px",
                      borderRadius: "5px",
                    }}>
                    <legend style={{ fontSize: "medium" }}>
                      Seller Information
                    </legend>
                    <Row>
                      <Col className='pr-md-1' md='5'>
                        <FormGroup>
                          <label>Mobile Number</label>
                          <Input
                            value={this.state.phoneNum}
                            placeholder='01XXXXX'
                            type='number'
                            onChange={this.handleClientNum}
                          />
                          {this.clientSuggestion()}
                        </FormGroup>
                      </Col>
                      <Col className='pr-md-1' md='5'>
                        <FormGroup>
                          <label>Email</label>
                          <Input
                            value={this.state.clientInfo.email}
                            placeholder='user@domain.com'
                            type='email'
                            disabled={this.state.clientUI.old ? true : false}
                            onChange={(event) => {
                              this.state.clientInfo.email = event.target.value;
                              this.setState(this.state);
                            }}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className='pr-md-1' md='5'>
                        <FormGroup>
                          <label>Name</label>
                          <Input
                            value={this.state.clientInfo.name}
                            placeholder='Company name'
                            type='text'
                            disabled={this.state.clientUI.old ? true : false}
                            onChange={(event) => {
                              this.state.clientInfo.name = event.target.value;
                              this.setState(this.state);
                            }}
                          />
                        </FormGroup>
                      </Col>
                      <Col className='pr-md-1' md='5'>
                        <FormGroup>
                          <label>Address</label>
                          <Input
                            value={this.state.clientInfo.address}
                            placeholder='Company Address'
                            type='text'
                            disabled={this.state.clientUI.old ? true : false}
                            onChange={(event) => {
                              this.state.clientInfo.address =
                                event.target.value;
                              this.setState(this.state);
                            }}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </fieldset>

                  <br />
                  <fieldset
                    style={{
                      border: "1px solid ",
                      padding: "10px",
                      borderRadius: "5px",
                    }}>
                    <legend style={{ fontSize: "medium" }}>
                      Product Information
                    </legend>
                    <Row>
                      <Col className='pr-md-1' md='4'>
                        <FormGroup>
                          <label for='exampleSelect1'>Product Select</label>
                          <Input
                            type='select'
                            name='select'
                            id='exampleSelect1'
                            onChange={this.handleProductSelect}>
                            <option disabled selected>
                              Select One
                            </option>
                            {this.state.products.map((data) => {
                              return (
                                <option key={data.p_id} value={data.p_id}>
                                  {data.name}
                                </option>
                              );
                            })}
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col className='pr-md-1' md='3'>
                        <FormGroup>
                          <label>Quantity(kg)</label>
                          <Input
                            value={this.state.productData.quantity}
                            placeholder=''
                            type='number'
                            onChange={(event) => {
                              let val = event.target.value;
                              val = val < 0 ? 0 : val;

                              this.state.productData.quantity = this.state.paymentData.quantity = parseInt(
                                1 * val
                              );

                              this.allCalculation();
                            }}
                          />
                        </FormGroup>
                      </Col>

                      <Col className='pr-md-1' md='3'>
                        <FormGroup>
                          <label>Available(kg)</label>
                          <Input
                            value={this.state.productData.remaining}
                            placeholder='Not Selected'
                            style={{ color: "#f19066" }}
                            type='number'
                            disabled
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className='pr-md-1' md='4'>
                        <FormGroup>
                          <label>Unit Price</label>
                          <Input
                            value={this.state.paymentData.unitPrice}
                            placeholder='Unit price'
                            type='number'
                            style={{ color: "#16a085" }}
                            onChange={(event) => {
                              let val =
                                event.target.value < 0 ? 0 : event.target.value;
                              this.state.paymentData.unitPrice = val;
                              this.allCalculation();
                            }}
                          />
                        </FormGroup>
                      </Col>
                      <Col className='pr-md-1' md='4'>
                        <FormGroup>
                          <label>Total price (without Expense)</label>
                          <Input
                            value={this.state.paymentData.only_price}
                            placeholder='Total Amount'
                            type='number'
                            style={{ color: "#f5cd79" }}
                            disabled
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </fieldset>
                  <br />
                  <fieldset
                    style={{
                      border: "1px solid ",
                      padding: "10px",
                      borderRadius: "5px",
                    }}>
                    <legend style={{ fontSize: "medium" }}>
                      Expense Information
                    </legend>

                    <Row>
                      <Col className='pr-md-1' md='11'>
                        <FormGroup>
                          <label>Expense Information</label>
                          <Input
                            value={this.state.expenseData.details}
                            placeholder='Expense information'
                            type='textarea'
                            onChange={(event) => {
                              this.state.expenseData.details =
                                event.target.value;
                              this.setState(this.state);
                            }}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className='pr-md-1' md='5'>
                        <FormGroup>
                          <label>Expense</label>
                          <Input
                            value={this.state.expenseData.price}
                            placeholder='Amount'
                            type='number'
                            onChange={(event) => {
                              this.state.expenseData.price =
                                event.target.value < 0 ||
                                event.target.value == ""
                                  ? 0
                                  : event.target.value;
                              this.allCalculation();
                            }}
                          />
                        </FormGroup>
                      </Col>
                      <Col className='pr-mr-1' md='5'>
                        <FormGroup>
                          <label>Total price (with Expense)</label>
                          <Input
                            value={this.state.paymentData.amount}
                            placeholder='Total Amount'
                            type='number'
                            style={{ color: "#f5cd79" }}
                            disabled
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </fieldset>
                  <br />
                  <fieldset
                    style={{
                      border: "1px solid ",
                      padding: "10px",
                      borderRadius: "5px",
                    }}>
                    <legend style={{ fontSize: "medium" }}>
                      Payment Information
                    </legend>
                    <Row>
                      <Col className='pr-md-1' md='5'>
                        <FormGroup>
                          <label>Dicount</label>
                          <Input
                            value={this.state.paymentData.discount}
                            placeholder='discount'
                            type='number'
                            onChange={(event) => {
                              this.state.paymentData.discount =
                                event.target.value < 0 ||
                                event.target.value == ""
                                  ? 0
                                  : event.target.value;
                              this.allCalculation();
                            }}
                          />
                        </FormGroup>
                      </Col>
                      <Col className='pr-md-1' md='5'>
                        <FormGroup>
                          <label>Paid</label>
                          <Input
                            value={this.state.paymentData.paid}
                            placeholder='Not paid'
                            type='number'
                            onChange={(event) => {
                              this.state.paymentData.paid =
                                event.target.value < 0 ||
                                event.target.value == "" ||
                                event.target.value >
                                  this.state.paymentData.amount
                                  ? 0
                                  : event.target.value;

                              event.target.value >
                                this.state.paymentData.amount &&
                                alert("Paying is more than amount");
                              this.allCalculation();
                            }}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className='pr-md-1' md='5'>
                        <FormGroup>
                          <label>Due</label>
                          <Input
                            value={this.state.partialData.due}
                            placeholder='Not paid'
                            type='number'
                            onChange={(event) => {}}
                            disabled
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </fieldset>
                </Form>
              </CardBody>
              <CardFooter>
                <Button
                  className='btn-fill'
                  color='primary'
                  type='submit'
                  onClick={() => this.showState()}>
                  Save
                </Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
  handleClientNum = (event) => {
    let number = event.target.value;
    axios.post(`/api/client/get/${number}`).then((data) => {
      this.setState({ oldClients: data.data.data });
      console.log(data);
    });
    this.setState({ phoneNum: number });
  };
  handleClientSug = (id, val) => {
    if (val) {
      let client = this.state.oldClients.filter((c) => c.c_id == id);
      client = client[0];
      this.state.phoneNum = client.pn;
      this.state.clientInfo = { ...this.state.clientInfo, ...client };
    }
    this.state.oldClients = [];
    this.state.clientUI.old = val;
    this.setState(this.state);
  };
  clientSuggestion = () => {
    if (this.state.oldClients.length == 0) return;
    return (
      <div
        style={{
          padding: "5px",
          maxHeight: "7%",
          overflow: "auto",
          backgroundColor: "#3d3d3d",
        }}
        key={Date.now()}>
        <li
          key={0 + 0}
          style={{ color: "#7efff5" }}
          onClick={() => this.handleClientSug(null, false)}>
          New Client
        </li>
        {this.state.oldClients.map((c) => {
          return (
            <li
              key={c.c_id}
              style={{ color: "#7efff5" }}
              onClick={() => this.handleClientSug(c.c_id, true)}>
              {c.name}- {c.pn}
            </li>
          );
        })}
      </div>
    );
  };
  showState = () => {
    if (this.state.productData.quantity == 0) {
      Swal.fire("Oops!!", "No Quantity ? ", "warning");
    } else if (this.state.phoneNum.length < 8) {
      Swal.fire("Oops!!", "No Client Added", "warning");
    } else if (this.state.expenseData.price == "") {
      Swal.fire("Oops!!", 'No Expense or put "0" in expense', "warning");
    } else {
      axios({
        method: "post",
        url: "/api/sell/purchase/add",
        data: this.state,
      })
        .then(function (response) {
          //handle success
          if (response.status == 200) {
            Swal.fire({
              title: "Good Job!!",
              text: "Operation Success ",
              icon: "success",
              onClose: () => {
                window.location.reload(false);
              },
            });
            console.log(response.status);
          }
        })
        .catch(function (response) {
          //handle error
          console.log(response);
        });
    }
  };

  showEventData = (data) => {
    console.log(data);
  };
}

export default Purchase;
