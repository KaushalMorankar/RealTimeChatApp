import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'react-bootstrap';
import { Authcontext } from '../context/Authcontext';

const Signup = () => {
    const { info, updateinfo, signupuser } = useContext(Authcontext);

    return (
        <div className="container mt-5">
            <Form className="w-50 mx-auto" onSubmit={signupuser}>
                <Form.Group>
                    <Form.Label>Name:</Form.Label>
                    <Form.Control
                        type="text"
                        required
                        value={info.name}
                        onChange={(e) => updateinfo({ ...info, name: e.target.value })}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                        type="email"
                        required
                        value={info.email}
                        onChange={(e) => updateinfo({ ...info, email: e.target.value })}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                        type="password"
                        required
                        value={info.password}
                        onChange={(e) => updateinfo({ ...info, password: e.target.value })}
                    />
                </Form.Group>
                <Button type="submit" className="mr-2">Signup</Button>
            </Form>
        </div>
    );
};

export default Signup;
