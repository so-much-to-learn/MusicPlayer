import store from './store'
import * as React from 'react'
import { Provider } from 'mobx-react'
import ReactDOM from 'react-dom'
import Router from './routes'
import { enableLogging } from 'mobx-logger'

enableLogging({
    predicate: () => true,
    action: true,
    reaction: true,
    transaction: true,
    compute: true
})

ReactDOM.render(
    <Provider store={store}>
        <Router/>
    </Provider>,
    document.getElementById("app")
)
