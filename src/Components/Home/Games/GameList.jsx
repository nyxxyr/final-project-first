import React from 'react'
import { Row, Col, ListGroup, Card, Button } from 'react-bootstrap'
import { NavLink, useRouteMatch } from 'react-router-dom'

const GameList = (props) => {
    let {url} = useRouteMatch()
    return(
        <>
        {
            props.games === null ? (
                <Row className="form-group">
                    <Col>
                        <h2>Tidak ada Game</h2>
                    </Col>
                </Row>
            ) : (
                <>
                {
                    props.games.map((item) => {
                        return(
                            <Row className="form-group" key={item.id}>
                                <Col>
                                    <Card border="primary">
                                        <Card.Body>
                                            <Card.Title>{item.name}</Card.Title>
                                            <ListGroup>
                                                <ListGroup.Item>Genre : {item.genre}</ListGroup.Item>
                                                <ListGroup.Item>Platform : {item.platform}</ListGroup.Item>
                                            </ListGroup>
                                        </Card.Body>
                                        <Card.Footer>
                                            <Button as={NavLink} to={`${url}/detail/${item.id}`} variant="primary">Details</Button>
                                        </Card.Footer>
                                    </Card>
                                </Col>
                            </Row>
                        )
                    })
                }
                </>
            )
        }
        </>
    )
}

export default GameList
