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
  Input
} from "reactstrap";

class Client extends React.Component {
  render() {
    return (

        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Client Data</CardTitle>
                </CardHeader>
                <CardBody>
                <fieldset style={{border:'1px solid ',padding:"10px",borderRadius:"5px"}}>
                        <legend style={{fontSize:"medium"}}>Search</legend>
                        <Row>
                        <Col className="pr-md-1" md="11">
                             <FormGroup>
                             <InputGroup>
                            <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                   <i className="tim-icons icon-zoom-split" />
                            </InputGroupText>
                            </InputGroupAddon>
                                <Input
                                defaultValue=""
                                placeholder="enter key to search .."
                                type="text"

                                />
                                </InputGroup>
                             </FormGroup>
                         </Col>
                        </Row>

                </fieldset>
                <br/>
                  <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                    <tr>
                        <th>#</th>
                        <th >Name</th>
                        <th >Email</th>
                        <th >Phone</th>
                        <th>Address</th>
                        <th >Paid</th>
                        <th >Due</th>
                      </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td >Dakota Rice</td>
                        <td >Niger</td>
                        <td >Oud-Turnhout</td>
                        <td >$36,738</td>
                        <td >Niger</td>
                        <td >Oud-Turnhout</td>
                        <td >$36,738</td>
                      </tr>
                    </tbody>
                    </Table>
                    </CardBody>
                    </Card>
                    </Col>
                    </Row>
                    </div>
                    );
                    }
}


export default Client;
    