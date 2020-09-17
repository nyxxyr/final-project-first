import React from 'react'
import { Card, Button, Col, Row } from 'react-bootstrap'
import { NavLink, useRouteMatch } from 'react-router-dom'

const MovieList = (props) => {
    let { url } = useRouteMatch()

    return(
        <>
        {
            props.movies === null ? (
            <>{
                <Row className="form-group">
                    <Col>
                        <h2>Tidak ada Film</h2>
                    </Col>
                </Row>
            }</>) : (
                <>{
                    props.movies.map((item, index) => {
                        return(
                            <Row className="form-group" key={item.id}>
                                <Col>
                                    <Card border="dark">
                                        <Card.Body>
                                            <Card.Title>{item.title}</Card.Title>
                                            <Card.Text>
                                                {item.description}
                                            </Card.Text>
                                        </Card.Body>
                                        <Card.Footer>
                                            <Button as={NavLink} to={`${url}/detail/${item.id}`} variant="primary">Details</Button>
                                        </Card.Footer>
                                    </Card>
                                </Col>
                            </Row>
                        )
                    })
                }</>
            )
        }
        </>
    )
}

export default MovieList
