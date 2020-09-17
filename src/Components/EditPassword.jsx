import Axios from 'axios'
import React, { useContext, useState } from 'react'
import { Form, Button, Container, Col, Row } from 'react-bootstrap'
import { UserContext } from '../Logic/UserContext'

const EditPassword = () => {
    const [api, user] = useContext(UserContext)
    const [input, setInput] = useState({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    })

    const redirecting = () => {
        window.location.href = '/home'
    }
    
    const handleChangePassword = (e) => {
        e.preventDefault()
        let data = {'current_password': input.currentPassword, 'new_password': input.newPassword, 'new_confirm_password': input.confirmNewPassword}
        Axios.post(`${api}/change-password`, {...data}, {headers: {
            'Authorization': `Bearer ${user.token}`
        }}).then(res => {
            alert('berhasil')
            redirecting()
        }).catch(err => {
            console.log(err)
            alert(err)
        })
    }

    const handleChange = (e) => {
        let value = e.target.value
        let temp = input
        switch(e.target.name){
            case 'oldPassword':
                temp.currentPassword = value
                setInput({...temp})
                break
            case 'newPassword':
                temp.newPassword = value
                setInput({...temp})
                break
            case 'confirmPassword':
                temp.confirmNewPassword = value
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
                    <h2>Change Password Page</h2>
                </Col>
            </Row>
            <hr />
            <Row>
                <Col>
                    <Form onSubmit={handleChangePassword}>
                        <Form.Group controlId="formBasicOld">
                            <Form.Label>Password Lama</Form.Label>
                            <Form.Control onChange={handleChange} type="password" name="oldPassword" placeholder="Masukkan Password Lama" required />
                        </Form.Group>
                        <Form.Group controlId="formBasicNewPassword">
                            <Form.Label>Password Baru</Form.Label>
                            <Form.Control onChange={handleChange} type="password" name="newPassword" placeholder="Masukkan Password Baru" required />
                        </Form.Group>
                        <Form.Group controlId="formBasicConfirmPassword">
                            <Form.Label>Konfirmasi Password</Form.Label>
                            <Form.Control onChange={handleChange} type="password" name="confirmPassword" placeholder="Konfirmasi Password" required />
                        </Form.Group>
                        <Button variant="primary" type="submit" block>
                            Change Password
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default EditPassword
