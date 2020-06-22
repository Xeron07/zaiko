/** @format */

import React from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";

class Client extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      selectedData: [],
      selectedProducts: [],
      selectedClient: null,
      isLoading: false,
      modalDemo: false,
    };
  }
  toggleModalDemo() {
    this.state.modalDemo = !this.state.modalDemo;
    this.setState(this.state);
  }

  componentDidMount = () => {
    this.reloadDatas();
  };

  reloadDatas = () => {
    this.setState({ isLoading: true });
    fetch("/api/operation/transection/all")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.setState({ data: [...data.data], selectedData: [...data.data] });
        this.setState({ isLoading: false });
        console.log(this.state.data);
      });
  };

  render() {
    return <div className='content'>{this.renderFunc()}</div>;
  }

  renderFunc = () => {
    if (this.state.isLoading) return this.showLoading();
    else if (!this.state.data) return this.showNoData();
    else if (this.state.data) return this.showData();
  };

  showNoData = () => {
    return (
      <div className='card bg-warning text-white' style={{ margin: "0 auto" }}>
        <div className='card-body' style={{ textAlign: "center" }}>
          No Data Found
        </div>
      </div>
    );
  };
  showLoading = () => {
    return (
      <div className='card bg-info text-white' style={{ margin: "0 auto" }}>
        <div className='card-body' style={{ textAlign: "center" }}>
          <div className='spinner-border text-dark'></div>Loading
        </div>
      </div>
    );
  };
  //return the data view
  showData = () => {
    const dataList = this.state.selectedData.reverse();
    return (
      <Row>
        <Col md='12'>
          <Card>
            <CardHeader>
              <CardTitle tag='h4'>Transection History</CardTitle>
            </CardHeader>
            <CardBody>
              <fieldset
                style={{
                  border: "1px solid ",
                  padding: "10px",
                  borderRadius: "5px",
                }}>
                <legend style={{ fontSize: "medium" }}>Search</legend>
                <Row>
                  <Col className='pr-md-1' md='11'>
                    <FormGroup>
                      <InputGroup>
                        <InputGroupAddon addonType='prepend'>
                          <InputGroupText>
                            <i className='tim-icons icon-zoom-split' />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          defaultValue=''
                          placeholder='Enter transection id to search ..'
                          type='text'
                          onChange={(event) => {
                            let str = event.target.value;
                            if (!str) {
                              this.state.selectedData = [...this.state.data];
                              this.setState(this.state);
                              return;
                            }

                            this.state.selectedData = this.state.data.filter(
                              (d) => d.t_id.toLowerCase().indexOf(str) > -1
                            );
                            this.setState(this.state);
                          }}
                        />
                      </InputGroup>
                    </FormGroup>
                  </Col>
                </Row>
              </fieldset>
              <br />
              <Table className='tablesorter' responsive>
                <thead className='text-primary'>
                  <tr>
                    <th>Time</th>
                    <th>Type</th>
                    <th>Total Items</th>
                    <th>Products</th>
                    <th>Amount</th>
                    <th>Expense</th>
                    <th>Paid</th>
                    <th>Due</th>
                    <th>Client</th>
                  </tr>
                </thead>
                <tbody>
                  {dataList.map((t) => {
                    return (
                      <tr>
                        <td>{t.time}</td>
                        <td>{t.type}</td>
                        <td>{t.amount.totalItems}</td>
                        <td style={{ cursor: "pointer" }}>
                          <a
                            style={{ color: "#7158e2" }}
                            onClick={() => {
                              this.state.selectedProducts = [...t.products];
                              this.state.modalDemo = true;
                              this.setState({
                                selectedProducts: [...t.products],
                                selectedClient: t.clients[0],
                                modalDemo: true,
                              });
                            }}>
                            Information
                          </a>
                        </td>
                        <td>{t.amount.totalAmount}</td>
                        <td>
                          <Link
                            to={"/admin/exp/" + t.eid}
                            style={
                              t.eid > 0
                                ? { display: "block" }
                                : { display: "none" }
                            }>
                            Expense
                          </Link>
                        </td>
                        <td>{t.payment.paid}</td>
                        <td>{t.payment.due}</td>
                        <td>Update Paid</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
        <Card>
          <Modal
            isOpen={this.state.modalDemo}
            toggle={() => {
              this.toggleModalDemo();
            }}>
            {/* <div
              className='modal-header'
              style={{ backgroundColor: "#3d3d3d" }}>
              <h5
                className='modal-title'
                id='exampleModalLabel'
                style={{ color: "white" }}>
                Client & Product Data
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
              </button> 
            </div> */}
            <ModalBody style={{ backgroundColor: "#3d3d3d" }}>
              <h4 style={{ color: "#ccae62" }}>
                <u>Client Data</u>
              </h4>
              {this.showClientData()}
              <h4 style={{ color: "#ccae62" }}>
                <u>Products</u>
              </h4>
              {this.showProductList()}
            </ModalBody>
            <ModalFooter style={{ backgroundColor: "#3d3d3d" }}>
              <Button color='secondary' onClick={() => this.toggleModalDemo()}>
                Close
              </Button>
            </ModalFooter>
          </Modal>
        </Card>
      </Row>
    );
  };

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

  showClientData = () => {
    if (this.state.selectedClient == null) {
      return (
        <div>
          <h5>No Client :(</h5>
        </div>
      );
    }
    return (
      <div>
        <h6>
          Client Id:{"  "}
          <i style={{ color: "#d35400" }}>{this.state.selectedClient.cid}</i>
        </h6>
        <h6>
          Client Name:{"  "}
          <i style={{ color: "#16a085" }}>{this.state.selectedClient.name}</i>
        </h6>
        <h6>
          Client Phone Number:{"  "}
          <i style={{ color: "#2980b9" }}>{this.state.selectedClient.pn}</i>
        </h6>
        <hr />
      </div>
    );
  };
}

export default Client;
