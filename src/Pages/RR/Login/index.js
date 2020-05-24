import React, { Component, Fragment } from 'react'
import { Row, Col, Form } from 'reactstrap'
import { Paper, Typography, Container, FormGroup, Button, FormControl, InputLabel, OutlinedInput } from '@material-ui/core'
import TextField from '@material-ui/core/TextField';
import logo from '../../../assets/utils/images/icono_logo.png'
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    toast,
    Bounce
} from 'react-toastify';
import './login.css'
import Axios from 'axios';
import jwt from 'jsonwebtoken';
import {
    setToken
} from '../../../reducers/ThemeOptions';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usuario: '',
            password: '',
            show: false
        }
    }

    notificacion = (mensaje, type) => {
        this.toastId =
            toast(mensaje, {
                transition: Bounce,
                closeButton: true,
                autoClose: 5000,
                position: 'top-center',
                type
            });
    };


    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    evaluarSolicitud = async () => {
        if (this.state.usuario && this.state.password) {
            const resp = await (await Axios.get(`${this.props.API}usuario/${this.state.usuario}/${this.state.password}`)).data;
            if (resp.auth) {
                const usuario = jwt.decode(resp.token).user;
                this.notificacion(`Bienvenido ${usuario.nombres}`, 'success');
                this.props.setToken(resp.token);
                if (!usuario.fotografia)
                    this.props.history.push('/admin/perfil');
                else
                    this.props.history.push('/admin');
            }
            else {
                this.notificacion(resp.message, 'error')
                this.setState({
                    usuario: '',
                    password: ''
                })
            }

        }
        else {
            this.notificacion('Debe ingresar sus credenciales, no se permiten campos vacios.', 'warning')
        }
    }
    render() {
        return (
            <Fragment>
                <Container>
                    <Row>
                        <Col xl='4' lg='3' md='3' sm='12' xs='12'>
                        </Col>
                        <Col xl='4' lg='6' md='6' sm='12' xs='12'>

                            <Paper variant='outlined' className='mt-3 pl-3 pr-3 pt-2 pb-3'>
                                <Form>
                                    <div className='text-center'>
                                        <img width='60%' className='mt-3' src={logo} alt='logo' />
                                    </div>
                                    <Typography color='secondary' style={{ fontWeight: 'bold' }} className='text-center m-3'>RADIO RIBERALTA | 94.7 FM</Typography>
                                    <FormGroup>
                                        <TextField
                                            className='m-2'
                                            color='secondary'
                                            name='usuario'
                                            type='text'
                                            value={this.state.usuario}
                                            onChange={this.onInputChange}
                                            label="Usuario"
                                            size='small'
                                            variant="outlined" />
                                    </FormGroup>
                                    <FormGroup>
                                        <FormControl
                                            className='m-2'
                                            variant="outlined"
                                            size='small'
                                            color='secondary'>
                                            <InputLabel htmlFor="inputpassword">Password</InputLabel>
                                            <OutlinedInput
                                                id="inputpassword"
                                                name='password'
                                                type={this.state.show ? 'text' : 'password'}
                                                value={this.state.password}
                                                onChange={this.onInputChange}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={() => this.setState({ show: !this.state.show })}
                                                            onMouseDown={(event) => event.preventDefault()}
                                                            edge="end"
                                                        >
                                                            {this.state.show ? <Visibility color='secondary' /> : <VisibilityOff color='secondary' />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                                labelWidth={70}
                                            />
                                        </FormControl>
                                    </FormGroup>
                                    <FormGroup>
                                        <Button size='small' className='m-2' variant='contained' color='secondary' onClick={() => { this.evaluarSolicitud() }}>INGRESAR</Button>
                                    </FormGroup>

                                    <Typography color='secondary' style={{ fontWeight: 'revert', fontSize: '0.8rem' }} className='text-center m-3'>
                                        ¿Olvide o no tengo mis datos?
                                    </Typography>

                                    <FormGroup>
                                        <Button onClick={() => { this.notificacion('Comuniquese con el administrador para que le proporcione sus credenciales de acceso', 'info')}} size='small' className='m-2' variant='outlined' color='secondary'>SOLICITAR DATOS</Button>
                                    </FormGroup>

                                    <Typography color='secondary' style={{ fontWeight: 'revert', fontSize: '0.7rem' }} className='text-center m-3'>
                                        ©2020 Radio Riberalta | 94.7 FM, Todos los derechos reservados
                                    </Typography>
                                </Form>
                            </Paper>

                        </Col>

                    </Row>
                </Container>
            </Fragment>
        )
    }
}
const mapStateToProps = state => ({
    API: state.ThemeOptions.API_REST
});
const mapDispatchToProps = dispatch => ({
    setToken: token => dispatch(setToken(token))
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));