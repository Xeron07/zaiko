/** @format */

import React from "react";

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
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Form,
} from "reactstrap";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 15,
    marginRight: 0,
    flexGrow: 1,
    textAlign: "left",
    width: "10%",
  },
  col1: {
    padding: "5px",
    fontSize: "10px",
    width: "100%",
    marginBottom: "1px",
    boxSizing: "content-box",
    height: "20px",
    padding: "5px",
    border: "1px solid white",
    backgroundColor: "#7f8c8d",
  },
  col2: {
    padding: "5px",
    fontSize: "10px",
    width: "100%",
    marginBottom: "1px",
    boxSizing: "content-box",
    height: "20px",
    padding: "5px",
    border: "1px solid white",
    backgroundColor: "#bdc3c7",
  },
});

class singleTracnsection extends React.Component {
  constructor(props) {
    super(props);
    this.monthName = {
      1: "Jan",
      2: "Feb",
      3: "Mar",
      4: "Apr",
      5: "May",
      6: "Jun",
      7: "July",
      8: "Aug",
      9: "Sep",
      10: "Oct",
      11: "Nov",
      12: "Dec",
    };
    this.state = {
      modalLarge: false,
      monthView: true,
      cost: {
        bankCharge: 0,
        dep: 0,
        rent: 0,
        utility: 0,
        saving: 0,
        extra: 0,
        share: 0,
      },
      month: "Not Selected",
      year: "Not Selected",
      tSells: 0,
      tPurchase: 0,
      tLoss: 0,
      tCost: 0,
      tProfit: 0,
      tShare: 0,
      mProfit: 0,
      profit: 0,
      netprofit: 0,
      savingAmount: 0,
      data: [],
      index: -1,

      daily: {
        month: [],
        days: [],
        year: [],
      },
    };
  }

  componentDidMount = () => {
    this.reloadData();
  };
  reloadData = () => {
    fetch("/api/cost/get")
      .then((response) => response.json())
      .then((data) => {
        this.state.cost = { ...data };
        this.setState(this.state);
        this.totalCost();
      });

    fetch("/api/operation/dateTime")
      .then((response) => response.json())
      .then((data) => {
        this.state.data = [...data.trData];
        this.setState(this.state);
      });

    // fetch("/api/operation/date/all")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     const dates = [...data.data];
    //     dates.forEach((val) => {
    //       if (!this.state.daily.year.includes(val._id.year)) {
    //         this.state.daily.year.push(val._id.year);
    //       }
    //     });
    //     this.state.data = [...data.trData];
    //     this.setState(this.state);
    //   });
  };

  monthView = () => {
    return this.state.data.map((d, i) => {
      return (
        <option value={i}>
          {d._id.month}, {d._id.year}
        </option>
      );
    });
  };

  totalCost = () => {
    const val =
      +this.state.cost.bankCharge +
      +this.state.cost.dep +
      +this.state.cost.extra +
      +this.state.cost.rent +
      +this.state.cost.utility;
    this.setState({ tCost: val });
    return val;
  };

  navView = () => {
    return (
      <div>
        <Breadcrumb>
          <BreadcrumbItem active> Monthly</BreadcrumbItem>
          <BreadcrumbItem
            onClick={() => {
              this.setState({ monthView: false });
            }}>
            Daily
          </BreadcrumbItem>
        </Breadcrumb>
        <Breadcrumb>
          <BreadcrumbItem
            onClick={() => {
              this.setState({ monthView: true });
            }}>
            Monthly
          </BreadcrumbItem>
          <BreadcrumbItem active> Daily</BreadcrumbItem>
        </Breadcrumb>
      </div>
    );
  };
  render() {
    return (
      <div className='content'>
        {this.navView()}
        <Modal
          isOpen={this.state.modalLarge}
          toggle={this.toggleModalLarge}
          style={{ backgroundColor: "transparent" }}
          size='lg'>
          <ModalHeader
            className='justify-content-center'
            toggle={this.toggleModalLarge}>
            PDF
          </ModalHeader>
          <ModalBody style={{ background: "transparent" }}>
            <div
              style={{ height: "100vh", width: "100%", position: "absolute" }}>
              <PDFViewer
                style={{ height: "100%", width: "100%", position: "absolute" }}>
                {this.MyDocument()}
              </PDFViewer>
            </div>
          </ModalBody>
        </Modal>
      </div>
    );
  }

