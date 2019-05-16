import React from 'react';
import {NavLink} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import "./Login.css";

class Login extends React.Component {
    constructor(){
        super();
        this.state={

        }
    }

    render(){
        return(
            <div className="loginContainer">
                <h3>Log in</h3>
                <br/>
                <Form>
                    <Form.Group controlId="formBasicEmail" className="formField">
                        <div className="formLabel">
                            <Form.Label>Email address:</Form.Label>
                        </div>
                        <div className="formText">
                            <Form.Control type="email" placeholder="Enter email" />
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

                    <Button variant="secondary" type="submit">
                        Log in
                    </Button>
                </Form>
            </div>
        )
    }
}

export default Login;