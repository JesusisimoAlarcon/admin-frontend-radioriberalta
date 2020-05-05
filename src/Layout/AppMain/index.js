import { Route, Redirect } from 'react-router-dom';
//import React, { Suspense, lazy, Fragment } from 'react';
import React, { Fragment } from 'react';

import {
    ToastContainer,
} from 'react-toastify';
//import { CircularProgress } from '@material-ui/core';
//import logo from '../../assets/utils/images/logo-inverse.png'
//const RR = lazy(() => import('../../Pages/RR'));
import RR from '../../Pages/RR';
import Login from '../../Pages/RR/Login';
//const Login = lazy(() => import('../../Pages/RR/Login'));

const AppMain = () => {
    return (
        <Fragment>
            <Route path="/admin" component={RR} />
            <Route path="/signin" component={Login} />
            <Route exact path="/">
                <Redirect to='/signin' />
            </Route>
            <ToastContainer />
        </Fragment>
    )
};

export default AppMain;