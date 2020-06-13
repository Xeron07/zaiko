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
} from "reactstrap";
import { Link } from "react-router-dom";

class Client extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: false,
    };
  }

  componentDidMount = () => {
    this.reloadDatas();
  };

  reloadDatas = () => {
    this.setState({ isLoading: true });
    fetch("/api/operation/product/all")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.setState({ data: [...data.data] });
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
                          placeholder='enter key to search ..'
                          type='text'
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
                    <th>Product Id</th>
                    <th>Quantity</th>
                    <th>Amount</th>
                    <th>Expense Id</th>
                    <th>Paid</th>
                    <th>Due</th>
                    <th>Clients</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.data.map((t) => {
                    return (
                      <tr>
                        <td>{t.time}</td>
                        <td>{t.type}</td>
                        <td>
                          <Link to={`/admin/single/${t.product.p_id}`}>
                            Product
                          </Link>
                        </td>
                        <td>{t.product.quantity}</td>
                        <td>{t.payment.amount}</td>
                        <td>{t.payment.e_id}</td>
                        <td>{t.payment.paid}</td>
                        <td>{t.partial.due}</td>
                        <td>
                          <Link to={`/admin/client/${t.cid}`}>Client</Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  };
}

export default Client;
