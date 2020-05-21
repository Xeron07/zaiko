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

class Storage extends React.Component {
  render() {
    return (

        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Storage Data</CardTitle>
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
                        <th className="text-center">Name</th>
                        <th className="text-center">Amount</th>
                        <th className="text-center">Unit Price</th>
                      </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td >Dakota Rice</td>
                        <td className="text-center">Niger</td>
                        <td className="text-center">Oud-Turnhout</td>
                        <td className="text-center">$36,738</td>
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


export default Storage;
    