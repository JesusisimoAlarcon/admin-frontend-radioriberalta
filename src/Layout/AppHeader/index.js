import React, { Fragment } from 'react';
import cx from 'classnames';

import { connect } from 'react-redux';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import HeaderLogo from '../AppLogo';
import UserBox from './Components/UserBox';
import SearchBox from './Components/SearchBox';
import logocasa from '../../assets/utils/images/banderas/logo_casa.png';
import { Typography } from '@material-ui/core';
class Header extends React.Component {
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
                        <div className="app-header-left">
                            <SearchBox />
                            <center>
                                <img width="30px" alt='logocasa' src={logocasa} className='mr-1' />
                                <Typography style={{
                                    color: 'white',
                                    fontWeight: 'bold',
                                    fontSize: '0.7rem'
                                }}><small>#QuedateEnCasa</small></Typography>
                            </center>
                        </div>

                        <div className="app-header-right">

                            <UserBox />
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
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Header);