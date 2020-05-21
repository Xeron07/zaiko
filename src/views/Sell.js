import React from "react";

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
    Label,
    UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem
} from "reactstrap";

class Sells extends React.Component {
    render() {
        return (
            <>
                <div className="content">
                    <Row>
                        <Col md="7">
                            <Card>
                                <CardHeader>
                                    <h5 className="title">Sell Form</h5>
                                </CardHeader>
                                <CardBody>
                                    <Form>
                                        <Row>
                                               <Col className="pr-md-1" md="5">
                                                   <FormGroup>
                                                       <label>Sold By</label>
                                                       <Input
                                                           defaultValue="Compnay Name"
                                                           disabled
                                                           placeholder="Company"
                                                           type="text"

                                                       />
                                                   </FormGroup>
                                               </Col>
                                               </Row>

                                           
                                            <br/>
                                            <fieldset style={{border:'1px solid ',padding:"10px",borderRadius:"5px"}}>
                                                   <legend style={{fontSize:"medium"}}>Product Information</legend>
                                        <Row> 
                                             <Col className="pr-md-1" md="4">
                                             <FormGroup>
                                            <label for="exampleSelect1">Product Select</label>
                                            <Input type="select" name="select" id="exampleSelect1">
                                            </Input>
                                            </FormGroup>
                                               </Col>
                                               <Col className="pr-md-1" md="3">
                                                   <FormGroup>
                                                       <label>Quantity(kg)</label>
                                                       <Input
                                                           defaultValue="0"
                                                           placeholder=""
                                                           type="number"
                                                           
                                                       />
                                                   </FormGroup>
                                               </Col>

                                               <Col className="pr-md-1" md="3">
                                                   <FormGroup>
                                                       <label>Available(kg)</label>
                                                       <Input
                                                           defaultValue=""
                                                           placeholder="Not Selected"
                                                           type="number"
                                                           disabled
                                                       />
                                                   </FormGroup>
                                               </Col>
                                        </Row>
                                       
                                        </fieldset>
                                        <br/>
                                        <fieldset style={{border:'1px solid ',padding:"10px",borderRadius:"5px"}}>
                                                   <legend style={{fontSize:"medium"}}>Payment Information</legend>
                                        <Row>
                                        <Col className="pr-md-1" md="5">
                                                   <FormGroup>
                                                       <label>Dicount</label>
                                                       <Input
                                                           defaultValue="0"
                                                           disabled
                                                           placeholder="discount"
                                                           type="number"
                                                           disabled
                                                       />
                                                   </FormGroup>
                                               </Col>
                                               <Col className="pr-md-1" md="5">
                                                   <FormGroup>
                                                       <label>Paid</label>
                                                       <Input
                                                           defaultValue="0"
                                                           disabled
                                                           placeholder="Not paid"
                                                           type="number"

                                                       />
                                                   </FormGroup>
                                               </Col>
                                        </Row>
                                        <Row>
                                        <Col className="pr-md-1" md="5">
                                                   <FormGroup>
                                                       <label>Due</label>
                                                       <Input
                                                           defaultValue="0"
                                                           disabled
                                                           placeholder="Not paid"
                                                           type="number"
                                                           disabled
                                                       />
                                                   </FormGroup>
                                               </Col>
                                        <Col className="pr-md-1" md="5">
                                            <br/>
                                        <FormGroup check >
                                      <Label check>
                                        <Input type="checkbox" />{' '}
                                        Add Delivery Charge
                                         <span className="form-check-sign">
                                        <span className="check"></span>
                                         </span>
                                        </Label>
                                        </FormGroup>
                                        </Col>
                                        </Row>
                                        </fieldset>
                                    </Form>
                                </CardBody>
                                <CardFooter>
                                    <Button className="btn-fill" color="primary" type="submit">
                                        Procced
                                    </Button>
                                </CardFooter>
                            </Card>
                        </Col>
                        <Col md="5">
                        <Card>
                                <CardHeader>
                                    <h5 className="title">Price</h5>
                                </CardHeader>
                                <CardBody>
                                            <Row>
                                        <Col className="pr-md-1" md="4">
                                                   <FormGroup>
                                                       <label>Unit Price</label>
                                                       <Input
                                                           defaultValue="0"
                                                           placeholder="Not Selected"
                                                           type="number"
                                                           disabled
                                                       />
                                                   </FormGroup>
                                               </Col>
                                               <Col className="pr-md-1" md="4">
                                                   <FormGroup>
                                                       <label>Total Price</label>
                                                       <Input
                                                           defaultValue="0"
                                                           placeholder=""
                                                           type="number"
                                                           disabled
                                                       />
                                                   </FormGroup>
                                               </Col>
                                               
                                        </Row>
                                        <Row>
                                        <Col className="pr-md-1" md="8">
                                                   <FormGroup>
                                                       <label>Total Price (Including Delivery Charge)</label>
                                                       <Input
                                                           defaultValue="0"
                                                           placeholder=""
                                                           type="number"
                                                           disabled
                                                       />
                                                   </FormGroup>
                                               </Col>
                                        </Row>
                                        </CardBody></Card>
                                           
                        <Card>
                                <CardHeader>
                                    <h5 className="title">Client Form</h5>
                                </CardHeader>
                                <CardBody>
                                    <Form>
                                     
                                        <fieldset style={{border:'1px solid ',padding:"10px",borderRadius:"5px"}}>
                                                   <legend style={{fontSize:"medium"}}>Client Information</legend>
                                               <Row>
                                            
                                               <Col className="pr-md-1" md="5">
                                                   <FormGroup>
                                                       <label>Client Name</label>
                                                       <Input
                                                           defaultValue=""
                                                           placeholder="Enter Full Name"
                                                           type="text"
                                                       />
                                                   </FormGroup>
                                               </Col>
                                               <Col className="pl-md-1" md="5">
                                                   <FormGroup>
                                                       <label htmlFor="exampleInputEmail1">
                                                           Email address
                                                       </label>
                                                       <Input placeholder="mike@email.com" type="email" />
                                                   </FormGroup>
                                               </Col>
                                           </Row>


                                        <Row>
                                            <Col md="12">
                                                <FormGroup>
                                                    <label>Address</label>
                                                    <Input
                                                        defaultValue="No Address"
                                                        placeholder="Home Address"
                                                        type="text"
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                      
                                        <Row>
                                            <Col className="pr-md-1" md="4">
                                                <FormGroup>
                                                    <label>City</label>
                                                    <Input
                                                        defaultValue="Mike"
                                                        placeholder="City"
                                                        type="text"
                                                    />
                                                </FormGroup>
                                            </Col>

                                            <Col className="pl-md-1" md="4">
                                                <FormGroup>
                                                    <label>Postal Code</label>
                                                    <Input placeholder="ZIP Code" type="number" />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        </fieldset>
                              
                                            
                                            </Form>
                                            </CardBody>
                                            </Card>
                                           
                                            
                                    
                        </Col>
                    </Row>
                </div>
            </>
        );
    }
}

export default Sells;