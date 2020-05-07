import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';

import MetisMenu from 'react-metismenu';
import { connect } from 'react-redux';
//import { RiberaltaNav, NostrosNav, AdminNav, NoticiasTestNav, NoticiasNav } from './NavItems';
import { NoticiasTestNav } from './NavItems';
//import axios from 'axios';
class Nav extends Component {

    render() {
        return (
            <Fragment>
                <MetisMenu content={NoticiasTestNav} activeLinkFromLocation className="vertical-nav-menu mt-3" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down" />
            </Fragment>
        );
    }
}
const mapStateToProps = state => ({
    SECCIONES: state.ThemeOptions.secciones
});

const mapDispatchToProps = dispatch => ({});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Nav));