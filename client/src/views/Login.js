import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts


// reactstrap components
import {
    Button,
    ButtonGroup,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    Label,
    FormGroup,
    Input,
    Table,
    Row,
    Col,
    UncontrolledTooltip, CardText, CardFooter
} from "reactstrap";


class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email:"",
            password:""
        };
    }

    render() {
        return(
            <Col md="4">
                <Card className="card-user">
                    <CardBody>
                        <CardText />
                        <div className="author">
                            <div className="block block-one" />
                            <div className="block block-two" />
                            <div className="block block-three" />
                            <div className="block block-four" />
                            <a href="#pablo" onClick={e => e.preventDefault()}>
                                <img
                                    alt="..."
                                    className="avatar"
                                    src={require("assets/img/emilyz.jpg")}
                                />
                                <h5 className="title">Mike Andrew</h5>
                            </a>
                            <p className="description">Ceo/Co-Founder</p>
                        </div>
                        <div className="card-description">
                            Do not be scared of the truth because we need to restart the
                            human foundation in truth And I love you like Kanye loves
                            Kanye I love Rick Owens’ bed design but the back is...
                        </div>
                    </CardBody>
                    <CardFooter>
                        <div className="button-container">
                            <Button className="btn-icon btn-round" color="facebook">
                                <i className="fab fa-facebook" />
                            </Button>
                            <Button className="btn-icon btn-round" color="twitter">
                                <i className="fab fa-twitter" />
                            </Button>
                            <Button className="btn-icon btn-round" color="google">
                                <i className="fab fa-google-plus" />
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            </Col>
        );
    }


    
}