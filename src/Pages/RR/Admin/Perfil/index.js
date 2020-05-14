import React, { Component, Fragment } from 'react'
import { Paper, Typography, Chip, Switch, Backdrop, CircularProgress } from '@material-ui/core'
import PageTitle from '../../../../Layout/AppMain/PageTitle';
import { InputGroup, InputGroupAddon, FormGroup, Label, Input, FormText, Row, Col } from 'reactstrap';
import { Divider, Button } from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import { green, lightBlue, purple } from '@material-ui/core/colors';
import Dropzone from 'react-dropzone';
import Avatar from '@material-ui/core/Avatar';
import Axios from 'axios';
import { connect } from 'react-redux';
import jwt from 'jsonwebtoken';
import {
    toast,
    Bounce
} from 'react-toastify';
import { withRouter } from 'react-router-dom';
import {
    setToken
} from '../../../../reducers/ThemeOptions';
import CheckIcon from '@material-ui/icons/Check';
class Perfil extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_update: false,
            conductor: '',
            password: '',
            passwordrepeat: '',
            idconductor: jwt.decode(this.props.TOKEN).user.idconductor,
            fotografia: '',
            listo_datos_personales: true,
            progreso: 0,
            open: false
        }
        this.api = Axios.create({
            baseURL: this.props.API,
            headers: {
                'x-access-token': this.props.TOKEN
            },
            onUploadProgress: (e) => {
                console.log(e.loaded)
                console.log(e.total)
                this.setState({
                    progreso: (e.loaded * 100) / e.total
                })
            }
        });
        this.dropzoneRef = React.createRef();
    }
    async componentDidMount() {
        await this.getConductor();
        this.verificarCamposPersonales();
        this.setState({ user_update: !this.state.conductor.confirmado })
    }

    getConductor = async () => {
        const conductor = await (await this.api.get('conductor/user/' + this.state.idconductor)).data[0];
        this.setState({ conductor });
    }
    onPreviewDrop = (file) => {
        this.setState({
            fotografia: file
        });
        this.verificarCamposPersonales();
    }
    onInputChange = (e) => {
        let conductor = this.state.conductor;
        conductor[`${e.target.name}`] = e.target.value;
        this.setState({ conductor })
        this.verificarCamposPersonales();
    }


    onVerificarCampos = (conductor) => {
        let bandera = true;
        let verificar = Object.assign({}, conductor)
        delete verificar.idconductor;
        delete verificar.idusuario;
        delete verificar.confirmado;
        delete verificar.estado;
        delete verificar.username;
        delete verificar.fotografia;
        for (const prop in verificar) {
            if (!conductor[prop]) {
                bandera = false;
                break;
            }
        }
        return bandera;
    }
    onInputPassword = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    openDialog = () => {
        if (this.dropzoneRef.current) {
            this.dropzoneRef.current.open()
        }
    };
    notifycorrecto = (mensaje, type) => {
        this.toastId =
            toast(mensaje, {
                transition: Bounce,
                closeButton: true,
                autoClose: 5000,
                position: 'bottom-center',
                type
            });
    };
    verificarCamposPersonales = () => {
        this.setState({ listo_datos_personales: this.onVerificarCampos(this.state.conductor) && (this.state.fotografia || this.state.conductor.fotografia) })
    }
    enviar_actualizacion = async () => {
        if (this.state.user_update) {
            console.log('actualizar credenciales')
            if (this.state.conductor.username && this.state.password && this.state.passwordrepeat) {
                if (this.state.password === this.state.passwordrepeat) {
                    console.log('verificacion correcta')
                    await this.actualizar();
                }
                else {
                    this.notifycorrecto('Revise y escribi bien su contraseña, no coinciden', 'error');
                }
            }
            else {
                this.notifycorrecto('por favor no deje campos vacios para sus credenciales', 'error');
            }
        }
        else {
            console.log('no actualizar credenciales')
            await this.actualizar();
        }
    }
    actualizar = async () => {
        const dato = new FormData();
        if (this.state.fotografia)
            dato.append('imagen', this.state.fotografia[0]);
        if (!this.state.conductor.confirmado || this.state.user_update) {
            await (await this.api.put('usuario/' + this.state.conductor.idusuario, {
                username: this.state.conductor.username,
                password: this.state.password,
                confirmado: true
            })).data;
        }
        delete this.state.conductor.username
        delete this.state.conductor.idusuario
        delete this.state.conductor.confirmado
        delete this.state.conductor.estado
        dato.append('conductor', JSON.stringify(this.state.conductor));
        this.setState({
            open: true
        })
        const resp = await (await this.api.put('conductor/' + this.state.idconductor, dato)).data;
        if (resp.ok) {
            this.getConductor();
            if (this.state.user_update) {
                this.notifycorrecto("Actualizacion de datos de forma correcta. por favor vuelva a iniciar sesion para confirmar sus credenciales...", 'success');
                this.setState({
                    open: false
                })
                this.props.setToken('');
                this.props.history.push('/signin');
            }
            else {
                this.notifycorrecto("Actualizacion de datos de forma correcta.", 'success');
                this.setState({
                    open: false
                })
                this.props.history.push('/admin');
            }
        }
        else
            this.notifycorrecto("Ups algo salio mal, contactese con el administrador.. :(", 'error');
    }
    render() {
        return (
            <Fragment>
                <Backdrop
                    style={{
                        zIndex: 1
                    }}
                    open={this.state.open}
                >
                    {this.state.progreso === 100 ?
                        <CheckIcon style={{ fontSize: '100px', color: 'white' }} />
                        :
                        <CircularProgress className='mt-0 mb-3 ml-3 mr-3' thickness={2} size='8rem' variant="indeterminate" color="secondary" />
                    }
                </Backdrop>
                <PageTitle
                    heading="Actualizacion de datos personales"
                    subheading="Puede actualizar la informacion que se publica en la pagina de noticias."
                    icon="pe-7s-user text-primary"
                />
                {this.state.conductor &&
                    < Paper className='p-3 mb-3'>
                        <Row>
                            <Col lg='4'>
                                <center>
                                    <Dropzone
                                        ref={this.dropzoneRef}
                                        noClick
                                        noKeyboard
                                        onDrop={this.onPreviewDrop}
                                        accept='image/*'
                                        multiple={false}
                                    >
                                        {({ getRootProps, getInputProps, acceptedFiles }) => {
                                            return (
                                                <div>
                                                    <div {...getRootProps({ className: 'dropzone' })}>
                                                        <input
                                                            {...getInputProps()}
                                                        />
                                                        <Avatar
                                                            src={
                                                                this.state.fotografia.length > 0 ?
                                                                    URL.createObjectURL(this.state.fotografia[0])
                                                                    :
                                                                    this.props.API + 'static/perfiles/' + this.state.conductor.fotografia
                                                            }
                                                            style={{ width: 150, height: 150 }}
                                                        />

                                                        <Button
                                                            size='small'
                                                            variant='contained'
                                                            className='mt-2'
                                                            color='primary'
                                                            onClick={this.openDialog}>
                                                            Buscar foto
                                                        </Button>
                                                    </div>
                                                </div>
                                            );
                                        }}
                                    </Dropzone>
                                </center>
                            </Col>
                            <Col lg='4' sm='6'>
                                <FormGroup>
                                    <Label for="inputnombre">Nombres</Label>
                                    <Input
                                        id="inputnombre"
                                        bsSize='sm'
                                        name='nombres'
                                        value={this.state.conductor.nombres}
                                        onChange={this.onInputChange}
                                    />
                                    <FormText>Ejemplo: Jose Luis</FormText>
                                </FormGroup>
                            </Col>
                            <Col lg='4' sm='6'>
                                <FormGroup>
                                    <Label for="inputapellidos">Apellidos</Label>
                                    <Input
                                        id="inputapellidos"
                                        bsSize='sm'
                                        name='apellidos'
                                        value={this.state.conductor.apellidos}
                                        onChange={this.onInputChange}
                                    />
                                    <FormText>Ejemplo: Paredes Suarez</FormText>
                                </FormGroup>
                            </Col>

                        </Row>

                        <Row>
                            <Col lg='4' sm='4'>
                                <FormGroup>
                                    <Label for="inputtelefono">Telefono</Label>
                                    <Input
                                        id="inputtelefono"
                                        bsSize='sm'
                                        name='telefono'
                                        type='tel'
                                        value={this.state.conductor.telefono}
                                        onChange={this.onInputChange}
                                    />
                                    <FormText>Ejemplo: 50235485</FormText>
                                </FormGroup>
                            </Col>
                            <Col lg='4' sm='4'>
                                <FormGroup>
                                    <Label for="inputcelular">Celular</Label>
                                    <Input
                                        id="inputcelular"
                                        bsSize='sm'
                                        name='celular'
                                        type='tel'
                                        value={this.state.conductor.celular}
                                        onChange={this.onInputChange}
                                    />
                                    <FormText>Ejemplo: 78459656</FormText>
                                </FormGroup>
                            </Col>
                            <Col lg='4' sm='4'>
                                <FormGroup>
                                    <Label for="inputcorreo">Correo electronico</Label>
                                    <Input
                                        id="inputcorreo"
                                        bsSize='sm'
                                        name='correo'
                                        type='email'
                                        value={this.state.conductor.correo}
                                        onChange={this.onInputChange}
                                    />
                                    <FormText>Ejemplo: joselui@hotmail.com</FormText>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Divider className='m-2' />
                        <Label>REDES SOCIALES</Label>
                        <Row form>
                            <Col lg='3'>
                                <InputGroup size='sm'>
                                    <InputGroupAddon addonType="append"><FacebookIcon color='primary' /></InputGroupAddon>
                                    <Input
                                        name='facebook'
                                        value={this.state.conductor.facebook}
                                        onChange={this.onInputChange}
                                    />
                                </InputGroup>
                            </Col>
                            <Col lg='3'>
                                <InputGroup size='sm'>
                                    <InputGroupAddon addonType="append"><WhatsAppIcon style={{ color: green[500] }} /></InputGroupAddon>
                                    <Input
                                        name='whatsapp'
                                        value={this.state.conductor.whatsapp}
                                        onChange={this.onInputChange}
                                    />
                                </InputGroup>
                            </Col>
                            <Col lg='3'>
                                <InputGroup size='sm'>
                                    <InputGroupAddon addonType="append"><TwitterIcon style={{ color: lightBlue[500] }} /></InputGroupAddon>
                                    <Input
                                        name='twiter'
                                        value={this.state.conductor.twiter}
                                        onChange={this.onInputChange}
                                    />
                                </InputGroup>
                            </Col>
                            <Col lg='3'>
                                <InputGroup size='sm'>
                                    <InputGroupAddon addonType="append"><InstagramIcon style={{ color: purple[500] }} /></InputGroupAddon>
                                    <Input
                                        name='instagram'
                                        value={this.state.conductor.instagram}
                                        onChange={this.onInputChange}
                                    />
                                </InputGroup>
                            </Col>
                        </Row>
                        <Row className='m-3'>
                            <Col className='text-center'>
                                <Switch disabled={!this.state.conductor.confirmado} onChange={() => this.setState({ user_update: !this.state.user_update })} value={this.state.user_update} />Desea actualizar sus credenciales?
                            </Col>
                        </Row>
                        {(!this.state.conductor.confirmado || this.state.user_update) &&
                            <div>
                                <Row>
                                    <Col lg='4' sm='6'>
                                        <FormGroup>
                                            <Label for="inputusuario">Usuario</Label>
                                            <Input
                                                id="inputusuario"
                                                bsSize='sm'
                                                name='username'
                                                value={this.state.conductor.username}
                                                onChange={this.onInputChange}
                                            />
                                            <FormText>Ejemplo: La pua</FormText>
                                        </FormGroup>
                                    </Col>
                                    <Col lg='4' sm='6'>
                                        <FormGroup>
                                            <Label for="inputpassword">Nueva Contraseña</Label>
                                            <Input
                                                id="inputpassword"
                                                bsSize='sm'
                                                name='password'
                                                value={this.state.password}
                                                onChange={this.onInputPassword}
                                            />
                                            <FormText>Ejemplo: pepitoperez</FormText>
                                        </FormGroup>
                                    </Col>
                                    <Col lg='4' sm='6'>
                                        <FormGroup>
                                            <Label for="inputpasswordrepeat">Confirmar contraseña</Label>
                                            <Input
                                                id="inputpasswordrepeat"
                                                bsSize='sm'
                                                name='passwordrepeat'
                                                value={this.state.passwordrepeat}
                                                onChange={this.onInputPassword}
                                            />
                                            <FormText color='danger'>{this.state.password !== this.state.passwordrepeat ? 'Las contraseñas no coinciden' : ''}</FormText>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Divider className='m-3' />
                            </div>
                        }
                        {(!this.state.conductor.confirmado || this.state.user_update) &&
                            <div className='text-center m-3'>
                                <Typography color='secondary' variant='subtitle1'>
                                    {'Por protocolos de seguridad debe actualizar sus credenciales (usuario y contraseña) y completar sus datos personales para poder acceder a las funcionalidades del sistema, recuerde que los datos registrados se utilizan para la publicacion de su informacion en la pagina web de noticias de nuestra Radio Riberalta.'}
                                </Typography>
                            </div>
                        }
                        <Typography color='primary' className='text-center m-3' variant='subtitle1'>
                            {'No proporcione sus credenciales a terceras personas, la plataforma es de uso exclusivo y confidencial por lo que su acceso debe ser restringido, recuerde que lo estamos vigilando. Gracias ;)'}
                            {/*}
                            <br />
                            <Checkbox checked={this.state.user_update} />{'Desea cambiar su contraseña?'}
                            {*/}
                            <br />
                            {!this.state.listo_datos_personales &&
                                <Chip color='secondary' size='small' className='mb-1' label={'No se permiten campos vacios.'} />
                            }
                            <br />
                            <Button disabled={!this.state.listo_datos_personales} size='small'
                                color='primary' variant='contained' onClick={this.enviar_actualizacion} >Confirmar y actualizar</Button>
                        </Typography>

                    </Paper>

                }

            </Fragment>
        )
    }
}
const mapStateToProps = state => ({
    API: state.ThemeOptions.API_REST,
    TOKEN: state.ThemeOptions.token
});

const mapDispatchToProps = dispatch => ({
    setToken: token => dispatch(setToken(token))
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Perfil));