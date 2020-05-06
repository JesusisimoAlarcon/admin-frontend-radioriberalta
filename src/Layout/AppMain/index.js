import { Route, Redirect } from 'react-router-dom';

import React, { Fragment } from 'react';

import {
    ToastContainer,
} from 'react-toastify';

import RR from '../../Pages/RR';
import Login from '../../Pages/RR/Login';
import { connect } from 'react-redux';


const PrivateRoute = ({ auth, component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        auth === true
            ? <Component {...props} />
            : <Redirect to={{
                pathname: '/',
                state: { from: props.location }
            }} />
    )} />
)
const AppMain = ({ TOKEN }) => {
    return (
        <Fragment>
            <PrivateRoute auth={TOKEN ? true : false} path="/admin" component={RR} />
            <Route path="/signin" component={Login} />
            <Route exact path="/">
                <Redirect to='/signin' />
            </Route>
            <ToastContainer />
        </Fragment>
    )
};
const mapStateToProps = state => ({
    TOKEN: state.ThemeOptions.token
});
const mapDispatchToProps = dispatch => ({});
export default connect(mapStateToProps, mapDispatchToProps)(AppMain);
