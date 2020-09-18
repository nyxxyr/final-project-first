import React, { createContext, useState } from 'react'

export const DataContext = createContext()

export const DataProvider = (props) => {
    const [movies, setMovies] = useState(null)
    const [games, setGames] = useState(null)

    return(
        <DataContext.Provider value={[movies, setMovies, games, setGames]}>
            {props.children}
        </DataContext.Provider>
    )
}
