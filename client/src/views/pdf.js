/** @format */

import React from "react";

// // reactstrap components
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   Card,
//   CardHeader,
//   CardBody,
//   CardFooter,
//   Button,
//   CardTitle,
//   Table,
//   Row,
//   Col,
//   FormGroup,
//   InputGroup,
//   InputGroupAddon,
//   InputGroupText,
//   Input,
//   Form,
// } from "reactstrap";

import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

class pdfComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tst: {},
    };
  }

  componentDidMount = () => {};

  render() {
    return (
      <PDFViewer
        style={{ height: "100%", width: "100%", position: "absolute" }}>
        {this.MyDocument()}
      </PDFViewer>
    );
  }

  MyDocument = () => {
    return (
      <Document>
        <Page size='A4' style={styles.page}>
          <View style={styles.section}>
            <Text>Section #1</Text>
          </View>
          <View style={styles.section}>
            <Text>Section #2</Text>
          </View>
        </Page>
      </Document>
    );
  };
}

export default pdfComponent;
