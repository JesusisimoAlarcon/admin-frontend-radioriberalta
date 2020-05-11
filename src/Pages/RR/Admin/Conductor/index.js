import React, { Component, Fragment } from 'react';
import PageTitle from '../../../../Layout/AppMain/PageTitle';
import { Row, Col, Button } from 'reactstrap';
import IconButton from '@material-ui/core/IconButton';
import MaterialTable from 'material-table';
import { connect } from 'react-redux';
import Axios from 'axios';
import ModalRegistro from './ModalRegistro';
import FacebookIcon from '@material-ui/icons/Facebook';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Avatar from '@material-ui/core/Avatar';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Paper, CircularProgress } from '@material-ui/core';
import {
    toast,
    Bounce
} from 'react-toastify';
class FormConductor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            progreso: 0,
            conductores: [],
            open: false,
            idconductor: 0,
        }
        this.tablaRef = React.createRef();
        this.registrar = this.registrar.bind(this);
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
    }
    componentDidMount() {
        this.getConductores();
    }
    getConductores = async () => {
        const conductores = await this.api.get('conductor');
        this.setState({
            conductores: conductores.data
        })
    }
    notifycorrecto = () => {
        this.toastId =
            toast("Registro correcto, su nombre y apellidos se han registrado como credenciales para el acceso a su cuenta en el sistema.", {
                transition: Bounce,
                closeButton: true,
                autoClose: 5000,
                position: 'bottom-center',
                type: 'success'
            });
    };
    registrar = async (conductor, foto) => {
        const dato = new FormData();
        dato.append('imagen', foto[0]);
        dato.append('conductor', JSON.stringify(conductor));
        const newconductor = await (await this.api.post('conductor/dump', dato)).data;
        const usuario = {
            username: conductor.nombres.toLowerCase().replace(/ /g, ""),
            password: conductor.apellidos.toLowerCase().replace(/ /g, ""),
            idconductor: newconductor.insertId,
            rol: 'CONDUCTOR',
            estado: true
        }
        await (await this.api.post('usuario', usuario)).data;
        await this.getConductores();
        this.notifycorrecto();
    }

    eliminar = () => {
        setTimeout(async () => {
            await this.api.delete('conductor/' + this.state.idconductor);
            this.getConductores();
            this.handleClose();
        }, 1000)

    }

    handleClose = () => {
        this.setState({
            open: false
        })
    };
    render() {
        return (
            <Fragment>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Estas seguro de eliminar este registro?"}</DialogTitle>

                    <DialogActions>
                        <Button onClick={this.handleClose} color="secondary">
                            Cancalar
                        </Button>
                        <Button onClick={this.eliminar} color="danger" autoFocus>
                            Si
                        </Button>
                    </DialogActions>
                </Dialog>
                <PageTitle
                    heading="Formulacion para el registro del conductor"
                    subheading="Ingrese los datos personales del conductor."
                    icon="pe-7s-user text-primary"
                />
                <ReactCSSTransitionGroup
                    component="div"
                    transitionName="TabsAnimation"
                    transitionAppear={true}
                    transitionAppearTimeout={0}
                    transitionEnter={false}
                    transitionLeave={false}>
                    <Row>
                        <Col>
                            <Paper
                                className='mb-4'
                            >
                                <ModalRegistro
                                    handleConductor={this.registrar}
                                />
                                {this.state.progreso < 100 ?
                                    <center>
                                        <CircularProgress
                                            className='m-5'
                                            color='secondary'
                                            size='5rem'
                                            variant='indeterminate'
                                            value={this.state.progreso}
                                        />
                                    </center>
                                    :
                                    <MaterialTable
                                        title='Conductores registrados'
                                        tableRef={this.tablaRef}
                                        columns={[
                                            {
                                                render: rowData =>
                                                    <div>
                                                        <IconButton>
                                                            <EditIcon />
                                                        </IconButton>
                                                        <IconButton
                                                            onClick={() =>
                                                                this.setState({
                                                                    idconductor: rowData.idconductor,
                                                                    open: true
                                                                })
                                                            }
                                                        >
                                                            <DeleteIcon
                                                            />
                                                        </IconButton>
                                                    </div>
                                            },
                                            {
                                                title: 'FOTOGRAFIA',
                                                field: 'FOTOGRAFIA',
                                                render: rowData => <center>
                                                    <Avatar
                                                        src={this.props.API + 'static/perfiles/' + rowData.fotografia}
                                                        style={{ width: 90, height: 90 }}
                                                    />
                                                </center>
                                            },
                                            {
                                                title: 'NOMBRES',
                                                field: 'nombres',
                                                render: rowData => <p>{rowData.nombres + ' ' + rowData.apellidos}</p>
                                            },
                                            {
                                                title: 'TELEFONO',
                                                field: 'telefono'
                                            },
                                            {
                                                title: 'CELULAR',
                                                field: 'celular'
                                            },
                                            {
                                                title: 'CORREO ELECTRONICO',
                                                field: 'correo'
                                            },
                                            {
                                                title: 'REDES SOCIALES',
                                                render: rowData =>
                                                    <p>
                                                        <small><FacebookIcon fontSize='small' />{rowData.facebook}</small>
                                                        <small><WhatsAppIcon fontSize='small' />{rowData.whatsapp}</small><br />
                                                        <small><TwitterIcon fontSize='small' />{rowData.twiter}</small>
                                                        <small><InstagramIcon fontSize='small' />{rowData.instagram}</small>
                                                    </p>
                                            }
                                        ]
                                        }
                                        data={this.state.conductores}
                                        options={{
                                            paging: false,
                                            headerStyle: {
                                                //backgroundColor: '#01579b',
                                                //color: '#FFF',
                                                textAlign: 'center'
                                            }
                                        }}

                                    />
                                }
                            </Paper>
                        </Col>
                    </Row>
                </ReactCSSTransitionGroup >
            </Fragment>

        )
    }
}
const mapStateToProps = state => ({
    API: state.ThemeOptions.API_REST,
    TOKEN: state.ThemeOptions.token
});

const mapDispatchToProps = dispatch => ({});
export default connect(mapStateToProps, mapDispatchToProps)(FormConductor);