/** @format */

import React from "react";
import Swal from "sweetalert2";
import axios from "axios";
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
class Storage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [1],
      isLoading: true,
    };
  }

  componentDidMount = () => {
    this.relaodData();
  };

  relaodData = () => {
    this.setState({ isLoading: true });
    axios({
      method: "get",
      url: "/api/product/all",
    }).then((data) => {
      data = data.data;
      console.log(data);
      data.err == "no"
        ? this.setState({ data: [...data.data] })
        : this.setState({ data: [] });
      this.setState({ isLoading: false });
    });
  };

  render() {
    return (
      <div className='content'>
        <button
          style={{
            padding: "10px",
            border: "1px solid white",
            backgroundColor: "transparent",
            color: "white",
          }}
          onClick={() => {
            window.location.href = "/admin/addstorage";
          }}>
          Add New Product
        </button>
        <br />
        {this.renderFunc()}
      </div>
    );
  }

  renderFunc = () => {
    if (this.state.isLoading) return this.showLoading();
    else if (this.state.data.length == 0) return this.showNoData();
    else if (this.state.data.length > 0) return this.showData();
  };

  showNoData = () => {
    return (
      <Row>
        <Col md='12'>
          <Card>
            <CardHeader>
              <CardTitle tag='h4'>Storage Data</CardTitle>
            </CardHeader>

            <CardBody>
              <h3 style={{ textAlign: "center" }}>No Data</h3>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  };
  showLoading = () => {
    return (
      <div class='card bg-info text-white' style={{ margin: "0 auto" }}>
        <div class='card-body' style={{ textAlign: "center" }}>
          <div class='spinner-border text-dark'></div>{" "}
          <button onClick={() => window.open("https://google.com")}>
            Loading
          </button>
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
              <CardTitle tag='h4'>Storage Data</CardTitle>
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
                    <th>#</th>
                    <th className='text-center'>Name</th>
                    <th className='text-center'>Amount</th>
                    <th className='text-center'>Unit Price</th>
                    <th className='text-center'>Update</th>
                    <th className='text-center'>Delete</th>
                  </tr>
                </thead>
                <tbody id='t-body'>
                  {this.state.data.map((item) => (
                    <tr key={item.p_id}>
                      <td>{item.p_id}</td>
                      <td className='text-center'>{item.name}</td>
                      <td className='text-center'>{item.amount}</td>
                      <td className='text-center'>{item.unit_price}</td>
                      <td className='text-center'>
                        <Link to={`/admin/single/${item.p_id}`}>Update</Link>
                      </td>
                      <td className='text-center'>
                        <button
                          className='btn btn-outline-delete'
                          onClick={() => {
                            this.deleteProduct(item.p_id);
                          }}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  };

  deleteProduct = (id) => {
    Swal.fire({
      title: "⛈ Are You Sure?",
      text: "Operation can't revertable",
      icon: "warning",
    }).then((r) => {
      if (r.value) {
        axios({
          method: "post",
          url: `/api/product/delete/${id}`,
        }).then((response) => {
          //handle success
          if (response.status == 200) {
            Swal.fire({
              title: "❗ Product Deleted",
              text: "Product is no longer available",
              icon: "success",
              onClose: () => {
                this.relaodData();
              },
            });
          }
        });
      } else {
        Swal.fire("⛑, Safe", "Operation cancelled. ", "info");
      }
    });
  };
}

export default Storage;
