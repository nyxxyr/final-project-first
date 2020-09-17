import Axios from 'axios'
import React, { useContext, useState } from 'react'
import { DataContext } from '../../../Logic/DataContext'
import { UserContext } from '../../../Logic/UserContext'
import { Row, Col, Table, Image, Button, Form } from 'react-bootstrap'
import { NavLink, useRouteMatch } from 'react-router-dom'

const MovieTable = () => {
    const [api, user] = useContext(UserContext)
    const [movies, setMovies] = useContext(DataContext)
    const [keywords, setKeywords] = useState('')
    const [filter, setFilter] = useState({
        year: 0,
        duration: 0,
        rating: 0
    })
    let { url } = useRouteMatch()
    
    const redirecting = () => {
        window.location.href = '/home/movies'
    }

    const handleSearch = (e) => {
        e.preventDefault()
        let result = movies.filter((item) => {
            let title = item.title.toLowerCase()
            return title.search(keywords) > -1
        })
        if(keywords === ''){
            setMovies(null)
        }else{
            setMovies(result)
        }
    }

    const handleKeyword = (e) => {
        let value = e.target.value
        setKeywords(value)
    }

    const handleFilterInput = (e) => {
        let value = e.target.value
        let temp = filter
        switch(e.target.name){
            case 'year':
                temp.year = value
                setFilter({...temp})
                break
            case 'duration':
                temp.duration = value
                setFilter({...temp})
                break
            case 'rating':
                temp.rating = value
                setFilter({...temp})
                break
            default:
                break
        }
    }

    const handleFilterSubmit = (e) => {
        e.preventDefault()
        let result = movies.filter(item => {
            return ((item.year >= filter.year) && (item.duration >= filter.duration) && (item.rating >= filter.rating))
        })
        setMovies(result)
    }

    const handleResetAll = (e) => {
        setMovies(null)
        setKeywords('')
        setFilter({
            year: 0,
            duration: 0,
            rating: 0
        })
    }

    const handleDelete = (e) => {
        e.preventDefault()
        let choice = window.confirm('Are You Sure ?')
        if(choice === true){
            Axios.delete(`${api}/data-movie/${e.target.value}`, {headers: {
                'Authorization': `Bearer ${user.token}`
            }}).then(res => {
                alert('Data dihapus')
                setMovies(null)
                redirecting()
            })
        }
        return choice
    }

    return(
        <>
        {
            movies === null ? (
            <>
            {
                <Row className="form-group">
                    <Col>
                        <h2>Tidak ada Film</h2>
                    </Col>
                </Row>
            }
            </>
            ) : (
            <>
                <Row>
                    <Col>
                        <Form onSubmit={handleSearch}>
                            <Row className="form-group">
                                <Col>
                                    <h5>Cari berdasarkan judul</h5>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={10}>
                                    <Form.Group controlId="exampleForm.ControlInput1">
                                        <Form.Control onChange={handleKeyword} type="text" placeholder="Cari Sesuai Judul" />
                                    </Form.Group>
                                </Col>
                                <Col xs={2}>
                                    <Button type="submit" variant="success" block>Cari</Button>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form onSubmit={handleFilterSubmit}>
                            <Row className="form-group">
                                <Col>
                                    <h5>Filter Data (minimal)</h5>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={3}>
                                    <Form.Group controlId="exampleForm.ControlInput1">
                                        <Form.Control onChange={handleFilterInput} name="duration" type="number" placeholder="Duration" />
                                    </Form.Group>
                                </Col>
                                <Col xs={3}>
                                    <Form.Group controlId="exampleForm.ControlInput1">
                                        <Form.Control onChange={handleFilterInput} name="rating" type="number" placeholder="Rating" />
                                    </Form.Group>
                                </Col>
                                <Col xs={3}>
                                    <Form.Group controlId="exampleForm.ControlInput1">
                                        <Form.Control onChange={handleFilterInput} name="year" type="number" placeholder="Year" />
                                    </Form.Group>
                                </Col>
                                <Col xs={1}>
                                    <Button type="submit" block variant="success">Filter</Button>
                                </Col>
                                <Col xs={2}>
                                    <Button onClick={handleResetAll} variant="danger" block>Reset All</Button>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th>No.</th>
                                    <th>Title</th>
                                    <th>Image</th>
                                    <th>Description</th>
                                    <th>Year</th>
                                    <th>Genre</th>
                                    <th>Duration</th>
                                    <th>Rating</th>
                                    <th colSpan={2} className="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                movies.map((item, index) => {
                                    return(
                                        <tr key={index}>
                                            <td>{index+1}</td>
                                            <td>{item.title}</td>
                                            <td><Image style={{maxHeight:'100vh'}} src={item.image_url} thumbnail /></td>
                                            <td>
                                                {
                                                    item.description === null ? (<></>) : (item.description.substring(0, 51))
                                                }
                                                 . . </td>
                                            <td>{item.year}</td>
                                            <td>{item.genre}</td>
                                            <td>{item.duration}</td>
                                            <td>{item.rating}</td>
                                            <td>
                                                <Button as={NavLink} to={`${url}/edit/${item.id}`} variant="warning" className="mx-3">Edit</Button>
                                            </td>
                                            <td>
                                                <Button onClick={handleDelete} value={item.id} variant="danger">Delete</Button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </>
            )
        }
        </>
    )
}

export default MovieTable
