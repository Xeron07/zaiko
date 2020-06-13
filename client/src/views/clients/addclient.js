/** @format */

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

class addClient extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      client: {
        name: "",
        email: "",
        pn: "",
        address: "",
        city: "",
        zip: "",
      },
      cid: "",
    };
  }

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
                  <Form>
                    <fieldset
                      style={{
                        border: "1px solid ",
                        padding: "10px",
                        borderRadius: "5px",
                      }}>
                      <legend style={{ fontSize: "medium" }}>
                        Client Information
                      </legend>
                      <Row>
                        <Col className='pr-md-1' md='5'>
                          <FormGroup>
                            <label>Client Name</label>
                            <Input
                              placeholder='Enter Full Name'
                              type='text'
                              value={this.state.client.name}
                              onChange={(event) => {
                                this.state.client.name = event.target.value;
                                this.setState(this.state);
                              }}
                            />
                          </FormGroup>
                        </Col>
                        <Col className='pl-md-1' md='5'>
                          <FormGroup>
                            <label htmlFor='exampleInputEmail1'>
                              Email address
                            </label>
                            <Input
                              placeholder='mike@email.com'
                              type='email'
                              value={this.state.client.email}
                              onChange={(event) => {
                                this.state.client.email = event.target.value;
                                this.setState(this.state);
                              }}
                            />
                          </FormGroup>
                        </Col>
                        <Col className='pl-ml-1' md='10'>
                          <FormGroup>
                            <label htmlFor='exampleInputEmail1'>
                              Phone Number
                            </label>
                            <Input
                              placeholder='Enter Phone Number'
                              value={this.state.client.pn}
                              onChange={(event) => {
                                this.state.client.pn = event.target.value;
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
                              value={this.state.client.address}
                              onChange={(event) => {
                                this.state.client.address = event.target.value;
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
                              value={this.state.client.city}
                              onChange={(event) => {
                                this.state.client.city = event.target.value;
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
                              value={this.state.client.zip}
                              onChange={(event) => {
                                this.state.client.zip = event.target.value;
                                this.setState(this.state);
                              }}
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
                    type='button'
                    onClick={() => this.SaveData()}>
                    Save
                  </Button>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }

  SaveData = () => {
    if (this.state.client.name == "") {
      Swal.fire({
        title: "🐠",
        text: "Enter a valid name",
        icon: "warning",
      });
    } else if (this.state.client.email == "") {
      Swal.fire({
        title: "🐠",
        text: "Enter a valid email",
        icon: "warning",
      });
    } else if (this.state.client.pn == "" || this.state.client.pn.length < 11) {
      Swal.fire({
        title: "🐠",
        text: "Enter a valid Phone Number",
        icon: "warning",
      });
    } else if (this.state.client.address == "") {
      Swal.fire({
        title: "🐠",
        text: "Enter a valid Address",
        icon: "warning",
      });
    } else {
      axios({
        method: "post",
        url: "/api/client/add",
        data: this.state.client,
      }).then((response) => {
        console.clear();
        console.log(response);
        //handle success
        if (response.status == 200) {
          Swal.fire({
            title: "🐬🐬",
            text: "Client Addes",
            icon: "success",
          }).then(() => {
            window.location.href = "/admin/client";
          });
        }
      });
    }
  };
}

export default addClient;
