/** @format */

import React from "react";
import { Link } from "react-router-dom";
import Datatable from "react-bs-datatable";
import axios from "axios";
import Swal from "sweetalert2";
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

class Expense extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expenseData: true,
      expenseList: [],
      expenseType: [],
      typeTxt: "",
      typeToDelete: "DEFAULT",
      expense: {
        type: "",
        details: "",
        price: "",
      },
    };
    this.headers = [
      { title: "#", prop: "e_id", sortable: true, filterable: true },
      { title: "Date", prop: "timestamp", sortable: true, filterable: true },
      { title: "Amount", prop: "price", sortable: true, filterable: true },
      { title: "Details", prop: "details", sortable: true, filterable: true },
      { title: "Show", prop: "e_id", sortable: true, filterable: true },
    ];
  }

  componentDidMount = () => {
    this.relaodData();
    this.reloadType();
  };

  relaodData = () => {
    fetch("/api/expense/all")
      .then((response) => response.json())
      .then((data) => {
        if (!data.err) this.setState({ expenseList: [...data.data] });
      });
  };

  reloadType = () => {
    fetch("/api/expense/type/all")
      .then((response) => response.json())
      .then((data) => {
        if (!data.err) this.setState({ expenseType: [...data.data] });
      });
  };

  handleChangeTab = (d) => {
    this.setState({ expenseData: d });
  };

  render() {
    return (
      <div className='content'>
        {this.setBradeCumb()}

        {this.state.expenseData
          ? this.expenseDataView()
          : this.addExpenseView()}
      </div>
    );
  }

  expenseDataView = () => {
    if (this.state.expenseList.length < 0) {
      return <h2 style={{ textAlign: "center" }}>No Data</h2>;
    }
    return (
      <Row>
        <Col md='12'>
          <Card>
            <CardHeader>
              <CardTitle tag='h4'>Expense Data</CardTitle>
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
              <Table className='tablesorter' id='expense' responsive>
                <thead className='text-primary'>
                  <tr>
                    <th>#</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Details</th>
                    <th>Show</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.expenseList.map((data) => {
                    return (
                      <tr key={data.e_id}>
                        <td>{data.e_id}</td>
                        <td>{data.timestamp}</td>
                        <td>{data.price}</td>
                        <td>{data.details}</td>
                        <td>
                          <Link to={"/admin/exp/" + data.e_id}>Visit</Link>
                        </td>
                        <button
                          className='btn btn-outline-danger'
                          onClick={() => {
                            this.deleteExpense(data.e_id);
                          }}>
                          Delete
                        </button>
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

  addExpenseView = () => {
    return (
      <Row>
        <Col className='pr-md-1' md='8'>
          <Card>
            <CardHeader>
              <h5 className='title'>Expense Form</h5>
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
                    Expense information
                  </legend>
                  <Row>
                    <Col className='pr-md-1' md='5'>
                      <FormGroup>
                        <label>Expense Type</label>
                        <Input
                          value={this.state.expense.type}
                          placeholder='Select Type'
                          type='select'
                          onChange={(event) => {
                            this.state.expense.type = event.target.value;
                            this.setState(this.state);
                          }}>
                          {this.state.expenseType.map((m) => {
                            return <option value={m.eType}>{m.name}</option>;
                          })}
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md='5'>
                      <FormGroup>
                        <label>Amount</label>
                        <Input
                          value={this.state.expense.price}
                          placeholder='Amount paid'
                          type='number'
                          onChange={(event) => {
                            this.state.expense.price = event.target.value;
                            this.setState(this.state);
                          }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md='11'>
                      <FormGroup>
                        <label htmlFor='exampleInputEmail1'>Details</label>
                        <Input
                          value={this.state.expense.details}
                          placeholder='Write details about expense'
                          type='textarea'
                          onChange={(event) => {
                            this.state.expense.details = event.target.value;
                            this.setState(this.state);
                          }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  {/* <Row>
                    <Col className='pr-md-1' md='4'>
                      <FormGroup>
                        <label>Select date</label>
                        <Input defaultValue='' placeholder='' type='date' />
                      </FormGroup>
                    </Col>
                  </Row> */}
                </fieldset>
              </Form>
            </CardBody>
            <CardFooter>
              <Button
                className='btn-fill'
                color='primary'
                type='button'
                onClick={() => {
                  this.SaveData();
                }}>
                Save
              </Button>
            </CardFooter>
          </Card>
        </Col>

        <Col className='pr-md-1' md='4'>
          <Card>
            <CardHeader>
              <h5 className='title'>Add New Expense Type</h5>
            </CardHeader>
            <CardBody>
              <Form>
                <Row>
                  <Col className='pr-md-1' md='11'>
                    <FormGroup>
                      <label>Expense Type</label>
                      <Input
                        value={this.state.typeTxt}
                        placeholder='Enter a type'
                        type='text'
                        onChange={(event) => {
                          this.state.typeTxt = event.target.value;
                          this.setState(this.state);
                        }}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </Form>
            </CardBody>
            <CardFooter>
              <Button
                className='btn-fill'
                color='primary'
                type='button'
                onClick={() => {
                  this.addType();
                }}>
                Add
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <h5 className='title'>Remove Expense Type</h5>
            </CardHeader>
            <CardBody>
              <Form>
                <Row>
                  <Col className='pr-md-1' md='11'>
                    <FormGroup>
                      <label>Expense Type</label>
                      <Input
                        value={this.state.typeToDelete}
                        placeholder='Select a type'
                        type='select'
                        onChange={(event) => {
                          this.setState({ typeToDelete: event.target.value });
                        }}>
                        <option key='oo' value='DEFAULT' disabled>
                          Select a type
                        </option>
                        {this.state.expenseType.map((m) => {
                          return (
                            <option key={m.eType} value={m.eType}>
                              {m.name}
                            </option>
                          );
                        })}
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
              </Form>
            </CardBody>
            <CardFooter>
              <Button
                className='btn-fill'
                color='primary'
                type='button'
                onClick={() => {
                  this.deleteType();
                }}>
                Delete
              </Button>
            </CardFooter>
          </Card>
        </Col>
      </Row>
    );
  };

  setBradeCumb = () => {
    if (this.state.expenseData) {
      return (
        <Breadcrumb>
          <BreadcrumbItem active onClick={() => this.handleChangeTab(true)}>
            All Expense Data
          </BreadcrumbItem>
          <BreadcrumbItem onClick={() => this.handleChangeTab(false)}>
            <a href='#'>Add Expense</a>
          </BreadcrumbItem>
        </Breadcrumb>
      );
    } else {
      return (
        <Breadcrumb>
          <BreadcrumbItem onClick={() => this.handleChangeTab(true)}>
            <a href='#'>All Expense Data</a>
          </BreadcrumbItem>
          <BreadcrumbItem active onClick={() => this.handleChangeTab(false)}>
            Add Expense
          </BreadcrumbItem>
        </Breadcrumb>
      );
    }
  };

  addType = () => {
    axios({
      method: "POST",
      url: "/api/expense/type/add",
      data: { name: this.state.typeTxt },
    }).then((res) => {
      if (res.status == 200) alert("Type Added");
      this.setState({ typeTxt: "" });
      this.reloadType();
    });
  };

  deleteType = () => {
    axios({
      method: "POST",
      url: `/api/expense/type/delete`,
      data: { eType: this.state.typeToDelete },
    }).then((res) => {
      if (res.status == 200) alert("Type Deleted");
      this.setState({ typeToDelete: "DEFAULT" });
      this.reloadType();
    });
  };

  SaveData = () => {
    if (this.state.expense.name == "") {
      Swal.fire({
        title: "🐠",
        text: "Enter a valid name",
        icon: "warning",
      });
    } else if (this.state.expense.price == "") {
      Swal.fire({
        title: "🐠",
        text: "Enter a valid number for price",
        icon: "warning",
      });
    } else {
      axios({
        method: "POST",
        url: "/api/expense/add",
        data: this.state.expense,
      }).then((res) => {
        if (res.status == 200)
          Swal.fire({
            title: "🚚",
            text: "Expense Added",
            icon: "success",
          }).then(() => {
            window.location.href = "/admin/expense";
          });
      });
    }
  };

  deleteExpense = (id) => {
    Swal.fire({
      title: "⛈ Are You Sure?",
      text: "Operation can't revertable",
      icon: "warning",
    }).then((r) => {
      if (r.value) {
        axios({
          method: "post",
          url: `/api/expense/delete/${id}`,
        }).then((response) => {
          //handle success
          if (response.status == 200) {
            Swal.fire({
              title: "❗ Expense Deleted",
              text: "Expense is no longer available",
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

export default Expense;
