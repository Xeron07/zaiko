/** @format */

import React from "react";
import Swal from "sweetalert2";

// reactstrap components
import {
  Breadcrumb,
  BreadcrumbItem,
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
class Sells extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      clientUI: {
        old: true,
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

  reloadProductData = () => {
    fetch("/api/product/all")
      .then((response) => response.json())
      .then((data) => {
        if (data.err == "no") this.setState({ products: [...data.data] });
      });
  };

  productDataView = () => {
    if (this.state.products.length == 0) return;

    return this.state.products.map((p) => {
      return (
        <option key={p.p_id} value={p.p_id}>
          {p.name}
        </option>
      );
    });
  };

  handleProductChanges = (event) => {
    let pid = event.target.value;
    let data = this.state.products.filter((p) => {
      if (p.p_id === pid) return p;
    });
    data = data[0];
    console.log(data);
    this.state.productData.p_id = data.p_id;
    this.state.productData.remaining = data.amount;
    this.state.paymentData.unitPrice = data.unit_price;
    this.setState(this.state);
    console.log(this.state.productData);
  };

  calculateDue = () => {
    let paid = this.state.paymentData.paid;

    this.state.partialData.active =
      paid == this.state.paymentData.amount ? false : true;
    this.state.partialData.paid = paid;
    this.state.partialData.due = this.state.paymentData.amount - paid;

    this.setState(this.state);
  };

  getTotalAmountWithExpense = () => {
    return this.state.paymentData.only_price + this.state.expensePrice;
  };

  handleQuantityChange = (event) => {
    let val = event.target.value;
    if (this.state.productData.remaining < val) {
      alert("This amount of product not exist");
    } else {
      this.state.productData.quantity = this.state.paymentData.quantity =
        val == "" || val < 0 ? 0 : val;
      this.state.paymentData.only_price =
        val * this.state.paymentData.unitPrice;
      this.state.paymentData.amount = this.getTotalAmountWithExpense();
      this.setState(this.state);
      this.calculateDue();
    }
  };

  handleDiscountChange = (event = null) => {
    let val =
      event != null ? event.target.value : this.state.paymentData.discount;
    let pamount = this.getTotalAmountWithExpense();
    this.state.paymentData.discount = val < pamount * 0.8 && val > 0 ? val : 0;
    val > pamount * 0.8 && alert("Discount can't be more than 80%");
    this.state.paymentData.paid = 0;
    this.state.paymentData.amount = pamount - this.state.paymentData.discount;
    this.setState(this.state);
    this.calculateDue();
  };

  handlePaidChange = (event) => {
    let val = event.target.value;
    this.state.paymentData.paid =
      val > this.state.paymentData.amount || val < 0 ? 0 : val;
    val > this.state.paymentData.amount &&
      alert("Payment is more than total amount");
    this.setState(this.state);
    this.calculateDue();
  };

  render() {
    return (
      <>
        <div className='content'>
          <Row>
            <Col md='7'>
              <Card>
                <CardHeader>
                  <h5 className='title'>Sell Form</h5>
                </CardHeader>
                <CardBody>
                  <Form>
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
                            <label htmlFor='exampleSelect1'>
                              Product Select
                            </label>
                            <Input
                              type='select'
                              name='select'
                              id='exampleSelect1'
                              defaultValue='0'
                              onChange={this.handleProductChanges}>
                              <option value='0' disabled>
                                Select one
                              </option>
                              {this.productDataView()}
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col className='pr-md-1' md='3'>
                          <FormGroup>
                            <label>Quantity(kg)</label>
                            <Input
                              placeholder=''
                              type='number'
                              value={this.state.productData.quantity}
                              onChange={this.handleQuantityChange}
                            />
                          </FormGroup>
                        </Col>

                        <Col className='pr-md-1' md='3'>
                          <FormGroup>
                            <label>Available(kg)</label>
                            <Input
                              style={{ color: "#f19066" }}
                              placeholder='Not Selected'
                              type='number'
                              value={this.state.productData.remaining}
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
                            <label>Discount</label>
                            <Input
                              value={this.state.paymentData.discount}
                              onChange={this.handleDiscountChange}
                              placeholder='discount'
                              type='number'
                            />
                          </FormGroup>
                        </Col>
                        <Col className='pr-md-1' md='5'>
                          <FormGroup>
                            <label>Paid</label>
                            <Input
                              onChange={this.handlePaidChange}
                              value={this.state.paymentData.paid}
                              placeholder='Not paid'
                              type='number'
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col className='pr-md-1' md='5'>
                          <FormGroup>
                            <label>Due</label>
                            <Input
                              style={{ color: "#e67e22" }}
                              value={this.state.partialData.due}
                              placeholder='Not paid'
                              type='number'
                              disabled
                            />
                          </FormGroup>
                        </Col>
                        <Col className='pr-md-1' md='5'>
                          <br />
                          <FormGroup check>
                            <Label check>
                              <Input
                                type='checkbox'
                                onClick={this.addDelivery}
                              />{" "}
                              Add Delivery Charge
                              <span className='form-check-sign'>
                                <span className='check'></span>
                              </span>
                            </Label>
                          </FormGroup>
                        </Col>
                      </Row>
                    </fieldset>
                  </Form>
                </CardBody>
                <CardFooter>
                  <Button
                    className='btn-fill'
                    onClick={() => this.submissionData()}
                    color='primary'
                    type='submit'>
                    Procced
                  </Button>
                </CardFooter>
              </Card>
            </Col>
            <Col md='5'>
              <Card>
                <CardHeader>
                  <h5 className='title'>Price</h5>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col className='pr-md-1' md='5'>
                      <FormGroup>
                        <label>Unit Price</label>
                        <Input
                          placeholder='Not Selected'
                          type='number'
                          value={this.state.paymentData.unitPrice}
                          style={{ color: "#16a085" }}
                          disabled
                        />
                      </FormGroup>
                    </Col>
                    <Col className='pr-md-1' md='5'>
                      <FormGroup>
                        <label>Total Price</label>
                        <Input
                          placeholder=''
                          type='number'
                          value={this.state.paymentData.only_price}
                          style={{ color: "#f5cd79" }}
                          disabled
                        />
                      </FormGroup>
                    </Col>

                    <Col className='pr-md-1' md='8'>
                      <FormGroup>
                        <label>
                          (With Expense{" "}
                          {this.state.paymentData.discount == 0
                            ? ""
                            : "& Discount"}{" "}
                          ){" "}
                        </label>
                        <Input
                          placeholder=''
                          value={this.state.paymentData.amount}
                          type='number'
                          style={{ color: "#2980b9" }}
                          disabled
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </CardBody>
              </Card>

              <Card>
                <CardHeader>{this.setBradeCumb()}</CardHeader>
                <CardBody>{this.showView()}</CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }

  addDelivery = (event) => {
    this.state.delivery_charge.active = !this.state.delivery_charge.active;
    this.state.expensePrice += this.state.delivery_charge.active
      ? this.state.delivery_charge.fee
      : -this.state.delivery_charge.fee;
    this.state.paymentData.amount =
      this.getTotalAmountWithExpense() - this.state.paymentData.discount;
    this.setState(this.state);
    this.calculateDue();
  };

  changeUI = (d) => {
    this.setState({ ui: d });
  };

  handleNewClientCheckBox = (event) => {
    let data = this.state.clientUI;
    data.old = !this.state.clientUI.old;
    console.log(!event.target.value);
    this.setState({ clientUI: data });
  };

  showView = () => {
    if (this.state.ui == 0) {
      return (
        <div>
          <FormGroup check>
            <Label check>
              <Input
                type='checkbox'
                value={!this.state.clientUI.old}
                onChange={this.handleNewClientCheckBox}
              />{" "}
              New Client
              <span className='form-check-sign'>
                <span className='check'></span>
              </span>
            </Label>
          </FormGroup>
          <br />
          {this.clientForm()}
        </div>
      );
    } else if (this.state.ui == 1) {
      return this.addExpenseView();
    }
  };
  setBradeCumb = () => {
    if (this.state.ui == 0) {
      return (
        <Breadcrumb>
          <BreadcrumbItem active onClick={() => this.changeUI(0)}>
            Client
          </BreadcrumbItem>
          <BreadcrumbItem onClick={() => this.changeUI(1)}>
            <a href='#'>Add Expense</a>
          </BreadcrumbItem>
        </Breadcrumb>
      );
    } else {
      return (
        <Breadcrumb>
          <BreadcrumbItem active onClick={() => this.changeUI(0)}>
            <a href='#'>Client</a>
          </BreadcrumbItem>
          <BreadcrumbItem onClick={() => this.changeUI(1)}>
            Add Expense
          </BreadcrumbItem>
        </Breadcrumb>
      );
    }
  };
  handleClientSug = (id) => {
    let client = this.state.oldClients.filter((c) => c.c_id == id);
    client = client[0];
    this.state.phoneNum = client.pn;
    this.state.clientInfo = { ...this.state.clientInfo, ...client };
    this.state.oldClients = [];
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
        {this.state.oldClients.map((c) => {
          return (
            <span
              key={c.c_id}
              style={{ color: "#7efff5" }}
              onClick={() => this.handleClientSug(c.c_id)}>
              {c.name}- {c.pn}
            </span>
          );
        })}
      </div>
    );
  };
  clientForm = () => {
    if (this.state.clientUI.old) {
      return (
        <div>
          <Input
            placeholder='Enter phone number only'
            type='number'
            value={this.state.phoneNum}
            onChange={this.handleClientNum}
          />

          {this.clientSuggestion()}
        </div>
      );
    } else {
      return (
        <Form>
          <fieldset
            style={{
              border: "1px solid ",
              padding: "10px",
              borderRadius: "5px",
            }}>
            <legend style={{ fontSize: "medium" }}>Client Information</legend>
            <Row>
              <Col className='pr-md-1' md='5'>
                <FormGroup>
                  <label>Client Name</label>
                  <Input
                    placeholder='Enter Full Name'
                    type='text'
                    value={this.state.clientInfo.name}
                    onChange={(event) => {
                      this.state.clientInfo.name = event.target.value;
                      this.setState(this.state);
                    }}
                  />
                </FormGroup>
              </Col>
              <Col className='pl-md-1' md='5'>
                <FormGroup>
                  <label htmlFor='exampleInputEmail1'>Email address</label>
                  <Input
                    placeholder='mike@email.com'
                    type='email'
                    value={this.state.clientInfo.email}
                    onChange={(event) => {
                      this.state.clientInfo.email = event.target.value;
                      this.setState(this.state);
                    }}
                  />
                </FormGroup>
              </Col>
              <Col className='pl-ml-1' md='10'>
                <FormGroup>
                  <label htmlFor='exampleInputEmail1'>Phone Number</label>
                  <Input
                    placeholder='Enter Phone Number'
                    value={this.state.clientInfo.pn}
                    onChange={(event) => {
                      this.state.clientInfo.pn = event.target.value;
                      this.setState(this.state);
                    }}
                    type='text'
                  />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col md='12'>
                <FormGroup>
                  <label>Address</label>
                  <Input
                    placeholder='Home Address'
                    type='text'
                    value={this.state.clientInfo.address}
                    onChange={(event) => {
                      this.state.clientInfo.address = event.target.value;
                      this.setState(this.state);
                    }}
                  />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col className='pr-md-1' md='4'>
                <FormGroup>
                  <label>City</label>
                  <Input
                    placeholder='City'
                    type='text'
                    value={this.state.clientInfo.city}
                    onChange={(event) => {
                      this.state.clientInfo.city = event.target.value;
                      this.setState(this.state);
                    }}
                  />
                </FormGroup>
              </Col>

              <Col className='pl-md-1' md='4'>
                <FormGroup>
                  <label>Postal Code</label>
                  <Input
                    placeholder='ZIP Code'
                    type='number'
                    value={this.state.clientInfo.zip}
                    onChange={(event) => {
                      this.state.clientInfo.zip = event.target.value;
                      this.setState(this.state);
                    }}
                  />
                </FormGroup>
              </Col>
            </Row>
          </fieldset>
        </Form>
      );
    }
  };
  handleClientNum = (event) => {
    let number = event.target.value;
    axios.post(`/api/client/get/${number}`).then((data) => {
      this.setState({ oldClients: data.data.data });
      console.log(data);
    });
    this.setState({ phoneNum: number });
  };
  addExpenseView = () => {
    return (
      <Row>
        <Col className='pr-md-1' md='12'>
          <Card>
            <CardBody>
              <Form>
                <fieldset
                  style={{
                    border: "1px solid ",
                    padding: "10px",
                    borderRadius: "5px",
                  }}>
                  <legend style={{ fontSize: "medium" }}>
                    Expense information
                  </legend>
                  <Row>
                    <Col md='11'>
                      <FormGroup>
                        <label>Amount</label>
                        <Input
                          placeholder='paid'
                          type='number'
                          value={this.state.expenseData.price}
                          onChange={(event) => {
                            this.state.expenseData.price = event.target.value;
                            this.setState(this.state);
                          }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md='11'>
                      <FormGroup>
                        <label htmlFor='exampleInputEmail1'>Details</label>
                        <Input
                          placeholder='Write details about expense'
                          type='textarea'
                          value={this.state.expenseData.details}
                          onChange={(event) => {
                            this.state.expenseData.details = event.target.value;
                            this.setState(this.state);
                          }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </fieldset>
              </Form>
            </CardBody>
            {/* <CardFooter>
              <Button className='btn-fill' color='primary' type='submit'>
                Save
              </Button>
            </CardFooter> */}
          </Card>
        </Col>
      </Row>
    );
  };

  //client
  submissionData = () => {
    if (this.state.productData.quantity == 0) {
      Swal.fire("Oops!!", "No Quantity ? ", "warning");
    } else if (
      this.state.clientInfo.name == "" ||
      this.state.clientInfo.pn == ""
    ) {
      Swal.fire("Oops!!", "No Client Added", "warning");
    } else if (
      this.state.expenseData.price == "" ||
      this.state.expenseData.details == ""
    ) {
      Swal.fire("Oops!!", 'No Expense or put "0" in expense', "warning");
    } else {
      axios({
        method: "post",
        url: "/api/sell/add",
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
}

export default Sells;
