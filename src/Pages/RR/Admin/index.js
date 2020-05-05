import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'

export default class Admin extends Component {
    render() {
        return (
            <Fragment>
                <Link to='/admin/programa'>TEST</Link>
                {"Bienvenido..."}
            </Fragment>
        )
    }
}
