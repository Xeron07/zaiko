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
    UncontrolledTooltip
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
            <Card>
                <CardHeader>Login</CardHeader>
                <CardBody>

                        <FormGroup>
                            <label>Email Address:</label>
                            <Input placeholder="username@domain.com" type="email" />
                        </FormGroup>

                    <FormGroup>
                        <label>Password:</label>
                        <Input placeholder="Enter password" type="password" />
                    </FormGroup>

                </CardBody>
            </Card>
        );
    }


    
}