  toggleModalLarge = () => {
    this.setState({
      modalLarge: !this.state.modalLarge,
    });
  };

  handleMonthCange = (event) => {
    this.setState({ index: event.target.value });
    const val = this.state.data[event.target.value];
    const tLoss = val.losses.length > 0 ? val.losses[0].loss : 0;
    const profit = val.sell - (+val.purchase + +tLoss);
    const savingA =
      (profit - this.state.tCost) * (this.state.cost.saving / 100);
    const share =
      ((profit - this.state.tCost - savingA) * this.state.cost.share) / 100;

    this.state.tProfit = profit;
    this.state.tSells = val.sell;
    this.state.tPurchase = val.purchase;
    this.state.tLoss = tLoss;
    this.state.mProfit = profit - this.state.tCost;

    this.state.profit = profit - this.state.tCost - savingA;
    this.state.tShare = share;
    this.state.netprofit = profit - this.state.tCost - savingA - share;
    this.state.savingAmount = savingA;

    this.setState({ month: this.monthName[val._id.month], year: val._id.year });
  };

  MyDocument = () => {
    return (
      <Document>
        <Page size='A4' style={styles.page}>
          <View style={styles.section}>
            <Text
              style={{
                fontSize: "30px",
                padding: "10px",
                marginBottom: "10px",
              }}>
              SellFish
            </Text>
            <Text
              style={{
                fontSize: "10px",
                padding: "5px",
                marginBottom: "1px",
              }}>
              Monthly Report: {this.state.month}, {this.state.year}
            </Text>
            <Text
              style={{
                fontSize: "10px",
                padding: "5px",
                marginBottom: "10px",
              }}>
              Genarated Date: {new Date().getDate()}/{new Date().getMonth()}/
              {new Date().getFullYear()} - {new Date().getHours()}.
              {new Date().getMinutes()}
            </Text>
            <Text style={{ backgroundColor: "#8e44ad", color: "white" }}>
              Report
            </Text>
            <Text style={styles.col1}>Sells</Text>
            <Text style={styles.col1}>Purchases</Text>
            <Text style={styles.col1}>Losses</Text>
            <Text style={styles.col1}>Profit From Sell</Text>
            <Text style={styles.col1}>Rent</Text>
            <Text style={styles.col1}>Utility</Text>
            <Text style={styles.col1}>Extra</Text>
            <Text style={styles.col1}>Savings ({this.state.cost.saving}%)</Text>
            <Text style={styles.col1}>Profit</Text>
            <Text style={{ ...styles.col1, color: "#3d3d3d" }}>
              Total Profit
            </Text>
            <Text style={{ ...styles.col1, color: "#227093" }}>
              Share ({this.state.cost.share}%)
            </Text>
            <Text
              style={{ ...styles.col1, color: "#474787", fontWeight: "bold" }}>
              Net Profit
            </Text>
          </View>
          <View
            style={{
              marginTop: 3,
              marginRight: 15,
              padding: 0,
              flexGrow: 1,
              textAlign: "left",
            }}>
            <Text
              style={{
                fontSize: "30px",
                padding: "10px",
                marginBottom: "10px",
              }}>
              {" "}
            </Text>
            <Text
              style={{ fontSize: "10px", padding: "5px", marginBottom: "1px" }}>
              {" "}
            </Text>
            <Text
              style={{
                fontSize: "10px",
                padding: "5px",
                marginBottom: "10px",
              }}>
              {" "}
            </Text>
            <Text style={{ fontSize: "20px", padding: "5px" }}> </Text>

            <Text style={styles.col2}>{this.state.tSells}</Text>
            <Text style={styles.col2}>{this.state.tPurchase}</Text>
            <Text style={styles.col2}>{this.state.tLoss}</Text>
            <Text style={styles.col2}>{this.state.tProfit}</Text>
            <Text style={styles.col2}>{this.state.cost.rent}</Text>
            <Text style={styles.col2}>{this.state.cost.utility}</Text>
            <Text style={styles.col2}>{this.state.cost.extra}</Text>
            <Text style={styles.col2}>{this.state.savingAmount}</Text>
            <Text style={styles.col2}>-</Text>
            <Text style={{ ...styles.col2, color: "#3d3d3d" }}>
              {this.state.profit}
            </Text>
            <Text style={{ ...styles.col2, color: "#227093" }}>
              {this.state.tShare}
            </Text>
            <Text style={{ ...styles.col2, color: "#474787" }}>
              {this.state.netprofit}
            </Text>
          </View>
        </Page>
      </Document>
    );
  };

