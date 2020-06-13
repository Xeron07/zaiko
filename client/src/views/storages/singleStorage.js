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
import Swal from "sweetalert2";
import axios from "axios";
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
} from "reactstrap";

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {
        name: "",
        unitPrice: "",
        amount: "",
      },
      pid: "",
    };
  }
  componentDidMount = () => {
    const { id } = this.props.match.params;
    this.state.pid = id.toString();
    this.setState(this.state);

    this.reloadFile();
  };

  reloadFile = () => {
    fetch(`/api/product/single/${this.state.pid}`)
      .then((response) => response.json())
      .then((data) => {
        console.clear();
        console.log(data);
        if (!data.err) {
          data = data.data;
          let p = {
            name: data.name,
            unitPrice: data.unit_price,
            amount: data.amount,
          };

          this.setState({ product: p, pid: data.p_id });
        }
      });
  };
  render() {
    return (
      <>
        <div className='content'>
          <Row>
            <Col md='8'>
              <Card>
                <CardHeader>
                  <h5 className='title'>Edit Profile</h5>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col className='pr-md-1' md='5'>
                      <FormGroup>
                        <label>Product Name</label>
                        <Input
                          placeholder='Product Name'
                          type='text'
                          value={this.state.product.name}
                          onChange={(event) => {
                            this.state.product.name = event.target.value;
                            this.setState(this.state);
                          }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col className='pr-md-1' md='5'>
                      <FormGroup>
                        <label>Quantity</label>
                        <Input
                          placeholder='Quantity'
                          value={this.state.product.amount}
                          type='number'
                          onChange={(event) => {
                            this.state.product.amount = event.target.value;
                            this.setState(this.state);
                          }}
                        />
                      </FormGroup>
                    </Col>

                    <Col className='pr-md-1' md='5'>
                      <FormGroup>
                        <label>Unit Price</label>
                        <Input
                          placeholder='Enter Unit Price'
                          value={this.state.product.unitPrice}
                          type='number'
                          onChange={(event) => {
                            this.state.product.unitPrice = event.target.value;
                            this.setState(this.state);
                          }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <Button
                    className='btn-fill'
                    color='primary'
                    type='button'
                    onClick={() => this.UpdateData()}>
                    Update
                  </Button>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }

  UpdateData = () => {
    if (this.state.product.name == "") {
      Swal.fire({
        title: "🐠",
        text: "Enter a valid name",
        icon: "warning",
      });
    } else if (this.state.product.amount == "") {
      Swal.fire({
        title: "🐠",
        text: "Enter a valid quantity number",
        icon: "warning",
      });
    } else if (this.state.product.unitPrice == "") {
      Swal.fire({
        title: "🐠",
        text: "Enter a valid unit price",
        icon: "warning",
      });
    } else {
      axios({
        method: "post",
        url: "/api/product/update",
        data: { product: this.state.product, pid: this.state.pid },
      }).then((response) => {
        //handle success
        if (response.status == 200) {
          Swal.fire({
            title: "🐬🐬",
            text: "Updated Successfully",
            icon: "success",
          }).then(() => {
            this.reloadFile();
          });
        }
      });
    }
  };
}

export default UserProfile;
