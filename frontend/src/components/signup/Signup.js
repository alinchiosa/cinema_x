import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import "./Signup.css";


class Signup extends React.Component {
    constructor(){
        super();
        this.state={

        }
    }

    render(){
        return(
            <div className="signupContainer">
                <h3>Sign up</h3>
                <br/>
                <Form>
                    <Form.Group controlId="formBasicFirstName" className="formField">
                    <div className="formLabel">
                        <Form.Label>First name:</Form.Label>
                    </div>
                    <div className="formText">
                        <Form.Control type="text" placeholder="Enter first name" />
                    </div>
                    </Form.Group>

                    <Form.Group controlId="formBasicLastName" className="formField">
                        <div className="formLabel">
                            <Form.Label>Last name:</Form.Label>
                        </div>
                        <div className="formText">
                            <Form.Control type="text" placeholder="Enter last name" />
                        </div>
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail" className="formField">
                        <div className="formLabel">
                            <Form.Label>Email address:</Form.Label>
                        </div>
                        <div className="formText">
                            <Form.Control type="email" placeholder="Enter email" />
                        </div>
                    </Form.Group>

                    <Form.Group controlId="formBasicDob" className="formField">
                        <div className="formLabel">
                            <Form.Label>Date of birt:</Form.Label>
                        </div>
                        <div className="formText">
                            <Form.Control type="dob" placeholder="Enter date of birth" />
                        </div>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword" className="formField">
                        <div className="formLabel">
                            <Form.Label>Password:</Form.Label>
                        </div>
                        <div className="formText">
                            <Form.Control type="password" placeholder="Password" />
                        </div>
                    </Form.Group>

                    <Form.Group controlId="formBasicRepeatPassword" className="formField">
                        <div className="formLabel">
                            <Form.Label>Repeat password:</Form.Label>
                        </div>
                        <div className="formText">
                            <Form.Control type="password" placeholder="Password" />
                        </div>
                    </Form.Group>
                    
                    <Button variant="secondary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        )
    }
}

export default Signup;