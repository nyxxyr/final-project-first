import Axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Col, Row, Form, Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { DataContext } from '../../../Logic/DataContext'
import { UserContext } from '../../../Logic/UserContext'

const MovieEditor = () => {
    let {mode, id} = useParams()
    const [api, user] = useContext(UserContext)
    const [movies, setMovies] = useContext(DataContext)
    const [modes, setModes] = useState(mode)
    const [input, setInput] = useState({
        title: '',
        description: '',
        year: '',
        duration: '',
        genre: '',
        rating: '',
        image_url: ''
    })

    const handleChoosenData = () => {
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
        if(modes === 'edit'){
            if(movies === null){   
                redirecting()
            }
            setModes('update')
            let items = handleChoosenData()
            items.map(item => {
                setInput({
                    title: item.title,
                    description: item.description,
                    year: item.year,
                    duration: item.duration,
                    genre: item.genre,
                    rating: item.rating,
                    image_url: item.image_url
                })
            })
        }
    }, [modes, handleChoosenData])

    const handleSubmit = (e) => {
        e.preventDefault()
        if(mode === 'create'){
            Axios.post(`${api}/data-movie`, input, {headers: {
                'Authorization': `Bearer ${user.token}`
            }}).then(res => {
                alert('berhasil')
                setMovies(null)
                setInput({
                    title: '',
                    description: '',
                    year: '',
                    duration: '',
                    genre: '',
                    rating: '',
                    image_url: ''
                })
                redirecting()
            }).catch(err => {
                alert(err)
            })
        }else if(mode === 'edit'){
            Axios.put(`${api}/data-movie/${id}`, input, {headers: {
                'Authorization': `Bearer ${user.token}`
            }}).then(res => {
                alert('berhasil')
                redirecting()
            }).catch(err => {
                alert(err)
            })
        }

    }

    const handleChange = (e) => {
        let value = e.target.value
        let temp = input
        switch(e.target.name){
            case 'title':
                temp.title = value
                setInput({...temp})
                break
            case 'description':
                temp.description = value
                setInput({...temp})
                break
            case 'year':
                temp.year = value
                setInput({...temp})
                break
            case 'duration':
                temp.duration = value
                setInput({...temp})
                break
            case 'genre':
                temp.genre = value
                setInput({...temp})
                break
            case 'rating':
                if(value > 10){
                    value = 10
                }else if(value < 0){
                    value = 0
                }
                temp.rating = value
                setInput({...temp})
                break
            case 'image_url':
                temp.image_url = value
                setInput({...temp})
                break
            default:
                break
        }
    }

    return(
        <>
        <Row>
            <Col>
                <h3>{mode} movie data</h3>
            </Col>
        </Row>
        <hr />
        <Row>
            <Col>
            <Form onSubmit={handleSubmit}>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control onChange={handleChange} type="text" name="title" placeholder="Masukkan Judul" value={input.title} required />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridGenre">
                        <Form.Label>Genre</Form.Label>
                        <Form.Control onChange={handleChange} type="text" name="genre" placeholder="Masukkan Genre" value={input.genre} required />
                    </Form.Group>
                </Form.Row>

                <Form.Group controlId="formGridImage">
                        <Form.Label>Foto Poster</Form.Label>
                        <Form.Control onChange={handleChange} type="text" name="image_url" placeholder="Masukkan Link Gambar" value={input.image_url} required />
                </Form.Group>

                <Form.Row>
                    <Form.Group as={Col} controlId="formGridYear">
                        <Form.Label>Year</Form.Label>
                        <Form.Control onChange={handleChange} type="text" name="year" placeholder="Tahun Film" value={input.year} required />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control onChange={handleChange} type="number" name="rating" placeholder="Rating Film" value={input.rating} required />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridZip">
                        <Form.Label>Duration</Form.Label>
                        <Form.Control onChange={handleChange} type="number" name="duration" placeholder="Durasi Film" value={input.duration} required />
                    </Form.Group>
                </Form.Row>

                <Form.Group controlId="formGridAddress1">
                        <Form.Label>Description</Form.Label>
                        <Form.Control onChange={handleChange} as="textarea" name="description" placeholder="Masukkan Deskripsi Film" value={input.description} rows={5} required />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
                </Form>
            </Col>
        </Row>
        </>
    )
}

export default MovieEditor
