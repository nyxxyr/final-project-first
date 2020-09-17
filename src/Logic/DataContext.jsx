import React, { createContext, useState } from 'react'

export const DataContext = createContext()

export const DataProvider = (props) => {
    const [movies, setMovies] = useState(null)

    return(
        <DataContext.Provider value={[movies, setMovies]}>
            {props.children}
        </DataContext.Provider>
    )
}
