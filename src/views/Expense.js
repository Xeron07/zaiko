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
    FormGroup,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Input,
    Form
} from "reactstrap";

class Expense extends React.Component{
    constructor(props) {
        super(props);
        this.state = {expenseData:true};
      }

    handleChangeTab=(d)=>{
        this.setState({expenseData:d});
    }

    render(){
        return(
            <div className="content">
                {this.setBradeCumb()}

                {this.state.expenseData?this.expenseDataView() : this.addExpenseView()}

           </div>
           
        );
    }


    expenseDataView=()=>{
        return(
            <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Expense Data</CardTitle>
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
                        <th>Date</th>
                        <th >Details</th>
                        <th >Amount</th>
                        <th>Type</th>
                      </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td >Dakota Rice</td>
                        <td >Niger</td>
                        <td >Oud-Turnhout</td>
                        <td >$36,738</td>
                        <td >Niger</td>
                      </tr>
                    </tbody>
                    </Table>
                    </CardBody>
                    </Card>
                    </Col>
                    </Row>
                   
        );
    }

    addExpenseView=()=>{
        return (
            <Row>
                <Col className="pr-md-1" md="8">
                <Card>
                                <CardHeader>
                                    <h5 className="title">Client Form</h5>
                                </CardHeader>
                                <CardBody>
                                    <Form>
                                     
                                        <fieldset style={{border:'1px solid ',padding:"10px",borderRadius:"5px"}}>
                                                   <legend style={{fontSize:"medium"}}>Expence information</legend>
                                               <Row>
                                            
                                               <Col className="pr-md-1" md="5">
                                                   <FormGroup>
                                                       <label>Expence Type</label>
                                                       <Input
                                                           defaultValue=""
                                                           placeholder="Select Type"
                                                           type="select"
                                                       />
                                                   </FormGroup>
                                               </Col>
                                               <Col md="5">
                                                <FormGroup>
                                                    <label>Amount</label>
                                                    <Input
                                                        defaultValue=""
                                                        placeholder="Amount paid"
                                                        type="number"
                                                    />
                                                </FormGroup>
                                            </Col>
                                               
                                           </Row>


                                        <Row>
                                        <Col md="11">
                                                   <FormGroup>
                                                       <label htmlFor="exampleInputEmail1">
                                                           Details
                                                       </label>
                                                       <Input placeholder="Write details about expense" type="textarea" />
                                                   </FormGroup>
                                               </Col>
                                        </Row>
                                      
                                        <Row>
                                            <Col className="pr-md-1" md="4">
                                                <FormGroup>
                                                    <label>Select date</label>
                                                    <Input
                                                        defaultValue=""
                                                        placeholder=""
                                                        type="date"
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
        );
    }

    setBradeCumb=()=>{
        if(this.state.expenseData){
           return(  <Breadcrumb>
                 <BreadcrumbItem active onClick={()=>this.handleChangeTab(true)}>All Expense Data</BreadcrumbItem>
                <BreadcrumbItem  onClick={()=>this.handleChangeTab(false)}><a href="#">Add Expense</a></BreadcrumbItem>
            </Breadcrumb>);
        }else{
            return(  <Breadcrumb>
                <BreadcrumbItem  onClick={()=>this.handleChangeTab(true)}><a href="#">All Expense Data</a></BreadcrumbItem>
               <BreadcrumbItem active onClick={()=>this.handleChangeTab(false)}>Add Expense</BreadcrumbItem>
           </Breadcrumb>);
        }
    }


}

export default Expense;
