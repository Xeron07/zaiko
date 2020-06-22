/** @format */

import React from "react";
import Swal from "sweetalert2";
import Autosuggest from "react-autosuggest";
import IsolatedScroll from "react-isolated-scroll";
import "./theme.css";
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
  Table,
  Label,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import axios from "axios";

/**
 * Auto suggestion handler
 */

let productList = [];
// Teach Autosuggest how to calculate suggestions for any given input value.
const escapeRegexCharacters = (str) => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};
const getSuggestions = (value) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
  const escapedValue = escapeRegexCharacters(value.trim());

  if (escapedValue === "") {
    return [];
  }

  const regex = new RegExp("^" + escapedValue, "i");

  return productList.filter((lan) => regex.test(lan.name));
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = (suggestion) => suggestion.name;

class Sells extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      suggestions: [],
      storageData: [],
      clientUI: {
        old: true,
      },
      cid: "",
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
        unitPrice: 0,
        total: 0,
        name: "",
        old: false,
        index: -1,
      },
      products: [],
      paymentData: {
        totalAmount: 1000,
        onlyPrice: 1000,
        paid: "",
        due: 0,
        totalItems: 0,
        discount: 0,
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

  /**
   * Autosuggession
   */

  // Use your imagination to render suggestions.
  renderSuggestion = (suggestion) => <span>{suggestion.name}</span>;
  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue,
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value),
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  componentDidMount = () => {
    this.reloadProductData();
  };

  reloadProductData = () => {
    fetch("/api/product/all")
      .then((response) => response.json())
      .then((data) => {
        if (data.err == "no") {
          this.setState({ storageData: [...data.data] });
          productList = [...data.data];
        }
      });
  };

  calculateOnlyPrice = () => {
    let total = 0;
    this.state.products.forEach(
      (p) => (total = +total + +(p.unitPrice * p.quantity))
    );
    console.clear();
    console.log(total);
    this.state.paymentData.onlyPrice = total;
    this.state.paymentData.totalAmount = this.getTotalAmountWithExpense();
    this.state.paymentData.discount = 0;
    this.setState(this.state);
    this.calculateDue();
  };

  handleProductChanges = (event, val) => {
    const data = val.suggestion;
    this.state.value = val.suggestionValue;

    this.state.productData.p_id = data.p_id;
    this.state.productData.remaining = data.amount;
    this.state.productData.unitPrice = data.unit_price;
    this.state.productData.name = data.name;
    this.state.productData.old = false;
    this.state.productData.index = -1;
    this.setState(this.state);
    console.log(this.state.productData);
  };

  calculateDue = () => {
    let paid = this.state.paymentData.paid;

    this.state.paymentData.due =
      this.state.paymentData.totalAmount - (paid ? paid : 0);

    this.setState(this.state);
  };

  getTotalAmountWithExpense = () => {
    return +this.state.paymentData.onlyPrice + +this.state.expensePrice;
  };

  handleQuantityChange = (event) => {
    let val = event.target.value;
    if (this.state.productData.remaining < val) {
      alert("This amount of product not exist");
    } else {
      this.state.productData.quantity = this.state.paymentData.quantity =
        val == "" || val < 0 ? 0 : val;

      this.setState(this.state);
    }
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

  addProduct = () => {
    if (this.state.productData.quantity <= 0) {
      alert("No Quantity ?..");
      return;
    }
    if (!this.state.productData.old)
      this.state.products.push({ ...this.state.productData });
    else {
      let index = this.state.productData.index;
      this.state.products[index].quantity = this.state.productData.quantity;
    }
    console.clear();
    console.log(this.state.productData);
    console.log(this.state.products);
    this.state.productData.p_id = 0;
    this.state.productData.quantity = 0;
    this.state.productData.remaining = 0;
    this.state.productData.unitPrice = 0;
    this.state.productData.old = false;
    this.state.productData.index = -1;
    this.state.value = "";
    this.setState(this.state);
    this.calculateOnlyPrice();
  };

  render() {
    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: "Type a fish name",
      value,
      onChange: this.onChange,
    };
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
                        <Col className='pr-md-1' md='10'>
                          <Autosuggest
                            suggestions={suggestions}
                            onSuggestionsFetchRequested={
                              this.onSuggestionsFetchRequested
                            }
                            onSuggestionsClearRequested={
                              this.onSuggestionsClearRequested
                            }
                            getSuggestionValue={getSuggestionValue}
                            renderSuggestion={this.renderSuggestion}
                            inputProps={inputProps}
                            onSuggestionSelected={this.handleProductChanges}
                          />
                        </Col>
                      </Row>
                      <br />
                      <Row>
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

                        <Col className='pr-md-1' md='3'>
                          <FormGroup>
                            <label>Unit Price(kg)</label>
                            <Input
                              style={{ color: "#f19066" }}
                              placeholder='Not Selected'
                              type='number'
                              value={this.state.productData.unitPrice}
                              disabled
                            />
                          </FormGroup>
                        </Col>

                        <Col className='pr-md-1' md='3'>
                          <br />
                          <Button
                            className='btn-fill'
                            onClick={() => this.addProduct()}
                            color='primary'
                            type='button'>
                            Add
                          </Button>
                        </Col>
                      </Row>
                    </fieldset>
                    <br />

                    <Row>
                      <Col md='12'>
                        <Card>
                          <CardHeader>{this.setBradeCumb()}</CardHeader>
                          <CardBody>{this.showView()}</CardBody>
                        </Card>
                      </Col>
                    </Row>
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
                  <h5 className='title'>Transection</h5>
                </CardHeader>
                <CardBody>
                  <h6>
                    Total Item(s):
                    <span style={{ position: "absolute", right: "5%" }}>
                      {this.state.products.length}
                    </span>
                  </h6>
                  <hr />

                  <h6>
                    Total Price(s):
                    <span style={{ position: "absolute", right: "5%" }}>
                      {this.state.paymentData.onlyPrice}
                    </span>
                  </h6>

                  <h6>
                    Total Price(with expense)(s):
                    <span style={{ position: "absolute", right: "5%" }}>
                      {this.state.paymentData.totalAmount}
                    </span>
                  </h6>
                  <hr />
                  <Row>
                    <Col className='pr-md-1' md='9'>
                      <h6>Discount:</h6>
                    </Col>
                    <Col className='pr-md-1' md='3'>
                      <input
                        style={{
                          color: "#f19066",
                          width: "100%",
                          borderLeft: "0px",
                          borderRight: "0px",
                          borderTop: "0px",
                          backgroundColor: "transparent",
                          textAlign: "center",
                        }}
                        placeholder='Not Selected'
                        type='number'
                        value={this.state.paymentData.discount}
                        onChange={(event) => {
                          this.state.paymentData.discount = event.target.value
                            ? event.target.value
                            : 0;
                          if (
                            this.state.paymentData.discount >
                            this.state.paymentData.onlyPrice * 0.8
                          ) {
                            this.state.paymentData.discount = 0;
                            alert("You can't give discount more than 80%");
                          }
                          this.state.paymentData.totalAmount =
                            this.getTotalAmountWithExpense() -
                            this.state.paymentData.discount;
                          this.setState(this.state);
                          this.calculateDue();
                        }}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col className='pr-md-1' md='9'>
                      <h6> Total Paid:</h6>
                    </Col>
                    <Col className='pr-md-1' md='3'>
                      <input
                        style={{
                          color: "#f19066",
                          width: "100%",
                          borderLeft: "0px",
                          borderRight: "0px",
                          borderTop: "0px",
                          backgroundColor: "transparent",
                          textAlign: "center",
                        }}
                        placeholder='Not Paid'
                        type='number'
                        value={this.state.paymentData.paid}
                        onChange={(eve) => {
                          let val = eve.target.value;
                          if (val > this.state.paymentData.totalAmount) {
                            alert(
                              "Please, give a valid pay amount.\n(Paument is more than total amount)"
                            );
                            val = "";
                          }
                          this.state.paymentData.paid = val ? val : "";
                          this.state.paymentData.due =
                            this.state.paymentData.totalAmount -
                            (val ? val : 0);
                          this.setState(this.state);
                        }}
                      />
                    </Col>
                  </Row>

                  <hr />

                  <h6>
                    Total Due:
                    <span style={{ position: "absolute", right: "5%" }}>
                      {this.state.paymentData.due}
                    </span>
                  </h6>
                </CardBody>
              </Card>
              <Card style={{ height: "50%" }}>
                <Table style={{ maxHeight: "80%", overflow: "auto" }}>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th className='text-left'>Unit Price</th>
                      <th className='text-left'>Quantity</th>
                      <th className='text-left'>Total price</th>
                      <th className='text-left'>
                        <i
                          style={{ color: "#ff5252" }}
                          className='tim-icons icon-trash-simple'></i>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.products.map((p, i) => {
                      return (
                        <tr style={{ cursor: "pointer" }} map={p.p_id}>
                          <td
                            onClick={() => {
                              this.updateProduct(p, i);
                            }}>
                            {p.name}
                          </td>
                          <td
                            onClick={() => {
                              this.updateProduct(p, i);
                            }}
                            className='text-center'>
                            {p.unitPrice}
                          </td>
                          <td className='text-center'>x{p.quantity}</td>
                          <td className='text-center'>
                            {p.unitPrice * p.quantity}
                          </td>
                          <td
                            className='text-center'
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              this.removeProduct(p.p_id);
                            }}>
                            <i
                              style={{ color: "#ff5252" }}
                              className='tim-icons icon-trash-simple'></i>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }

  updateProduct = (p, i) => {
    this.state.productData.p_id = p.p_id;
    this.state.productData.quantity = p.quantity;
    this.state.productData.remaining = p.remaining;
    this.state.productData.unitPrice = p.unitPrice;
    this.state.productData.old = true;
    this.state.productData.index = i;
    this.state.value = p.name;
    this.setState(this.state);
  };

  removeProduct = (id) => {
    const filtered = this.state.products.filter((p) => p.p_id != id);
    this.state.products = [...filtered];
    this.calculateOnlyPrice();
  };

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
    this.state.cid = id;
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
                            this.state.expensePrice = event.target.value
                              ? event.target.value
                              : 0;
                            this.setState(this.state);
                            this.calculateOnlyPrice();
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
    if (this.state.products.length <= 0) {
      Swal.fire("Oops!!", "No product(s) added ", "warning");
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
        data: {
          client: {
            old: this.state.clientUI.old,
            info: this.state.clientInfo,
            cid: this.state.cid,
          },
          expense: this.state.expenseData,
          payment: this.state.paymentData,
          products: this.state.products,
        },
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
