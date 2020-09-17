import React from 'react'
import { BrowserRouter as Router} from 'react-router-dom'

import { UserProvider } from './UserContext'
import Routes from './Routes'

// Component
import Header from '../Components/Header'
import Footer from '../Components/Footer'

const ShowCase = () => {
    return(
        <UserProvider>
            <Router>
                <Header />
                <br />
                <Routes />
                <br />
                <Footer />
            </Router>
        </UserProvider>
    )
}

export default ShowCase