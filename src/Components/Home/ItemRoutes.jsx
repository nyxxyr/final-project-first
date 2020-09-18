import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Movies from './Movies'
import MovieDetail from './Movies/MovieDetail'
import MovieEditor from './Movies/MovieEditor'

import Games from './Games'
import GameDetail from './Games/GameDetail'
import GameEditor from './Games/GameEditor'

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
            <Route exact path={`${props.path}/games`}>
                <Games />
            </Route>
            <Route path={`${props.path}/games/detail/:id`}>
                <Games />
                <p>bla</p>
                <GameDetail />
            </Route>
            <Route exact path={`${props.path}/games/:mode`}>
                <GameEditor />
            </Route>
            <Route path={`${props.path}/games/:mode/:id`}>
                <GameEditor />
            </Route>
        </Switch>
    )
}

export default ItemRoutes
