import React, { Component } from 'react'
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Label,
    FormText,
    Button,
    Row,
    Col
} from 'reactstrap';
import Axios from 'axios';
import { connect } from 'react-redux';
import esLocale from 'date-fns/locale/es';
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, KeyboardTimePicker } from "@material-ui/pickers";
import { Avatar, Select, MenuItem, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
class ModalRegistro extends Component {

    constructor(props) {
        super(props)
        this.state = {
            modal: false,
            diasemana: '',
            horainicio: new Date(),
            horafin: new Date(),
            estado: false,
            idconductor: '',
            idprograma: '',
            programas: [],
            conductores: []
        }
        this.toggle = this.toggle.bind(this);
        this.api = Axios.create({
            baseURL: this.props.API,
            //timeout: 1000,
            headers: { 'x-access-token': this.props.TOKEN }
        })
    }

    componentDidMount = async () => {
        const resp_programas = await this.api.get('programa/detalle');
        this.setState({
            programas: resp_programas.data
        })

        const resp_conductores = await this.api.get('conductor');
        this.setState({
            conductores: resp_conductores.data
        })
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        })
    }

    onSelectChange = (e) => {
        this.setState({
            diasemana: e.target.value
        })
    }

    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = async (e) => {
        e.preventDefault();
        this.setState({
            diasemana: '',
            horainicio: new Date(),
            horafin: new Date(),
            idconductor: '',
            idprograma: '',
        })
        this.toggle();
    }
    render() {
        const { handleList } = this.props;
        return (
            <span className="d-inline-block mb-2 mr-2">
                <Button color="dark" onClick={this.toggle}>Nueva programacion</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <Form onSubmit={this.onSubmit}>
                        <ModalHeader toggle={this.toggle}>DATOS DEL PROGRAMA</ModalHeader>
                        <ModalBody>

                            <FormGroup>
                                <Label for="selectdiasemana">Dia de la semana</Label>
                                <Select
                                    id='selectdiasemana'
                                    className='form-control'
                                    name='diasemana'
                                    style={{
                                        fontSize: '0.9rem'
                                    }}
                                    value={this.state.diasemana}
                                    onChange={this.onInputChange}
                                    size='small'
                                >

                                    <MenuItem value='0'>Seleccion un dia</MenuItem>
                                    <MenuItem value="Lunes">Lunes</MenuItem>
                                    <MenuItem value="Martes">Martes</MenuItem>
                                    <MenuItem value="Miercoles">Miercoles</MenuItem>
                                    <MenuItem value="Jueves">Jueves</MenuItem>
                                    <MenuItem value="Viernes">Viernes</MenuItem>
                                    <MenuItem value="Sabado">Sabado</MenuItem>
                                    <MenuItem value="Domingo">Domingo</MenuItem>
                                </Select>
                                <FormText>Ejemplo: Lunes, martes, miercoles.</FormText>
                            </FormGroup>
                            <Row>
                                <Col lg='6'>
                                    <FormGroup>
                                        <Label for="inputhorainicio">Hora Inicio</Label>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
                                            <KeyboardTimePicker
                                                id='inputhorainicio'
                                                className='form-control'
                                                name='horainicio'
                                                mask="__:__ _M"
                                                value={this.state.horainicio}
                                                onChange={(horainicio) => {
                                                    this.setState({
                                                        horainicio
                                                    })
                                                }}
                                            />
                                        </MuiPickersUtilsProvider>
                                    </FormGroup>
                                </Col>
                                <Col lg='6'>
                                    <FormGroup>
                                        <Label for="inputhorafin">Hora Fin</Label>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
                                            <KeyboardTimePicker
                                                id='inputhorafin'
                                                className='form-control'
                                                name='horafin'
                                                mask="__:__ _M"
                                                value={this.state.horafin}
                                                onChange={(horafin) => {
                                                    this.setState({
                                                        horafin
                                                    })
                                                }}
                                            />
                                        </MuiPickersUtilsProvider>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <FormGroup>
                                <Label for="selectprograma">Programa</Label>
                                <Select
                                    id='selectprograma'
                                    className='form-control'
                                    name='idprograma'
                                    style={{
                                        fontSize: '0.9rem'
                                    }}
                                    value={this.state.idprograma}
                                    onChange={this.onInputChange}
                                    size='small'
                                >

                                    <MenuItem value='0'>Seleccion un programa</MenuItem>
                                    {this.state.programas && this.state.programas.map(programa =>
                                        <MenuItem component='div' key={programa.idprograma} value={programa.idprograma}>
                                            <ListItem>
                                                <ListItemAvatar>
                                                    <i className={programa.icono + ' pe-2x pe-spin mr-3'}></i>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={programa.programa}
                                                    secondary={programa.genero}
                                                />
                                            </ListItem>

                                        </MenuItem>
                                    )}
                                </Select>
                            </FormGroup>
                            <FormGroup>
                                <Label for="selectconductor">Conductor del programa</Label>
                                <Select
                                    id='selectconductor'
                                    className='form-control'
                                    name='idconductor'
                                    style={{
                                        fontSize: '0.9rem'
                                    }}
                                    value={this.state.idconductor}
                                    onChange={this.onInputChange}
                                    size='small'
                                >

                                    <MenuItem value='0'>Seleccion un conductor</MenuItem>
                                    {this.state.conductores.map(conductor =>
                                        <MenuItem component='div' key={conductor.idconductor} value={conductor.idconductor}>

                                            <ListItem>
                                                <ListItemAvatar>
                                                    <Avatar src={this.props.API + 'static/perfiles/' + conductor.fotografia} />
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={conductor.nombres + ' ' + conductor.apellidos}
                                                />
                                            </ListItem>

                                        </MenuItem>
                                    )}
                                </Select>
                            </FormGroup>



                        </ModalBody>
                        <ModalFooter>
                            <Button color="link" onClick={this.toggle}>Cancel</Button>
                            <Button size='sm' onClick={() => handleList(
                                this.state.diasemana,
                                this.state.horainicio,
                                this.state.horafin,
                                this.state.idconductor,
                                this.state.idprograma
                            )} color='danger' type='submit'>REGISTRAR</Button>
                        </ModalFooter>
                    </Form>
                </Modal>
            </span>
        )
    }
}
const mapStateToProps = state => ({
    API: state.ThemeOptions.API_REST,
    TOKEN: state.ThemeOptions.token
});

const mapDispatchToProps = dispatch => ({});
export default connect(mapStateToProps, mapDispatchToProps)(ModalRegistro);