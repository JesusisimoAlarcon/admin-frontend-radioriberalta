import React, { Component, Fragment } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText, Row, Col } from 'reactstrap';
import { Fab, Avatar, Switch, CircularProgress, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Dropzone from 'react-dropzone';
import esLocale from 'date-fns/locale/es';
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import {
    toast,
    Bounce
} from 'react-toastify';
import Axios from 'axios';
import { connect } from 'react-redux';
import { format } from 'date-fns';
import ReactPlayer from 'react-player';
class ModalRegistro extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            paginaweb: false,
            progreso: 0,
            open: false,
            loading: false,
            publicidad: {
                cliente: '',
                publicidad: '',
                tipo: 'image',
                paginaweb: '',
                fecha_inicio: new Date(),
                fecha_fin: new Date(),
                prioridad: 3,
                estado: true
            }
        }
        this.api = Axios.create({
            baseURL: this.props.API,
            headers: {
                'x-access-token': this.props.TOKEN
            }
        });
        this.dropzoneRef = React.createRef();
        this.toggle = this.toggle.bind(this);
    }
    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }
    openDialog = () => {
        if (this.dropzoneRef.current) {
            this.dropzoneRef.current.open()
        }
    }
    onInputChange = (e) => {
        let publicidad = this.state.publicidad;
        publicidad[`${e.target.name}`] = e.target.value;
        this.setState({ publicidad })
    }
    onVerificarCampos = (publicidad) => {
        let bandera = true;
        let verificar = Object.assign({}, publicidad)
        delete verificar.fecha_inicio
        delete verificar.fecha_fin
        delete verificar.prioridad
        delete verificar.estado
        if (!this.state.paginaweb)
            delete verificar.paginaweb
        for (const prop in verificar) {
            console.log(verificar[prop])
            if (!verificar[prop]) {
                bandera = false;
                break;
            }
        }
        return bandera;
    }
    onRegistrar = async () => {
        if (this.onVerificarCampos(this.state.publicidad)) {
            const dato = new FormData();
            let publicidad = Object.assign({}, this.state.publicidad)
            if (this.state.publicidad.tipo === 'image') {
                dato.append('imagen', this.state.publicidad.publicidad[0]);
                delete publicidad.publicidad;
            }
            publicidad.fecha_inicio = format(this.state.publicidad.fecha_inicio, 'yyyy-MM-dd H:mm:ss')
            publicidad.fecha_fin = format(this.state.publicidad.fecha_fin, 'yyyy-MM-dd H:mm:ss')
            dato.append('publicidad', JSON.stringify(publicidad));
            try {
                this.setState({ loading: true })
                const resp = await (await this.api.post('publicidad', dato)).data;
                console.log(resp)
                this.props.confirmarRegistro();
                this.notify('Registro realizado de forma correcta', 'success');
                this.setState({ loading: false, modal: false })
            } catch (error) {
                this.setState({ loading: false, modal: false })
                this.notify('Ups tenemos problemas con su conexion a internet, por favor vuelva a intentarlo.', 'warning')
            }
        }
        else
            this.notify('Por favor debe completar los campos, no se permiten vacios', 'warning')

    }
    notify = (mensaje, type) => {
        this.toastId =
            toast(mensaje, {
                transition: Bounce,
                closeButton: true,
                autoClose: 5000,
                position: 'bottom-center',
                type
            });
    };
    render() {
        return (
            <Fragment>
                <Fab
                    className='m-3'
                    color='secondary'
                    onClick={this.toggle}>
                    <AddIcon />
                </Fab>
                <Modal isOpen={this.state.modal} size='md' toggle={this.toggle} className={this.props.className}>
                    <Form>
                        <ModalHeader className='text-center' toggle={this.toggle}>REGISTRO DE PUBLICIDAD</ModalHeader>
                        <ModalBody>
                            <center>
                                {'Tipo de Publicidad'}
                                <br />
                                {'Imagen'}
                                <Switch
                                    checked={
                                        this.state.publicidad.tipo === 'video'
                                    }
                                    onChange={() => {
                                        let publicidad = this.state.publicidad;
                                        publicidad.tipo === 'video' ? publicidad.tipo = 'image' : publicidad.tipo = 'video';
                                        publicidad.publicidad = '';
                                        this.setState({
                                            publicidad
                                        })
                                        console.log(this.state.publicidad.tipo)
                                    }}
                                />
                                {'Video'}
                            </center>
                            <center>
                                {this.state.publicidad.tipo === 'image' ?
                                    <Dropzone
                                        ref={this.dropzoneRef}
                                        noClick
                                        noKeyboard
                                        onDrop={(file) => {
                                            //console.log(file[0].type)
                                            let publicidad = this.state.publicidad;
                                            publicidad.publicidad = file;
                                            //publicidad.tipo = file[0].type.split('/')[0]
                                            this.setState({ publicidad })
                                        }}
                                        accept={'image/*'}
                                        //accept={['image/*', 'video/*']}
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
                                                                this.state.publicidad.publicidad.length > 0 ? URL.createObjectURL(this.state.publicidad.publicidad[0]) : null}
                                                            variant='rounded'
                                                            style={{ width: 300, height: 200 }}
                                                        />
                                                        <Button
                                                            variant='outlined'
                                                            size='small'
                                                            className='mt-2'
                                                            color='primary'
                                                            onClick={this.openDialog}>
                                                            {'Buscar imagen'}
                                                        </Button>
                                                    </div>
                                                </div>
                                            );
                                        }}
                                    </Dropzone>
                                    :
                                    <div>
                                        <div
                                            className='mb-3'
                                            style={{
                                                //position: 'relative',
                                                //paddingTop: '56.25%'
                                                height: 0,
                                                overflow: 'hidden',
                                                paddingBottom: '56.25%',
                                                paddingTop: '30px',
                                                position: 'relative'
                                            }}>
                                            <ReactPlayer
                                                style={{
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 0,
                                                    width: '100%',
                                                    height: '100%'
                                                }}
                                                controls
                                                light={false}
                                                url={
                                                    this.state.publicidad.tipo === 'video' ?
                                                        this.state.publicidad.publicidad : null
                                                }
                                                width='100%'
                                                height='100%'
                                            />
                                        </div>
                                        <FormGroup>
                                            <Label for="inputvideoyoutube">URL Video</Label>
                                            <Input
                                                id="inputvideoyoutube"
                                                bsSize='sm'
                                                name='publicidad'
                                                value={this.state.publicidad.tipo === 'video' ? this.state.publicidad.publicidad : ''}
                                                onChange={this.onInputChange}
                                            />
                                            <FormText>Ejemplo: https://www.youtube.com/watch?v=RV6VEr</FormText>
                                        </FormGroup>
                                    </div>
                                }
                            </center>
                            <FormGroup>
                                <Label for="inputcliente">Cliente</Label>
                                <Input
                                    id="inputcliente"
                                    bsSize='sm'
                                    name='cliente'
                                    value={this.state.publicidad.cliente}
                                    onChange={this.onInputChange}
                                />
                                <FormText>Ejemplo: Empresa Amazonas Boliviana</FormText>
                            </FormGroup>
                            <Row>
                                <Col lg='4'>
                                    <FormGroup className='text-center'>
                                        <Switch
                                            checked={this.state.paginaweb}
                                            onChange={() => {
                                                let publicidad = this.state.publicidad;
                                                publicidad.paginaweb = ''
                                                this.setState({
                                                    paginaweb: !this.state.paginaweb,
                                                    publicidad
                                                })
                                            }}
                                        />
                                        <br />
                                        <small>{'Cuenta con pagina web?'}</small>
                                    </FormGroup>
                                </Col>
                                <Col lg='8'>
                                    <FormGroup>
                                        <Label for="inputpaginaweb">Pagina Web</Label>
                                        <Input
                                            id="inputpaginaweb"
                                            bsSize='sm'
                                            disabled={!this.state.paginaweb}
                                            name='paginaweb'
                                            value={this.state.publicidad.paginaweb}
                                            onChange={this.onInputChange}
                                        />
                                        <FormText>Ejemplo: www.radioriberalta.com.bo</FormText>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg='6'>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
                                        <DateTimePicker
                                            className='form-control'
                                            variant='inline'
                                            autoOk
                                            size='small'
                                            ampm={false}
                                            format="dd MMM yyyy HH:mm"
                                            //disableFuture
                                            value={this.state.publicidad.fecha_inicio}
                                            onChange={(fecha_inicio) => {
                                                let publicidad = this.state.publicidad;
                                                publicidad.fecha_inicio = fecha_inicio;
                                                this.setState({ publicidad })
                                            }}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="start">
                                                        <IconButton>
                                                            <AccessTimeIcon />
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </MuiPickersUtilsProvider>
                                </Col>
                                <Col lg='6'>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
                                        <DateTimePicker
                                            className='form-control'
                                            variant='inline'
                                            autoOk
                                            size='small'
                                            ampm={false}
                                            format="dd MMM yyyy HH:mm"
                                            value={this.state.publicidad.fecha_fin}
                                            onChange={(fecha_fin) => {
                                                let publicidad = this.state.publicidad;
                                                publicidad.fecha_fin = fecha_fin;
                                                this.setState({ publicidad })
                                            }}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="start">
                                                        <IconButton>
                                                            <AccessTimeIcon />
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </MuiPickersUtilsProvider>
                                </Col>
                            </Row>
                        </ModalBody>
                        <ModalFooter>
                            {this.state.loading &&
                                <CircularProgress size={24} />
                            }
                            <Button size='small' disabled={this.state.loading} color='inherit' onClick={this.toggle}>Cancelar</Button>
                            <Button size='small' disabled={this.state.loading} onClick={this.onRegistrar} color='secondary' variant='contained'>Registrar</Button>
                        </ModalFooter>
                    </Form>
                </Modal>
            </Fragment>
        )
    }
}
const mapStateToProps = state => ({
    API: state.ThemeOptions.API_REST,
    TOKEN: state.ThemeOptions.token
});

const mapDispatchToProps = dispatch => ({});
export default connect(mapStateToProps, mapDispatchToProps)(ModalRegistro);