import React, { useContext } from 'react'
import { Col, Container, Row, Nav } from 'react-bootstrap'
import {  NavLink, useRouteMatch } from 'react-router-dom'
import { DataProvider } from '../../Logic/DataContext'
import { UserContext } from '../../Logic/UserContext'
import ItemRoutes from './ItemRoutes'


const Home = () => {
    const [, , , isLogin] = useContext(UserContext)
    let { path, url } = useRouteMatch()
    return(
        <DataProvider>
            <Container fluid style={{minHeight: '100vh'}}>
                <Row>
                    <Col>
                        <Nav className="flex-column">
                            <Nav.Link as={NavLink} to={`${url}/movies`} className="text-primary">Movies</Nav.Link>
                            {
                                isLogin === false ? (<></>) : (
                                    <Nav.Link as={NavLink} to={`${url}/movies/create`} className="text-primary">Add New Movies</Nav.Link>
                                )
                            }
                            <Nav.Link as={NavLink} to={`${url}/games`} className="text-danger">Games</Nav.Link>
                            {
                                isLogin === false ? (<></>) : (
                                    <Nav.Link as={NavLink} to={`${url}/games/create`} className="text-danger">Add New Games</Nav.Link>
                                )
                            }
                        </Nav>
                    </Col>
                    <Col xs={10}>
                        <Container>
                            <ItemRoutes path={path} />
                        </Container>
                    </Col>
                </Row>
            </Container>
        </DataProvider>
    )
}

export default Home
