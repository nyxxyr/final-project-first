import Axios from 'axios'
import React, { useContext, useState } from 'react'
import { Form, Button, Container, Col, Row } from 'react-bootstrap'
import { UserContext } from '../Logic/UserContext'

const Register = () => {
    const [api] = useContext(UserContext)
    const [input, setInput] = useState({
        name: '',
        email: '',
        password: ''
    })
    const redirecting = () => {
        window.location.href = '/home'
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        Axios.post(`${api}/register`, input)
            .then(res => {
                setInput({
                    name: '',
                    email: '',
                    password: ''
                })
                redirecting()
            }).catch(err => {
                alert(err)
            }) 
        
    }
    const handleChange = (e) => {
        let value = e.target.value
        let temp = input
        switch(e.target.name){
            case 'name':
                temp.name = value
                setInput({...temp})
                break
            case 'email':
                temp.email = value
                setInput({...temp})
                break
            case 'password':
                temp.password = value
                setInput({...temp})
                break
            default:
                break
        }
    }
    return(
        <Container style={{minHeight: '100vh'}}>
            <Row>
                <Col>
                    <h2>Register Page</h2>
                </Col>
            </Row>
            <hr />
            <Row>
                <Col>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formBasicName">
                            <Form.Label>Nama Lengkap</Form.Label>
                            <Form.Control onChange={handleChange} type="text" name="name" placeholder="Masukkan Nama Lengkap" required />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Alamat Email</Form.Label>
                            <Form.Control onChange={handleChange} type="email" name="email" placeholder="Masukkan Email" required />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control onChange={handleChange} type="password" name="password" placeholder="Masukkan Password" required />
                        </Form.Group>
                        <Button variant="primary" type="submit" block>
                            Register
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default Register
