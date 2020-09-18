import Axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { DataContext } from '../../../Logic/DataContext'
import { UserContext } from '../../../Logic/UserContext'

const GameEditor = () => {
    let {mode, id} = useParams()
    const [api, user] = useContext(UserContext)
    const [, , games, setGames] = useContext(DataContext)
    const [modes, setModes] = useState(mode)
    const [input, setInput] = useState({
        name: '',
        genre: '',
        singlePlayer: '',
        multiplayer: '',
        platform: '',
        release: 0,
        image_url: ''
    })

    const redirecting = () => {
        window.location.href = '/home/games'
    }

    const handleChoosenData = () => {
        let choice = games.filter(item => {
            return item.id === parseInt(id)
        })
        let temp = choice.map(item => {
            return item
        })
        return temp 
    }

    useEffect(() => {
        if(modes === 'edit'){
            if(games === null){   
                redirecting()
            }
            setModes('update')
            let items = handleChoosenData()
            items.map(item => {
                setInput({
                    name: item.name,
                    release: item.release,
                    genre: item.genre,
                    image_url: item.image_url,
                    platform: item.platform,
                    singlePlayer: item.singlePlayer,
                    multiplayer: item.multiplayer
                })
            })
        }
    }, [modes, handleChoosenData])

    const handleChange = (e) => {
        let value = e.target.value
        let temp = input
        console.log(temp)
        switch(e.target.name){
            case 'gameName':
                temp.name = value
                setInput({...temp})
                break
            case 'genre':
                temp.genre = value
                setInput({...temp})
                break
            case 'singleplayer':
                if(value === 'yes'){
                    value = 1
                }else{
                    value = 0
                }
                temp.singlePlayer = value
                setInput({...temp})
                break
            case 'multiplayer':
                if(value === 'yes'){
                    value = 1
                }else{
                    value = 0
                }
                temp.multiplayer = value
                setInput({...temp})
                break
            case 'platform':
                temp.platform = value
                setInput({...temp})
                break
            case 'release':
                temp.release = value
                setInput({...temp})
                break
            case 'image':
                temp.image_url = value
                setInput({...temp})
                break
            default:
                break
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(mode === 'create'){
            Axios.post(`${api}/data-game`, input, {headers: {
                'Authorization': `Bearer ${user.token}`
            }}).then(res => {
                alert('berhasil')
                setGames(null)
                setInput({
                    name: '',
                    genre: '',
                    singlePlayer: '',
                    multiplayer: '',
                    platform: '',
                    release: 0,
                    image_url: ''
                })
                redirecting()
            }).catch(err => {
                alert(err)
            })
        }else if(mode === 'edit'){
            Axios.put(`${api}/data-game/${id}`, input, {headers: {
                'Authorization': `Bearer ${user.token}`
            }}).then(res => {
                alert('berhasil')
                redirecting()
            }).catch(err => {
                alert(err)
            })
        }
    }

    return(
        <>
        <Row>
            <Col>
                <h3>{mode} game data</h3>
            </Col>
        </Row>
        <hr />
        <Row>
            <Col>
            <Form onSubmit={handleSubmit}>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridName">
                        <Form.Label>Nama Game</Form.Label>
                        <Form.Control onChange={handleChange} type="text" name="gameName" placeholder="Masukkan nama game" value={input.name} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridGenre">
                        <Form.Label>Genre</Form.Label>
                        <Form.Control onChange={handleChange} type="text" name="genre" placeholder="Masukkan genre game" value={input.genre} />
                    </Form.Group>
                </Form.Row>

                <Form.Group controlId="formGridImageUrl">
                    <Form.Label>Link Gambar</Form.Label>
                    <Form.Control onChange={handleChange} type="text" name="image" placeholder="Masukkan link gambar game" value={input.image_url} />
                </Form.Group>

                <Form.Row>
                    <Form.Group as={Col} controlId="formGridPlatform">
                        <Form.Label>Platform</Form.Label>
                        <Form.Control onChange={handleChange} type="text" name="platform" placeholder="Masukkan platform (mesin) yang digunakan" value={input.platform} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridRelease">
                        <Form.Label>Release Year</Form.Label>
                        <Form.Control onChange={handleChange} type="number" name="release" placeholder="Masukkan tahun game keluar" value={input.release} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridZip" >
                        <Form.Label>Singleplayer</Form.Label>
                        <Form.Control onChange={handleChange} name="singleplayer" as="select" value={input.singlePlayer  > 0 ? ('yes'):('no')}>
                            <option hidden>Pilih Satu</option>
                            <option>yes</option>
                            <option>no</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridZip" >
                        <Form.Label>Multiplayer</Form.Label>
                        <Form.Control onChange={handleChange} name="multiplayer" as="select" value={input.multiplayer > 0 ? ('yes'):('no')}>
                            <option hidden>Pilih Satu</option>
                            <option>yes</option>
                            <option>no</option>
                        </Form.Control>
                    </Form.Group>
                </Form.Row>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
                </Form>
            </Col>
        </Row>
        </>
    )
}

export default GameEditor
