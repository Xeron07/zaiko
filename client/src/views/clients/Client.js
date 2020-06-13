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
import axios from "axios";
import Swal from "sweetalert2";
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
    this.relaodData();
  };
  relaodData = () => {
    this.setState({ isLoading: true });
    fetch("/api/client/all")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ data: data.data });
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
            window.location.href = "/admin/client/addclient";
          }}>
          Add New Client
        </button>
        <br />
        {this.renderFunc()}
      </div>
    );
  }

  renderFunc = () => {
    if (this.state.isLoading) return this.showLoading();
    else if (!this.state.data) return this.showNoData();
    else if (this.state.data) return this.showData();
  };

  showNoData = () => {
    return (
      <div class='card bg-warning text-white' style={{ margin: "0 auto" }}>
        <div class='card-body' style={{ textAlign: "center" }}>
          No Data Found
        </div>
      </div>
    );
  };
  showLoading = () => {
    return (
      <div class='card bg-info text-white' style={{ margin: "0 auto" }}>
        <div class='card-body' style={{ textAlign: "center" }}>
          <div class='spinner-border text-dark'></div>Loading
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
              <CardTitle tag='h4'>Client Data</CardTitle>
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
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Show</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.data.map((m) => {
                    return (
                      <tr>
                        <td>{m.cid}</td>
                        <td>{m.name}</td>
                        <td>{m.email}</td>
                        <td>{m.pn}</td>
                        <td>{m.address}</td>
                        <td>
                          <Link to={`/admin/client/${m.cid}`}>Details</Link>
                        </td>
                        <td>
                          <button
                            className='btn btn-danger'
                            onClick={() => this.deleteClient(m.cid)}>
                            Delete
                          </button>
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

  deleteClient = (id) => {
    Swal.fire({
      title: "⛈ Are You Sure?",
      text: "Operation can't revertable",
      icon: "warning",
    }).then((r) => {
      if (r.value) {
        axios({
          method: "post",
          url: `/api/client/delete/${id}`,
        }).then((response) => {
          //handle success
          if (response.status == 200) {
            Swal.fire({
              title: "❗ Client Deleted",
              text: "Client is no longer available",
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

export default Client;
