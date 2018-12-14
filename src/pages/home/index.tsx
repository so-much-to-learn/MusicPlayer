import * as React from 'react'
import { observer, inject } from 'mobx-react'
import './index.scss'


interface IHomeProps {
    store: any
}


@observer
class Home extends React.Component<IHomeProps, any> {
    componentDidMount() {
        this.props.store.fetchTitle()
    }

    render() {
        return <h1>this is {this.props.store.title || ""}</h1>
    }
}

export default Home
