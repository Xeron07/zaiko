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





class Purchase extends React.Component{

    render(){
        return(
            <div className="content">
                    <Row>
                        <Col md="12">
                            <Card>
                                <CardHeader>
                                    <h5 className="title">Purchase Form</h5>
                                </CardHeader>
                                <CardBody>
                                    <Form>
                                    <fieldset style={{border:'1px solid ',padding:"10px",borderRadius:"5px"}}>
                                                   <legend style={{fontSize:"medium"}}>Seller Information</legend>
                                        <Row>
                                               <Col className="pr-md-1" md="5">
                                                   <FormGroup>
                                                       <label>Purchase From</label>
                                                       <Input
                                                           defaultValue="Compnay Name"
                                                           placeholder="Company"
                                                           type="text"

                                                       />
                                                   </FormGroup>
                                               </Col>
                                               <Col className="pr-md-1" md="5">
                                                   <FormGroup>
                                                       <label>Address</label>
                                                       <Input
                                                           defaultValue=""
                                                           placeholder="Company Address"
                                                           type="text"

                                                       />
                                                   </FormGroup>
                                               </Col>
                                               </Row>
                                               <Row>
                                               <Col className="pr-md-1" md="5">
                                                   <FormGroup>
                                                       <label>Mobile Number</label>
                                                       <Input
                                                           defaultValue=""
                                                           placeholder="01XXXXX"
                                                           type="number"

                                                       />
                                                   </FormGroup>
                                               </Col>
                                               <Col className="pr-md-1" md="5">
                                                   <FormGroup>
                                                       <label>Email</label>
                                                       <Input
                                                           defaultValue=""
                                                           placeholder="user@domain.com"
                                                           type="email"

                                                       />
                                                   </FormGroup>
                                               </Col>
                                               </Row>
                                               </fieldset>
                                           
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
                                                   <legend style={{fontSize:"medium"}}>Expence Information</legend>
                                                   <Row>
                                        <Col className="pr-md-1" md="6">
                                                   <FormGroup>
                                                       <label>Total price (without expence)</label>
                                                       <Input
                                                           defaultValue="0"
                                                           placeholder="discount"
                                                           type="number"
                                                       />
                                                   </FormGroup>
                                               </Col>
                                               </Row>
                                               <Row>
                                        <Col className="pr-md-1" md="8">
                                                   <FormGroup>
                                                       <label>Expence Information</label>
                                                       <Input
                                                           defaultValue=""
                                                           placeholder="Expence information"
                                                           type="textarea"
                                                           
                                                       />
                                                   </FormGroup>
                                               </Col>
                                              
                                        <Col className="pr-md-1" md="4">
                                                   <FormGroup>
                                                       <label>Expence</label>
                                                       <Input
                                                           defaultValue="0"
                                                           placeholder="discount"
                                                           type="number"
                                                           
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
                                                           placeholder="discount"
                                                           type="number"
                                                       />
                                                   </FormGroup>
                                               </Col>
                                               <Col className="pr-md-1" md="5">
                                                   <FormGroup>
                                                       <label>Paid</label>
                                                       <Input
                                                           defaultValue="0"
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
                                                           placeholder="Not paid"
                                                           type="number"
                                                       />
                                                   </FormGroup>
                                               </Col>
                                       
                                        </Row>
                                        </fieldset>
                                    </Form>
                                </CardBody>
                                <CardFooter>
                                    <Button className="btn-fill" color="primary" type="submit">
                                        Save
                                    </Button>
                                </CardFooter>
                            </Card>
                        </Col>
        
                   </Row>
                   </div>
        );
    }
}

export default Purchase;