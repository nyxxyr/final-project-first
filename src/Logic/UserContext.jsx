import React, { createContext, useState } from 'react'

export const UserContext = createContext()

export const UserProvider = (props) => {
    const [api] = useState('https://backendexample.sanbersy.com/api')
    const [user, setUser] = useState(null)
    const [isLogin, setIsLogin] = useState(false)

    return(
        <UserContext.Provider value={[api, user, setUser, isLogin, setIsLogin]}>
            {props.children}
        </UserContext.Provider>
    )
}
