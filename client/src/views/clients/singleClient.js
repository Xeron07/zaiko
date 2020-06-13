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
  Table,
} from "reactstrap";

class SingleClient extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      client: {},
      partials: [],
      payment: {
        amount: 0,
        due: 0,
        paid: 0,
      },
      transections: [],
      cid: "",

      update: {
        due: "",
        pay: "",
        t_id: "",
      },
    };

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
  }

  componentDidMount = () => {
    const { id } = this.props.match.params;
    this.state.cid = id.toString();
    console.clear();
    console.log(this.state.cid);
    this.setState(this.state);
    this.reloadData();
  };

  reloadData = () => {
    this.state.loading = true;

    axios({
      method: "get",
      url: `/api/client/details/${this.state.cid}`,
    }).then((data) => {
      console.clear();
      console.log(data.data);
      if (data.status == 200) {
        this.state.client = data.data.clientInfo;
        this.state.payment = data.data.payment;
        this.state.partials = data.data.partials;
        this.state.transections = data.data.transections;
        this.setState(this.state);
      }

      this.setState({ loading: false });
    });
  };

  render() {
    return (
      <>
        <div className='content'>
          <Row>
            {this.clientInfoView()}
            {this.paymentView()}
          </Row>
          {this.tableView()}
        </div>
      </>
    );
  }

  clientInfoView = () => {
    if (this.state.cid == "") return;
    return (
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
                      <label htmlFor='exampleInputEmail1'>Email address</label>
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
                      <label htmlFor='exampleInputEmail1'>Phone Number</label>
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
    );
  };

  paymentView = () => {
    return (
      <Col md='4'>
        <Card>
          <CardHeader>
            <h5 className='title'>Payment Data</h5>
          </CardHeader>
          <CardBody>
            <Form>
              <Col className='pr-md-1' md='11'>
                <FormGroup>
                  <label>Total Amount</label>
                  <Input
                    placeholder='Amount'
                    type='text'
                    value={this.state.payment.amount}
                    style={{ color: "#16a085" }}
                    disabled
                  />
                </FormGroup>
              </Col>
              <Col className='pr-md-1' md='11'>
                <FormGroup>
                  <label>Total Paid</label>
                  <Input
                    placeholder='Paid'
                    type='text'
                    value={this.state.payment.paid}
                    style={{ color: "#27ae60" }}
                    disabled
                  />
                </FormGroup>
              </Col>
              <Col className='pr-md-1' md='11'>
                <FormGroup>
                  <label>Total Due</label>
                  <Input
                    placeholder='Due'
                    type='text'
                    value={this.state.payment.Due}
                    style={{ color: "#c0392b" }}
                    disabled
                  />
                </FormGroup>
              </Col>
            </Form>
          </CardBody>
        </Card>
      </Col>
    );
  };

  transectionsData = () => {
    if (this.state.transections.length <= 0)
      return <h3 style={{ textAlign: "center" }}>No Data Found</h3>;
    const tdata = this.state.transections.reverse();
    return (
      <Table className='tablesorter' responsive>
        <thead className='text-primary'>
          <tr>
            <th>Time</th>
            <th>Type</th>
            <th>Total</th>
            <th>Quantity</th>
            <th>Paid</th>
            <th>Discount</th>
            <th>Details</th>
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
                <td>{m.type}</td>
                <td>{m.payment.amount}</td>
                <td>{m.product.quantity}</td>
                <td>{m.payment.paid}</td>
                <td>{m.payment.discount}</td>
                <td>
                  <button
                    className='btn btn-danger'
                    onClick={() => {
                      alert(m.t_id);
                    }}>
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  };

  partialData = () => {
    if (this.state.partials.length <= 0)
      return <h3 style={{ textAlign: "center" }}>No Data Found</h3>;
    const pdata = this.state.partials.reverse();
    return (
      <Table className='tablesorter' responsive>
        <thead className='text-primary'>
          <tr>
            <th>T_ID</th>
            <th>Paid</th>
            <th>Due</th>
            <th>Show</th>
          </tr>
        </thead>
        <tbody>
          {pdata.map((m) => {
            return (
              <tr>
                <td>{m.t_id}</td>
                <td>{m.partial.paid}</td>
                <td>{m.partial.due}</td>
                <td>
                  <button
                    className='btn btn-danger'
                    onClick={() => alert(m.t_id)}>
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  };

  tableView = () => {
    return (
      <Row>
        <Col md='6'>
          <Card>
            <CardHeader>
              <h5 className='title'>Transection History</h5>
            </CardHeader>
            <CardBody>{this.transectionsData()}</CardBody>
          </Card>
        </Col>

        <Col md='6'>
          <Card>
            <CardHeader>
              <h5 className='title'>Partial Payment</h5>
            </CardHeader>
            <CardBody>{this.partialData()}</CardBody>
          </Card>
        </Col>
      </Row>
    );
  };

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
        url: "/api/client/update",
        data: this.state.client,
      }).then((response) => {
        console.clear();
        console.log(response);
        //handle success
        if (response.status == 200) {
          Swal.fire({
            title: "🐬🐬",
            text: "Client Data Updated",
            icon: "success",
          }).then(() => {
            this.reloadData();
          });
        }
      });
    }
  };
  // popUp = () => {
  //   const [show, setShow] = useState(false);

  //   return (
  //     <>
  //       <Button variant='primary' onClick={() => setShow(true)}>
  //         Custom Width Modal
  //       </Button>

  //       <Modal
  //         show={show}
  //         onHide={() => setShow(false)}
  //         dialogClassName='modal-90w'
  //         aria-labelledby='example-custom-modal-styling-title'>
  //         <Modal.Header closeButton>
  //           <Modal.Title id='example-custom-modal-styling-title'>
  //             Custom Modal Styling
  //           </Modal.Title>
  //         </Modal.Header>
  //         <Modal.Body>
  //           <p>
  //             Ipsum molestiae natus adipisci modi eligendi? Debitis amet quae
  //             unde commodi aspernatur enim, consectetur. Cumque deleniti
  //             temporibus ipsam atque a dolores quisquam quisquam adipisci
  //             possimus laboriosam. Quibusdam facilis doloribus debitis! Sit
  //             quasi quod accusamus eos quod. Ab quos consequuntur eaque quo rem!
  //             Mollitia reiciendis porro quo magni incidunt dolore amet atque
  //             facilis ipsum deleniti rem!
  //           </p>
  //         </Modal.Body>
  //       </Modal>
  //     </>
  //   );
  // };
}

export default SingleClient;
