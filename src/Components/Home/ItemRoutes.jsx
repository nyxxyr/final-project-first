import React, { useContext } from 'react'
import { Switch, Route, useParams } from 'react-router-dom'

import Movies from './Movies'
import MovieDetail from './Movies/MovieDetail'
import Games from './Games'
import { DataContext } from '../../Logic/DataContext'
import MovieEditor from './Movies/MovieEditor'

const ItemRoutes  = (props) => {
    return(
        <Switch>
            <Route exact path={`${props.path}/movies`}>
                <Movies />
            </Route>
            <Route path={`${props.path}/movies/detail/:id`}>
                <Movies />
                <MovieDetail />
            </Route>
            <Route exact path={`${props.path}/movies/:mode`}>
                <MovieEditor />
            </Route>
            <Route path={`${props.path}/movies/:mode/:id`}>
                <MovieEditor />
            </Route>
            <Route path={`${props.path}/games`}>
                <Games />
            </Route>
        </Switch>
    )
}

export default ItemRoutes
