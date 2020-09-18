import Axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { DataContext } from '../../../Logic/DataContext'
import { UserContext } from '../../../Logic/UserContext'
import MovieList from './MovieList'
import MovieTable from './MovieTable'

const Movies = () => {
    const [api, user, , isLogin] = useContext(UserContext)
    const [movies, setMovies] = useContext(DataContext)

    useEffect(() => {
        if(movies === null){
            Axios.get(`${api}/data-movie`)
                .then(res => {
                    setMovies(res.data)
                }).catch(err => {
                    alert(err)
                })
        }
    })

    return(
        <>
        <Row>
            <Col>   
                <h3>List Movies</h3>
            </Col>
        </Row>
        <hr />
        {
            isLogin === true ? (<><MovieTable /></>) : (<><MovieList movies={movies} /></>)
        }
        </>
    )
}

export default Movies
