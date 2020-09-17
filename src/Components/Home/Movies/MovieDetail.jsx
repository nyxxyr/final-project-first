import React, { useContext, useEffect, useState } from 'react'
import { Modal, Button, Card, ListGroup } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import { DataContext } from '../../../Logic/DataContext';

const MovieDetail = () => {
    let {id} = useParams()
    const [show, setShow] = useState(true);
    const [movie, setMovie] = useState(null)
    const [movies, setMovies] = useContext(DataContext)

    const handleModalUI = () => {
        let choice = movies.filter(item => {
            return item.id === parseInt(id)
        })
        let temp = choice.map(item => {
            return item
        })
        return temp 
    }

    const redirecting = () => {
        window.location.href = '/home/movies'
    }

    useEffect(() => {
        if(movie === null){
            if(movies === null){   
                redirecting()
            }
            let item = handleModalUI()
            setMovie(item)
        }
        
    }, [movies, handleModalUI])

    const handleClose = () => {
        setShow(false);
        window.history.back()
    }
    
    return(
        <>
        <Modal size='lg' show={show} onHide={handleClose}>
        {
            movie === null ? (
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
                movie.map(item => {
                    return(
                        <>
                        <Modal.Header closeButton>
                            <Modal.Title>{item.title}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Card >
                                <Card.Img variant="top" src={item.image_url} />
                                <Card.Body>
                                    <Card.Text>
                                        Description : {item.description}
                                    </Card.Text>
                                    <Card.Text>
                                        <ListGroup>
                                            <ListGroup.Item>Duration : {item.duration} Minutes</ListGroup.Item>
                                            <ListGroup.Item>Rating : {item.rating}</ListGroup.Item>
                                            <ListGroup.Item>Genre : {item.genre}</ListGroup.Item>
                                            <ListGroup.Item>Year : {item.year}</ListGroup.Item>
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

export default MovieDetail
