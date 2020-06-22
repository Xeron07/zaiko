/**
 * @format
 */

import React from "react";
import Swal from "sweetalert2";
import axios from "axios";
import Autosuggest from "react-autosuggest";
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
  Table,
  Input,
  Row,
  Col,
} from "reactstrap";
import { Link } from "react-router-dom";

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

class Loss extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      suggestions: [],
      loss: {
        pid: "",
        quantity: 0,
        lossAmount: 0,
        productLoss: true,
      },
      losses: [],
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

  handleProductChanges = (event, val) => {
    const data = val.suggestion;
    this.state.value = val.suggestionValue;

    this.state.loss.pid = data.p_id;
    this.setState(this.state);
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

    fetch("/api/operation/loss/all")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ losses: [...data] });
      });
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
            <Col md='8'>
              <Card>
                <CardHeader>
                  <h5 className='title'>Add Loss</h5>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col className='pr-md-1' md='5'>
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
                    <Col className='pr-md-1' md='4'>
                      <FormGroup>
                        <label>Quantity</label>
                        <Input
                          placeholder='Quantity'
                          value={this.state.loss.quantity}
                          type='number'
                          onChange={(event) => {
                            this.state.loss.quantity = event.target.value;
                            this.setState(this.state);
                          }}
                        />
                      </FormGroup>
                    </Col>

                    <Col
                      style={
                        this.state.loss.productLoss
                          ? { display: "none" }
                          : { display: "block" }
                      }
                      className='pr-md-1'
                      md='4'>
                      <FormGroup>
                        <label>Loss Amount</label>
                        <Input
                          placeholder='Amount'
                          value={this.state.loss.lossAmount}
                          type='number'
                          onChange={(event) => {
                            this.state.loss.lossAmount = event.target.value;
                            this.setState(this.state);
                          }}
                        />
                      </FormGroup>
                    </Col>

                    <Col className='pr-md-1' md='4'>
                      <FormGroup>
                        <label>Select One</label>
                        <Input
                          defaultValue='1'
                          type='select'
                          onChange={(event) => {
                            let val = event.target.value;
                            this.state.loss.productLoss =
                              val == 1 ? true : false;
                            this.setState(this.state);
                          }}>
                          <option value='1'>Product Loss</option>
                          <option value='2'>Money returned</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <Button
                    className='btn-fill'
                    color='primary'
                    type='button'
                    onClick={() => this.SaveData()}>
                    Save
                  </Button>
                </CardFooter>
              </Card>
            </Col>
          </Row>

          <Table className='tablesorter' responsive>
            <thead className='text-primary'>
              <tr>
                <th>Time</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {this.state.losses.map((loss) => {
                return (
                  <tr key={loss.lossId}>
                    <td>{loss.time}</td>
                    <td>
                      {" "}
                      <Link to={`/admin/single/${loss.pid}`}>Show</Link>
                    </td>
                    <td>{loss.quantity}</td>
                    <td>{loss.amount}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </>
    );
  }

  SaveData = () => {
    if (this.state.loss.pid == "") {
      Swal.fire({
        title: "🐠",
        text: "Select a valid product",
        icon: "warning",
      });
    } else if (
      this.state.loss.quantity == 0 &&
      this.state.loss.lossAmount == 0
    ) {
      Swal.fire({
        title: "🐠",
        text: "Enter a valid quantity number or loss amount",
        icon: "warning",
      });
    } else {
      axios({
        method: "post",
        url: "/api/operation/loss",
        data: this.state.loss,
      }).then(function (response) {
        //handle success
        if (response.status == 200) {
          Swal.fire({
            title: "🐊🐊",
            text: "Loss Added",
            icon: "success",
            onClose: () => {
              window.location.href = "/admin/storage";
            },
          });
        }
      });
    }
  };
}

export default Loss;
