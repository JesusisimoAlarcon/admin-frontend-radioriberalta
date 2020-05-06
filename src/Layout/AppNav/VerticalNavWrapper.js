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
                <MetisMenu content={NoticiasTestNav} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down" />
                {/*}
                <h5 className="app-sidebar__heading">RIBERALTA</h5>
                <MetisMenu content={RiberaltaNav} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down" />
                <h5 className="app-sidebar__heading">NUESTRA RADIO</h5>
                <MetisMenu content={NostrosNav} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down" />
                <h5 className="app-sidebar__heading">ADMINISTRACION</h5>
                <MetisMenu content={AdminNav} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down" />
        {*/}
            </Fragment>
        );
    }
    /*
        isPathActive(path) {
            return this.props.location.pathname.startsWith(path);
        }
        */
}
const mapStateToProps = state => ({
    SECCIONES: state.ThemeOptions.secciones
});

const mapDispatchToProps = dispatch => ({});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Nav));