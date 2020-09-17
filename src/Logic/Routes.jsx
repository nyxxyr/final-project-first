import React, {useContext} from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Home from '../Components/Home'
import { UserContext } from './UserContext'

// Component
import Login from '../Components/Login'
import Register from '../Components/Register'
import EditPassword from '../Components/EditPassword'

const Routes = () => {
    const [, , , isLogin] = useContext(UserContext)
    return(
        <>
            <Switch>
                <Route exact path='/'>
                    <Redirect to='/home' />
                </Route>
                <Route path='/home'>
                    <Home />
                </Route>
                <Route path='/login'>
                    {
                        isLogin === false ? (
                            <Login />
                        ) : (
                            <Redirect to='/' />
                        )
                    }
                </Route>
                <Route path='/register'>
                {
                    isLogin === false ? (
                        <Register />
                    ) : (
                        <Redirect to='/' />
                    )
                }
                </Route>
                <Route path='/editpassword'>
                {
                    isLogin === true ? (
                        <EditPassword />
                    ) : (
                        <Redirect to='/' />
                    )
                }
                </Route>
            </Switch>
        </>
    )
}

export default Routes
