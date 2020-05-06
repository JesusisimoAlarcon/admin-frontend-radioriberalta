import React, { Fragment } from 'react';
import cx from 'classnames';

import { connect } from 'react-redux';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import HeaderLogo from '../AppLogo';
import jwt from 'jsonwebtoken';
import { Avatar } from '@material-ui/core';
class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usuario: jwt.decode(this.props.TOKEN).user
        }

    }
    render() {
        let {
            headerBackgroundColor,
            enableMobileMenuSmall,
            enableHeaderShadow
        } = this.props;
        return (
            <Fragment>
                <ReactCSSTransitionGroup
                    component="div"
                    className={cx("app-header", headerBackgroundColor, { 'header-shadow': enableHeaderShadow })}
                    transitionName="HeaderAnimation"
                    transitionAppear={true}
                    transitionAppearTimeout={1500}
                    transitionEnter={false}
                    transitionLeave={false}>

                    <HeaderLogo />

                    <div className={cx(
                        "app-header__content",
                        { 'header-mobile-open': enableMobileMenuSmall },
                    )}>


                        <div className="app-header-right">

                            <Avatar
                                variant="circle"
                                src={this.props.API + 'static/perfiles/' + this.state.usuario.fotografia}
                            />
                            <div className="ml-1 mr-2">
                                <div className="widget-heading" style={{ color: 'white' }}>
                                    {this.state.usuario.nombres + ' ' + this.state.usuario.apellidos}
                                </div>
                                <div className="widget-subheading" style={{ color: 'white' }}>
                                    <span>{this.state.usuario.rol}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </ReactCSSTransitionGroup>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    enableHeaderShadow: state.ThemeOptions.enableHeaderShadow,
    closedSmallerSidebar: state.ThemeOptions.closedSmallerSidebar,
    headerBackgroundColor: state.ThemeOptions.headerBackgroundColor,
    enableMobileMenuSmall: state.ThemeOptions.enableMobileMenuSmall,
    TOKEN: state.ThemeOptions.token,
    API: state.ThemeOptions.API_REST
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
