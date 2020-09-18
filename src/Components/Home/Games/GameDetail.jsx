import React, { useContext, useEffect, useState } from 'react'
import { Modal, Button, Card, ListGroup } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import { DataContext } from '../../../Logic/DataContext';

const GameDetail = () => {
    let {id} = useParams()
    const [show, setShow] = useState(true);
    const [game, setGame] = useState(null)
    const [movies, setMovies, games, setGames] = useContext(DataContext)

    const handleModalUI = () => {
        let choice = games.filter(item => {
            return item.id === parseInt(id)
        })
        let temp = choice.map(item => {
            return item
        })
        return temp 
    }

    const redirecting = () => {
        window.location.href = '/home/games'
    }

    useEffect(() => {
        if(game === null){
            if(games === null){   
                redirecting()
            }
            let item = handleModalUI()
            setGame(item)
        }
        
    }, [games, handleModalUI])

    const handleClose = () => {
        setShow(false);
        window.history.back()
    }
    
    return(
        <>
        <Modal size='lg' show={show} onHide={handleClose}>
        {
            game === null ? (
                <>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, no data choosen</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer> 
                </>
            ) : (
                game.map(item => {
                    return(
                        <>
                        <Modal.Header closeButton>
                            <Modal.Title>{item.name}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Card >
                                <Card.Img variant="top" src={item.image_url} />
                                <Card.Body>
                                    <Card.Text>
                                        <ListGroup>
                                            <ListGroup.Item>Genre : {item.genre}</ListGroup.Item>
                                            <ListGroup.Item>Platform : {item.platform}</ListGroup.Item>
                                            <ListGroup.Item>Year Release : {item.release}</ListGroup.Item>
                                            <ListGroup.Item>
                                                Mode Allowed : {item.singlePlayer > 0 ? ('SinglePlayer') : ('none')} {item.multiplayer > 0 ? ('and Multiplayer'):('')}
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                        </>
                    )
                })
                
            )
        }
        </Modal>
        </>
    )
}

export default GameDetail
