import React, { Component, Fragment } from 'react'
import PageTitle from '../../../../Layout/AppMain/PageTitle';
import { Paper, Button, IconButton } from '@material-ui/core';
import { Row, Col, FormGroup, Input, Label, FormText } from 'reactstrap';
import MaterialTable from 'material-table';
import Axios from 'axios';
import { connect } from 'react-redux';
import {
    toast,
    Bounce
} from 'react-toastify';

import DeleteIcon from '@material-ui/icons/Delete';
class Seccion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            secciones: '',
            seccion: '',
            icono: '',
            exists_icono: false,
            iconData: ["pe-7s-album", "pe-7s-arc", "pe-7s-back-2", "pe-7s-bandaid", "pe-7s-car",
                "pe-7s-diamond", "pe-7s-door-lock", "pe-7s-eyedropper", "pe-7s-female", "pe-7s-gym",
                "pe-7s-hammer", "pe-7s-headphones",
                "pe-7s-helm", "pe-7s-hourglass", "pe-7s-leaf", "pe-7s-magic-wand", "pe-7s-male",
                "pe-7s-map-2", "pe-7s-next-2", "pe-7s-paint-bucket",
                "pe-7s-pendrive", "pe-7s-photo", "pe-7s-piggy", "pe-7s-plugin", "pe-7s-refresh-2",
                "pe-7s-rocket", "pe-7s-settings", "pe-7s-shield", "pe-7s-smile",
                "pe-7s-usb", "pe-7s-vector", "pe-7s-wine", "pe-7s-cloud-upload", "pe-7s-cash",
                "pe-7s-close", "pe-7s-bluetooth", "pe-7s-cloud-download", "pe-7s-way",
                "pe-7s-close-circle", "pe-7s-id", "pe-7s-angle-up", "pe-7s-wristwatch", "pe-7s-angle-up-circle",
                "pe-7s-world", "pe-7s-angle-right", "pe-7s-volume",
                "pe-7s-angle-right-circle", "pe-7s-users", "pe-7s-angle-left", "pe-7s-user-female",
                "pe-7s-angle-left-circle", "pe-7s-up-arrow", "pe-7s-angle-down", "pe-7s-switch",
                "pe-7s-angle-down-circle", "pe-7s-scissors", "pe-7s-wallet", "pe-7s-safe", "pe-7s-volume2",
                "pe-7s-volume1", "pe-7s-voicemail", "pe-7s-video", "pe-7s-user", "pe-7s-upload",
                "pe-7s-unlock", "pe-7s-umbrella", "pe-7s-trash", "pe-7s-tools", "pe-7s-timer",
                "pe-7s-ticket", "pe-7s-target", "pe-7s-sun", "pe-7s-study", "pe-7s-stopwatch", "pe-7s-star", "pe-7s-speaker",
                "pe-7s-signal", "pe-7s-shuffle", "pe-7s-shopbag", "pe-7s-share", "pe-7s-server",
                "pe-7s-search", "pe-7s-film", "pe-7s-science", "pe-7s-disk", "pe-7s-ribbon", "pe-7s-repeat", "pe-7s-refresh",
                "pe-7s-add-user", "pe-7s-refresh-cloud", "pe-7s-paperclip", "pe-7s-radio", "pe-7s-note2",
                "pe-7s-print", "pe-7s-network", "pe-7s-prev", "pe-7s-mute", "pe-7s-power", "pe-7s-medal",
                "pe-7s-portfolio", "pe-7s-like2", "pe-7s-plus", "pe-7s-left-arrow", "pe-7s-play",
                "pe-7s-key", "pe-7s-plane", "pe-7s-joy", "pe-7s-photo-gallery", "pe-7s-pin", "pe-7s-phone", "pe-7s-plug",
                "pe-7s-pen", "pe-7s-right-arrow", "pe-7s-paper-plane", "pe-7s-delete-user", "pe-7s-paint",
                "pe-7s-bottom-arrow", "pe-7s-notebook", "pe-7s-note", "pe-7s-next", "pe-7s-news-paper",
                "pe-7s-musiclist", "pe-7s-music", "pe-7s-mouse", "pe-7s-more", "pe-7s-moon", "pe-7s-monitor",
                "pe-7s-micro", "pe-7s-menu", "pe-7s-map", "pe-7s-map-marker", "pe-7s-mail", "pe-7s-mail-open",
                "pe-7s-mail-open-file", "pe-7s-magnet", "pe-7s-loop", "pe-7s-look", "pe-7s-lock",
                "pe-7s-lintern", "pe-7s-link", "pe-7s-like", "pe-7s-light", "pe-7s-less", "pe-7s-keypad", "pe-7s-junk",
                "pe-7s-info", "pe-7s-home", "pe-7s-help2", "pe-7s-help1", "pe-7s-graph3",
                "pe-7s-graph2", "pe-7s-graph1", "pe-7s-graph", "pe-7s-global", "pe-7s-gleam", "pe-7s-glasses",
                "pe-7s-gift", "pe-7s-folder",
                "pe-7s-flag", "pe-7s-filter", "pe-7s-file", "pe-7s-expand1", "pe-7s-exapnd2",
                "pe-7s-edit", "pe-7s-drop", "pe-7s-drawer", "pe-7s-download", "pe-7s-display2",
                "pe-7s-display1", "pe-7s-diskette",
                "pe-7s-date", "pe-7s-cup", "pe-7s-culture", "pe-7s-crop", "pe-7s-credit",
                "pe-7s-copy-file", "pe-7s-config", "pe-7s-compass", "pe-7s-comment", "pe-7s-coffee",
                "pe-7s-cloud", "pe-7s-clock",
                "pe-7s-check", "pe-7s-chat", "pe-7s-cart", "pe-7s-camera", "pe-7s-call", "pe-7s-calculator",
                "pe-7s-browser", "pe-7s-box2", "pe-7s-box1", "pe-7s-bookmarks", "pe-7s-bicycle", "pe-7s-bell",
                "pe-7s-battery", "pe-7s-ball", "pe-7s-back", "pe-7s-attention", "pe-7s-anchor", "pe-7s-albums",
                "pe-7s-alarm", "pe-7s-airplay"]
        }
        this.api = Axios.create({
            baseURL: this.props.API,
            headers: {
                'x-access-token': this.props.TOKEN
            },
            onDownloadProgress: (e) => {
                this.setState({
                    progreso: Math.round(e.loaded * 100) / e.total
                })
            }
        })
        this.tablaRef = React.createRef();
    }
    componentDidMount() {
        this.getSecciones();
    }
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
    getSecciones = async () => {
        const secciones = await (await this.api.get('seccion/detalle')).data;
        this.setState({ secciones })
    }
    onInput = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    onInputIcono = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            exists_icono: this.state.iconData.indexOf(e.target.value) > 0
        });
    }
    registrar = async () => {
        const seccion = {
            seccion: this.state.seccion,
            descripcion: this.state.seccion,
            icono: this.state.icono
        }
        const resp = await (await this.api.post('seccion', seccion)).data;
        await this.getSecciones();
        console.log(resp);
        this.notifycorrecto('Registro correcto, felicidades', 'success');
        this.setState({ exists_icono: false, seccion: '', icono: '' })
    }
    render() {
        return (
            <Fragment>
                <PageTitle
                    heading="Administracion de secciones"
                    subheading="Puede agregar nuevas secciones, y consultar sobre la cantidad de noticias que pertenecen a cada seccion registrada."
                    icon="pe-7s-user text-primary"
                />
                <Paper className='p-3 mb-3'>
                    <Row>
                        <Col xl='6' lg='6' md='6'>
                            <FormGroup>
                                <Label for="inputseccion">Seccion</Label>
                                <Input
                                    id='inputseccion'
                                    bsSize='sm'
                                    className='form-control'
                                    type='text'
                                    name='seccion'
                                    value={this.state.seccion}
                                    onChange={this.onInput}
                                    placeholder='Escriba la seccion'
                                />
                                <FormText>Ejemplo: Riberalta</FormText>
                            </FormGroup>
                            <FormGroup>
                                <Label for="inputicono">Icono</Label>
                                <Input
                                    id='inputicono'
                                    bsSize='sm'
                                    name='icono'
                                    value={this.state.icono}
                                    onChange={this.onInputIcono}
                                    className='form-control'
                                    type='text'
                                    placeholder='Escriba el nombre del icono'
                                />
                                <FormText>Ejemplo: pe-7s-gym</FormText>
                            </FormGroup>
                            <FormGroup className='text-center'>
                                <Button disabled={(this.state.exists_icono && this.state.seccion) ? false : true} color='secondary' variant='contained' onClick={this.registrar} size='small'>Registrar</Button>
                            </FormGroup>
                            <FormGroup>
                                <Row>
                                    {this.state.icono && this.state.iconData.filter(icono => icono.indexOf(this.state.icono) >= 0).map(iconName => (
                                        <Col md="2" xs='4' sm='3' key={iconName}>
                                            <div className="font-icon-wrapper">
                                                <i className={iconName}> </i>
                                                <p>{iconName}</p>
                                            </div>
                                        </Col>
                                    ))}
                                </Row>
                            </FormGroup>

                        </Col>
                        <Col xl='6' lg='6' md='6'>
                            {this.state.secciones &&
                                <MaterialTable
                                    title='Secciones'
                                    tableRef={this.tablaRef}
                                    columns={[
                                        {
                                            title: 'ICON',
                                            field: 'icono',
                                            render: rowData =>
                                                <div className="font-icon-wrapper">
                                                    <i className={rowData.icono}> </i>
                                                    <p>{rowData.icono}</p>
                                                </div>
                                        },
                                        {
                                            title: 'SECCION',
                                            field: 'seccion'
                                        },
                                        {
                                            title: 'NOTICIAS',
                                            field: 'noticias',
                                            render: rowData => <div className='text-center'>{rowData.noticias > 0 ? rowData.noticias : ''}</div>
                                        },
                                        {
                                            title: 'ELIMINAR', field: 'noticias', render: rowData =>

                                                <IconButton
                                                    disabled={rowData.noticias > 0 ? true : false}
                                                    onClick={async (event) => {
                                                        await this.api.delete('seccion/' + rowData.idseccion);
                                                        this.getSecciones();
                                                    }}>
                                                    <DeleteIcon />
                                                </IconButton>


                                        }
                                    ]}
                                    data={this.state.secciones}
                                    options={{
                                        paging: false,
                                        headerStyle: {
                                            textAlign: 'center'
                                        }
                                    }}
                                />
                            }
                        </Col>
                    </Row>
                </Paper>
            </Fragment >
        )
    }
}
const mapStateToProps = state => ({
    API: state.ThemeOptions.API_REST,
    TOKEN: state.ThemeOptions.token
});

const mapDispatchToProps = dispatch => ({});
export default connect(mapStateToProps, mapDispatchToProps)(Seccion);