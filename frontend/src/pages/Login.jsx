import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Container } from "react-bootstrap";
import { Authcontext } from '../context/Authcontext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const { logininfo, loginuser, updatelogin } = useContext(Authcontext);
    const navigate = useNavigate();

    return (
        <>
        <Container className="mt-5" style={{ height: '90vh' }}>
            <Form className="w-50 mx-auto" onSubmit={loginuser}>
                <Form.Group className="mb-5">
                    <Form.Label>Enter Your Email ID</Form.Label>
                    <Form.Control
                        type="email"
                        required
                        value={logininfo.email}
                        onChange={(e) => updatelogin({ ...logininfo, email: e.target.value })}
                    ></Form.Control>
                </Form.Group>
                <Form.Group className="mb-5">
                    <Form.Label>Enter Your Password</Form.Label>
                    <Form.Control
                        type='password'
                        required
                        value={logininfo.password}
                        onChange={(e) => updatelogin({ ...logininfo, password: e.target.value })}
                    ></Form.Control>
                </Form.Group>
                <Button type='submit' className="mr-2">Login</Button>
                <Button variant='secondary' className='ml-2' onClick={() => navigate('/signup')}>Sign Up</Button>
            </Form>
        </Container>
        </>
    );
}
