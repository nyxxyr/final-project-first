import React, { useContext, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Nav, Navbar } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom'
import { UserContext } from '../Logic/UserContext'

const Header = () => {
    const [, user, setUser, isLogin, setIsLogin] = useContext(UserContext)

    useEffect(() => {
        if(user === null){
            if(JSON.parse(localStorage.getItem('user')) === null){
                setUser(null)
                setIsLogin(false)
            }else{
                let temp = JSON.parse(localStorage.getItem('user'))
                setUser({...temp})
                setIsLogin(true)
            }
        }
    })

    const handleLogout = (e) => {
        setIsLogin(false)
        localStorage.setItem("user", null)
        setUser(null)
    }

    return(
        <Navbar bg="light" variant="light">
            <Navbar.Brand as={Link} to='/home'>Home</Navbar.Brand>
                {
                    isLogin === false ? (
                        <>
                        <Nav className="ml-auto">
                            <Nav.Link as={NavLink} to='/login' exact>Login</Nav.Link>
                            <Nav.Link as={NavLink} to='/register'>Register</Nav.Link>
                        </Nav>
                        </>
                    ) : (
                        <>
                        <Navbar.Collapse className="justify-content-start">
                            <Navbar.Text className="text-dark">
                            Hello, {user.name}
                            </Navbar.Text>
                        </Navbar.Collapse>
                        <Nav className="ml-auto">
                            <Nav.Link as={NavLink} to='/editpassword'>Edit Password</Nav.Link>
                            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                        </Nav>
                        </>
                    )
                }
    </Navbar>
    )
}

export default Header
