import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import jwt from 'jsonwebtoken';
import { Avatar } from '@material-ui/core';
class UserBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usuario: jwt.decode(this.props.TOKEN).user,
            active: false
        }

    }

    render() {

        return (
            <Fragment>
                <div className="header-btn-lg pr-0">
                    <div className="widget-content p-0">
                        <div className="widget-content-wrapper">
                            <div className="widget-content-left">
                                <Avatar
                                    variant="circle"
                                    src={this.props.API + 'static/perfiles/' + this.state.usuario.fotografia}
                                />
                                <div className="ml-1 mr-2">

                                    <div className="widget-heading">
                                        {this.state.usuario.nombres + ' ' + this.state.usuario.apellidos}
                                    </div>
                                    <div className="widget-subheading">
                                        <span>{this.state.usuario.rol}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}
const mapStateToProps = state => ({
    TOKEN: state.ThemeOptions.token,
    API: state.ThemeOptions.API_REST
});
const mapDispatchToProps = dispatch => ({
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserBox));