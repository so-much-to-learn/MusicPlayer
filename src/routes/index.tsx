import { HashRouter, Route } from 'react-router-dom'
import * as React from 'react'
import { observer } from 'mobx-react'
import { Home } from '../pages'
import homeStore from '../pages/home/stores'
import store from '../store'

const Router = observer((props = {}) => {
    return (
        <HashRouter>
            <Route path="/" render={(props) => <Home {...props} store={homeStore}/>}></Route>
        </HashRouter>
    )
})
export default Router
