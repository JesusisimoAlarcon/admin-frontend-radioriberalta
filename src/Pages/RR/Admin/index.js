import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Paper, Typography, Avatar } from '@material-ui/core';
import jwt from 'jsonwebtoken';
class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usuario: jwt.decode(this.props.TOKEN).user
        }
    }
    render() {
        return (
            <Fragment>
                <Paper className='p-2'>
                    <div className='text-center'>

                        <h4>Bienvenido</h4>
                        <center>
                            <Avatar
                                variant="rounded"
                                src={this.props.API + 'static/perfiles/' + this.state.usuario.fotografia}
                                style={{ width: 90, height: 90 }}
                            />
                        </center>
                        <h5>{this.state.usuario.nombres + ' ' + this.state.usuario.apellidos}</h5>
                        <Typography color='secondary'>{this.state.usuario.rol}</Typography>
                    </div>
                </Paper>

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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Admin));