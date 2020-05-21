import React, { Component, Fragment } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText, Button, Row, Col } from 'reactstrap';
import { Fab, Avatar } from '@material-ui/core';
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
class ModalRegistro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            progreso: 0,
            publicidad: {
                cliente: '',
                publicidad: '',
                tipo: '',
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
            dato.append('imagen', this.state.publicidad.publicidad[0]);
            let publicidad = Object.assign({}, this.state.publicidad)
            delete publicidad.publicidad;
            publicidad.fecha_inicio = format(this.state.publicidad.fecha_inicio, 'yyyy-MM-dd H:mm:ss')
            publicidad.fecha_fin = format(this.state.publicidad.fecha_fin, 'yyyy-MM-dd H:mm:ss')
            dato.append('publicidad', JSON.stringify(publicidad));
            const resp = await (await this.api.post('publicidad', dato)).data;
            console.log(resp)
            if (resp.insertId) {
                this.props.confirmarRegistro();
                this.notify('Registro realizado de forma correcta', 'success');
                this.setState({ modal: false })
            }
            else
                this.notify('Problemas al realizar el registro comuniquese con el administrador', 'error');
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
                                <Dropzone
                                    ref={this.dropzoneRef}
                                    noClick
                                    noKeyboard
                                    onDrop={(file) => {
                                        let publicidad = this.state.publicidad;
                                        publicidad.publicidad = file;
                                        this.setState({ publicidad })
                                    }}
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
                                                        src={this.state.publicidad.publicidad.length > 0 ? URL.createObjectURL(this.state.publicidad.publicidad[0]) : null}
                                                        variant='rounded'
                                                        style={{ width: 300, height: 200 }}
                                                    />
                                                    <Button
                                                        outline
                                                        size='sm'
                                                        className='mt-2'
                                                        color='info'
                                                        onClick={this.openDialog}>
                                                        Buscar foto
                                                    </Button>
                                                </div>
                                            </div>
                                        );
                                    }}
                                </Dropzone>
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
                                <Col lg='6'>
                                    <FormGroup>
                                        <Label for="inputtipo">Tipo de publicidad</Label>
                                        <select
                                            id='inputtipo'
                                            name='tipo'
                                            value={this.state.publicidad.tipo}
                                            className='form-control'
                                            onChange={this.onInputChange}
                                        >
                                            <option value=''>Seleccione el tipo...</option>
                                            <option value='image'>Imagen</option>
                                            <option value='video'>Video</option>
                                        </select>
                                    </FormGroup>
                                </Col>
                                <Col lg='6'>
                                    <FormGroup>
                                        <Label for="inputpaginaweb">Pagina Web o enlace publicitario</Label>
                                        <Input
                                            id="inputpaginaweb"
                                            bsSize='sm'
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
                                            disableFuture
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
                                            disableFuture
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
                            <Button color="link" onClick={this.toggle}>Cancel</Button>
                            <Button size='sm' onClick={this.onRegistrar} color='danger' >Registrar</Button>
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