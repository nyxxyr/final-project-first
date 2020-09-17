import React, { useContext, useState } from 'react';
import Axios from 'axios';
import { Col, Container, Row, Form, Button } from 'react-bootstrap';
import { UserContext } from '../Logic/UserContext'


export default function Login() {
    const [api, , setUser, , setIsLogin] = useContext(UserContext)
    const [input, setInput] = useState({
        email: '',
        password: '',
    })

    const handleLogin = (e) => {
        e.preventDefault()
        Axios.post(`${api}/user-login`, input)
            .then(res => {
                let user = res.data.user
                let token = res.data.token
                let currentUser = {
                    name: user.name,
                    email: user.email,
                    token: token,
                    isLogin: true
                }
                localStorage.setItem("user", JSON.stringify(currentUser))
                setUser(currentUser)
                setInput({
                    email: '',
                    password: '',
                })
                setIsLogin(currentUser.isLogin)
            }).catch(err => {
                alert(err)
            })
    }

    const handleChange = (e) => {
        let value = e.target.value
        let temp = input
        switch (e.target.name) {
            case 'email':
                temp.email = value
                setInput({...temp})
                break;
            case 'password':
                temp.password = value
                setInput({...temp})
                break;
            default:
                break;
        }
    }

    return (
        <Container style={{minHeight: '100vh'}}>
            <Row>
                <Col>
                    <h2>Login Page</h2>
                </Col>
            </Row>
            <hr />
            <Row>
                <Col>
                    <Form onSubmit={handleLogin}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Alamat Email</Form.Label>
                            <Form.Control onChange={handleChange} type="email" name="email" placeholder="Masukkan Email" />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control onChange={handleChange} type="password" name="password" placeholder="Masukkan Password" />
                        </Form.Group>
                        <Button variant="primary" type="submit" block>
                            Login
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}