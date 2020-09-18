import Axios from 'axios'
import React, { useContext, useState } from 'react'
import { Row, Col, Table, Button, Image, Form, Collapse } from 'react-bootstrap'
import { useRouteMatch, NavLink } from 'react-router-dom'
import { DataContext } from '../../../Logic/DataContext'
import { UserContext } from '../../../Logic/UserContext'

const GameTable = () => {
    const [api, user] = useContext(UserContext)
    const [, , games, setGames] = useContext(DataContext)
    const [open, setOpen] = useState(false)
    const [keywords, setKeywords] = useState('')
    const [filter, setFilter] = useState({
        release: 0,
        singlePlayer: 2,
        multiplayer: 2
    })
    let { url } = useRouteMatch()
    const redirecting = () => {
        window.location.href = '/home/games'
    }

    const handleSearch = (e) => {
        e.preventDefault()
        let result = games.filter((item) => {
            let title = item.name.toLowerCase()
            return title.search(keywords) > -1
        })
        if(keywords === ''){
            setGames(null)
        }else{
            setGames(result)
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
            case 'release':
                temp.release = value
                setFilter({...temp})
                break
            case 'singleplayer':
                if(value === 'yes'){
                    value = 1
                }else{
                    value = 0
                }
                temp.singlePlayer = value
                setFilter({...temp})
                break
            case 'multiplayer':
                if(value === 'yes'){
                    value = 1
                }else{
                    value = 0
                }
                temp.multiplayer = value
                setFilter({...temp})
                break
            default:
                break
        }
    }

    const handleFilterSubmit = (e) => {
        e.preventDefault()
        let result = games.filter(item => {
            return ((item.release >= filter.release) && (item.singlePlayer <= filter.singlePlayer) && (item.multiplayer <= filter.multiplayer))
        })
        setGames(result)
    }

    const handleResetAll = (e) => {
        setGames(null)
        setKeywords('')
        setFilter({
            release: 0,
            singlePlayer: 2,
            multiplayer: 2
        })
    }

    const handleSort = (e) => {
        let temp = games
        switch(e.target.value){
            case 'gameName':
                temp = temp.sort((a, b) => (a.name > b.name ? 1 : -1))
                setGames([...temp])
                break
            case 'image':
                temp = temp.sort((a, b) => (a.image_url > b.image_url ? 1 : -1))
                setGames([...temp])
                break
            case 'release':
                temp = temp.sort((a, b) => (a.release > b.release ? 1 : -1))
                setGames([...temp])
                break
            case 'platform':
                temp = temp.sort((a, b) => (a.platform > b.platform ? 1 : -1))
                setGames([...temp])
                break
            case 'genre':
                temp = temp.sort((a, b) => (a.genre > b.genre ? 1 : -1))
                setGames([...temp])
                break
            case 'singleplayer':
                temp = temp.sort((a, b) => (a.singlePlayer > b.singlePlayer ? 1 : -1))
                setGames([...temp])
                break
            case 'multiplayer':
                temp = temp.sort((a, b) => (a.multiplayer > b.multiplayer ? 1 : -1))
                setGames([...temp])
                break
            default:
                break

        }
    } 

    const handleDelete = (e) => {
        e.preventDefault()
        console.log(e.target.value)
        let choice = window.confirm('Are You Sure ?')
        if(choice === true){
            Axios.delete(`${api}/data-game/${e.target.value}`, {headers: {
                'Authorization': `Bearer ${user.token}`
            }}).then(res => {
                alert('Data dihapus')
                setGames(null)
                redirecting()
            }).catch(err => {
                alert(err)
            })
        }
        return choice
    }
    return(
        <>
        {
            games === null ? (
                <>
                <Row className="form-group">
                    <Col>
                        <h2>Tidak ada Game</h2>
                    </Col>
                </Row>
                </>
            ) : (
            <>
            <Row>
                <Col>
                    <Form onSubmit={handleSearch}>
                        <Row className="form-group">
                            <Col>
                                <h5>Cari berdasarkan nama game</h5>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={10}>
                                <Form.Group controlId="exampleForm.ControlInput1">
                                    <Form.Control onChange={handleKeyword} type="text" placeholder="Cari Sesuai Nama Game" />
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
                                <h5><Button variant="link" onClick={() => setOpen(!open)}>Filter (reset before using again)</Button></h5>
                            </Col>
                        </Row>
                        <Collapse in={open}>
                            <Row>
                                <Col xs={3}>
                                    <Form.Group controlId="exampleForm.ControlInput1">
                                        <Form.Control onChange={handleFilterInput} name="release" type="number" placeholder="Release year" />
                                    </Form.Group>
                                </Col>
                                <Col xs={3}>
                                    <Form.Group controlId="exampleForm.ControlInput1">
                                    <Form.Control onChange={handleFilterInput} name="singleplayer" as="select">
                                        <option hidden>Singleplayer mode ?</option>
                                        <option>yes</option>
                                        <option>no</option>
                                    </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col xs={3}>
                                    <Form.Group controlId="exampleForm.ControlInput1">
                                        <Form.Control onChange={handleFilterInput} name="multiplayer" as="select">
                                            <option hidden>Multiplayer mode ?</option>
                                            <option>yes</option>
                                            <option>no</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col xs={1}>
                                    <Button type="submit" block variant="success">Filter</Button>
                                </Col>
                                <Col xs={2}>
                                    <Button onClick={handleResetAll} variant="danger" block>Reset All</Button>
                                </Col>
                            </Row>
                        </Collapse>
                    </Form>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Table responsive>
                        <thead>
                            <tr style={{fontSize: '14px'}}>
                                <th>No.</th>
                                <th>Nama <Button onClick={handleSort} size="sm" variant="link" value="gameName">^</Button></th>
                                <th>Gambar <Button onClick={handleSort} size="sm" variant="link" value="image">^</Button></th>
                                <th>Genre <Button onClick={handleSort} size="sm" variant="link" value="genre">^</Button></th>
                                <th>Platform <Button onClick={handleSort} size="sm" variant="link" value="platform">^</Button></th>
                                <th>Tahun Rilis <Button onClick={handleSort} size="sm" variant="link" value="release">^</Button></th>
                                <th>Single Player <Button onClick={handleSort} size="sm" variant="link" value="singleplayer">^</Button></th>
                                <th>Multi Player <Button onClick={handleSort} size="sm" variant="link" value="multiplayer">^</Button></th>
                                <th colSpan={2} className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            games.map((item, index) => {
                                return(
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{item.name}</td>
                                        <td><Image style={{maxHeight:'100vh', maxWidth: '20vw'}} src={item.image_url} thumbnail /></td>
                                        <td>{item.genre}</td>
                                        <td>{item.platform}</td>
                                        <td>{item.release}</td>
                                        <td>{item.singlePlayer > 0 ? ('Yes') : ('No')}</td>
                                        <td>{item.multiplayer > 0 ? ('Yes') : ('No')}</td>
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

export default GameTable
