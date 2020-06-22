/** @format */

import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  CardTitle,
  Row,
  Col,
  FormGroup,
  Input,
} from "reactstrap";

class Expense extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expenseData: false,
      date: "",
      loading: true,
      eid: "0",
      data: {},
    };
  }

  componentDidMount = () => {
    const { id } = this.props.match.params;
    this.state.eid = id.toString();
    this.setState(this.state);

    this.reloadFile();
  };

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.someValue !== this.props.someValue) {
  //     //Perform some operation
  //     this.setState({ someState: someValue });
  //     this.classMethod();
  //   }
  // }

  reloadFile = () => {
    console.clear();
    this.state.loading = true;

    axios({
      method: "post",
      url: `/api/expense/all/${this.state.eid}`,
    }).then((data) => {
      console.clear();
      console.log(data.data);
      if (data.status == 200 && !data.data.err) {
        let d = new Date(data.data.data.timestamp);

        //Fri May 29 2020 02:55:47
        const date = d.toUTCString();
        console.log(date);
        this.setState({
          data: { ...data.data.data },
          date,
          expenseData: true,
          loading: false,
        });
      }

      this.setState({ loading: false });
    });
  };
  handleChangeTab = (d) => {
    this.setState({ expenseData: d });
  };

  render() {
    return (
      <div className='content'>
        {this.state.loading ? this.showLoading() : this.expenseDataView()}
      </div>
    );
  }

  expenseDataView = () => {
    if (this.state.date == "") {
      return (
        <div className='alert alert-danger' role='alert'>
          <h3 style={{ textAlign: "center" }}>No Data Found</h3>
        </div>
      );
    }
    return (
      <Row>
        <Col md='12'>
          <Card>
            <CardHeader>
              <CardTitle tag='h4'>Expense Data</CardTitle>
            </CardHeader>
            <CardBody>
              <Row>
                <Col className='pr-md-1' md='6'>
                  <FormGroup>
                    <label htmlFor='exampleSelect1'>Time</label>
                    <Input
                      type='text'
                      style={{ color: "#16a085" }}
                      value={this.state.date}
                      defaultValue='0'
                      disabled></Input>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col className='pr-md-1' md='6'>
                  <FormGroup>
                    <label htmlFor='exampleSelect1'>Amount</label>
                    <Input
                      type='number'
                      name='price'
                      value={this.state.data.price}
                      defaultValue='0'
                      onChange={(event) => {
                        let val =
                          event.target.value < 0 ? 0 : event.target.value;
                        this.state.data.price = val;
                        this.setState(this.state);
                      }}></Input>
                  </FormGroup>
                </Col>
              </Row>{" "}
              <Row>
                <Col className='pr-md-1' md='6'>
                  <FormGroup>
                    <label htmlFor='exampleSelect1'>Expense Details</label>
                    <Input
                      type='textarea'
                      name='details'
                      value={this.state.data.details}
                      defaultValue='0'
                      onChange={(event) => {
                        let val = event.target.value;
                        this.state.data.details = val;
                        this.setState(this.state);
                      }}></Input>
                  </FormGroup>
                </Col>
              </Row>
            </CardBody>
            <CardFooter>
              <Button
                className='btn-fill'
                color='primary'
                type='button'
                onClick={() => this.updateInfo()}>
                Update
              </Button>
            </CardFooter>
          </Card>
        </Col>
      </Row>
    );
  };

  showLoading = () => {
    return (
      <div className='card bg-info text-white' style={{ margin: "0 auto" }}>
        <div className='card-body' style={{ textAlign: "center" }}>
          Loading.....&nbsp;&nbsp;
          <div className='spinner-border spinner-border-sm text-light'>
            <span className='sr-only'>Loading...</span>
          </div>
        </div>
      </div>
    );
  };

  updateInfo = () => {
    axios({
      method: "post",
      url: "/api/expense/update",
      data: this.state.data,
    })
      .then(function (response) {
        //handle success
        if (response.status == 200) {
          Swal.fire({
            title: "❇ 🎣",
            text: response.data.msg,
            icon: response.data.type,
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
  };
}

export default Expense;
