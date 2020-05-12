import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import MetisMenu from 'react-metismenu';
import { connect } from 'react-redux';
import { NoticiasTestNav } from './NavItems';
import jwt from 'jsonwebtoken';
import Axios from 'axios';
class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            conductor: '',
            user: jwt.decode(this.props.TOKEN).user
        }

        if (this.state.user.rol === 'CONDUCTOR') {
            NoticiasTestNav.splice(1, 1);
            NoticiasTestNav.splice(1, 1);
        }
        this.api = Axios.create({
            baseURL: this.props.API,
            headers: {
                'x-access-token': this.props.TOKEN
            },
            onUploadProgress: (e) => {
                //console.log(e.loaded)
            }
        });

    }
    componentDidMount() {
        this.getConductor();
        console.log(this.state.conductor)
    }
    getConductor = async () => {
        const conductor = await (await this.api.get('conductor/user/' + this.state.user.idconductor)).data[0];
        this.setState({ conductor });
    }
    render() {
        return (
            <Fragment>
                {this.state.conductor.confirmado ?
                    <MetisMenu content={NoticiasTestNav} activeLinkFromLocation className="vertical-nav-menu mt-3" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down" />
                    :
                    ''
                }
            </Fragment>
        );
    }
}
const mapStateToProps = state => ({
    SECCIONES: state.ThemeOptions.secciones,
    TOKEN: state.ThemeOptions.token,
    API: state.ThemeOptions.API_REST
});

const mapDispatchToProps = dispatch => ({});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Nav));