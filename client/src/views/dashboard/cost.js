/** @format */

import React from "react";
import Swal from "sweetalert2";
import axios from "axios";
// reactstrap components
import {
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  CardTitle,
  Table,
  Row,
  Col,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Form,
} from "reactstrap";

class singleTracnsection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bankCharge: 0,
      dep: 0,
      rent: 0,
      utility: 0,
      saving: 0,
      extra: 0,
      share: 0,
    };
  }

  componentDidMount = () => {
    this.reloadData();
  };

  reloadData = () => {
    fetch("/api/cost/get")
      .then((response) => response.json())
      .then((data) => {
        console.clear();
        console.log(data);
        this.state = { ...data };
        this.setState(this.state);
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
                  <h5 className='title'>Monthly Cost</h5>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col className='pr-md-1' md='5'>
                      <FormGroup>
                        <label>Bank Charge</label>
                        <Input
                          placeholder='Bank Charge'
                          value={this.state.bankCharge}
                          type='number'
                          onChange={(event) => {
                            this.state.bankCharge = event.target.value;
                            this.setState(this.state);
                          }}
                        />
                      </FormGroup>
                    </Col>
                    <Col className='pr-md-1' md='5'>
                      <FormGroup>
                        <label>Depriciation</label>
                        <Input
                          placeholder='Enter cost'
                          value={this.state.dep}
                          type='number'
                          onChange={(event) => {
                            this.state.dep = event.target.value;
                            this.setState(this.state);
                          }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <br />
                  <Row>
                    <Col className='pr-md-1' md='5'>
                      <FormGroup>
                        <label>Rent</label>
                        <Input
                          placeholder='Store Rent'
                          value={this.state.rent}
                          type='number'
                          onChange={(event) => {
                            this.state.rent = event.target.value;
                            this.setState(this.state);
                          }}
                        />
                      </FormGroup>
                    </Col>
                    <Col className='pr-md-1' md='5'>
                      <FormGroup>
                        <label>Utility</label>
                        <Input
                          placeholder='Enter cost'
                          value={this.state.utility}
                          type='number'
                          onChange={(event) => {
                            this.state.utility = event.target.value;
                            this.setState(this.state);
                          }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>{" "}
                  <br />
                  <Row>
                    <Col className='pr-md-1' md='5'>
                      <FormGroup>
                        <label>Saving(%)</label>
                        <Input
                          placeholder='(0-100)%'
                          value={this.state.saving}
                          type='number'
                          onChange={(event) => {
                            this.state.saving = event.target.value;
                            this.setState(this.state);
                          }}
                        />
                      </FormGroup>
                    </Col>
                    <Col className='pr-md-1' md='5'>
                      <FormGroup>
                        <label>Extra</label>
                        <Input
                          placeholder='Enter cost'
                          value={this.state.extra}
                          type='number'
                          onChange={(event) => {
                            this.state.extra = event.target.value;
                            this.setState(this.state);
                          }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <br />
                  <Row>
                    <Col className='pr-md-1' md='5'>
                      <FormGroup>
                        <label>Share(%)</label>
                        <Input
                          placeholder='Share %'
                          value={this.state.share}
                          type='number'
                          onChange={(event) => {
                            this.state.share = event.target.value;
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
                    onClick={() => this.SaveData()}>
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
  SaveData = () => {
    if (this.state.share > 100) {
      Swal.fire("Oops!!", "Enter a valid share (%) percentage", "error");
    } else if (this.state.saving > 100) {
      Swal.fire("Oops!!", "Enter a valid saving (%) percentage", "error");
    } else {
      axios({
        method: "post",
        url: "/api/cost/update",
        data: this.state,
      }).then((response) => {
        //handle success
        if (response.status == 200) {
          Swal.fire({
            title: "🚧🚧",
            text: "Updated Successfully",
            icon: "success",
          });
          this.reloadData();
        }
      });
    }
  };
}

export default singleTracnsection;