  monthlyUI = () => {
    return (
      <Card className='text-white'>
        <CardHeader>Monthly Report </CardHeader>
        <CardBody>
          <CardTitle>
            <Row>
              <Col className='pr-md-6'>
                (Month: {this.state.month} Year: {this.state.year} ){" "}
              </Col>
              <Col className='pr-md-6'>
                <Input
                  type='select'
                  value={this.state.index}
                  onChange={this.handleMonthCange}>
                  <option value='-1' disabled>
                    Select One
                  </option>
                  {this.state.data.map((d, i) => {
                    return (
                      <option value={i}>
                        {this.monthName[d._id.month]}, {d._id.year}
                      </option>
                    );
                  })}
                </Input>{" "}
              </Col>
            </Row>
          </CardTitle>

          <Row>
            <Col className='pr-md-6'>Sells :</Col>
            <Col className='pr-md-6'>
              <b style={{ textAlign: "right" }}> {this.state.tSells} </b>
            </Col>
          </Row>

          <Row>
            <Col className='pr-md-6'>Purchases:</Col>
            <Col className='pr-md-6'>
              <b style={{ textAlign: "right" }}>{this.state.tPurchase}</b>
            </Col>
          </Row>

          <Row>
            <Col className='pr-md-6'>Loss</Col>
            <Col className='pr-md-6'>
              <b style={{ textAlign: "right" }}>{this.state.tLoss}</b>
            </Col>
          </Row>

          <Row>
            <Col className='pr-md-6'>Profit from sell</Col>
            <Col className='pr-md-6'>
              <b style={{ textAlign: "right" }}>{this.state.tProfit}</b>
            </Col>
          </Row>

          <Card color='primary'>
            <CardBody>
              <h6 style={{ textAlign: "center" }}>Extra Cost</h6>
            </CardBody>
          </Card>

          <Row>
            <Col className='pr-md-6'>Rent</Col>
            <Col className='pr-md-6'>
              <b style={{ textAlign: "right" }}>{this.state.cost.rent}</b>
            </Col>
          </Row>

          <Row>
            <Col className='pr-md-6'>Utility</Col>
            <Col className='pr-md-6'>
              <b style={{ textAlign: "right" }}>{this.state.cost.utility}</b>
            </Col>
          </Row>

          <Row>
            <Col className='pr-md-6'>Extra</Col>
            <Col className='pr-md-6'>
              <b style={{ textAlign: "right" }}>{this.state.cost.extra}</b>
            </Col>
          </Row>

          <Row>
            <Col className='pr-md-6'>Saving ({this.state.cost.saving}%)</Col>
            <Col className='pr-md-6'>
              <b style={{ textAlign: "right" }}>{this.state.savingAmount}</b>
            </Col>
          </Row>

          <Card color='info'>
            <CardBody>
              <h6 style={{ textAlign: "center" }}>Profit</h6>
            </CardBody>
          </Card>

          <Row>
            <Col className='pr-md-6'>Total Profit</Col>
            <Col className='pr-md-6'>
              <b style={{ textAlign: "right" }}>{this.state.profit}</b>
            </Col>
          </Row>

          <Row>
            <Col className='pr-md-6'>Share ({this.state.cost.share}%) </Col>
            <Col className='pr-md-6'>
              <b style={{ textAlign: "right" }}> {this.state.tShare} </b>
            </Col>
          </Row>

          <Row>
            <Col className='pr-md-6'>Net Profit</Col>
            <Col className='pr-md-6'>
              <b style={{ textAlign: "right" }}>{this.state.netprofit}</b>
            </Col>
          </Row>

          <Row>
            <Button
              className='btn-round'
              color='primary'
              style={
                this.state.index != -1
                  ? { display: "block" }
                  : { display: "none" }
              }
              onClick={() => {
                this.toggleModalLarge();
              }}>
              <i className='tim-icons icon-heart-2' /> Generate PDF
            </Button>
          </Row>
        </CardBody>
      </Card>
    );
  };
}

export default singleTracnsection;
