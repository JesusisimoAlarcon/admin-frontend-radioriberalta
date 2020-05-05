import React, { Component, Fragment } from 'react'
import PageTitle from '../../../../Layout/AppMain/PageTitle'
import { Row, Col, Card, CardBody, FormGroup, Button } from 'reactstrap'
import IconButton from '@material-ui/core/IconButton'
import MaterialTable from 'material-table'
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
import axios from 'axios';

//import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';

import DialogTitle from '@material-ui/core/DialogTitle';
///import avatar from '../../../assets/utils/images/avatars/10.jpg'
class FormConductor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            conductores: [],
            open: false,
            idconductor: 0,
        }
        this.tablaRef = React.createRef()
        this.registrar = this.registrar.bind(this);
    }
    componentDidMount() {
        this.getConductores();
    }
    getConductores = async () => {
        const conductores = await Axios.get(this.props.API + 'conductor');
        this.setState({
            conductores: conductores.data
        })
    }

    registrar = async (programa, foto) => {
        const dato = new FormData();
        dato.append('imagen', foto[0]);
        fetch(this.props.API + 'conductor/fotografia', {
            method: 'post',
            body: dato
        }).then((response) => {
            return response.json()
        }).then(async (response) => {
            console.log(response)
            programa.fotografia = response.imagen
            const resp = await Axios.post(this.props.API + 'conductor', programa);
            console.log(resp)
            this.getConductores();
        })
    }



    eliminar = () => {
        //alert(rowData.idconductor);
        setTimeout(async () => {
            await axios.delete(this.props.API + 'conductor/' + this.state.idconductor);
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
                            <Card>
                                <CardBody>
                                    <FormGroup>
                                        <ModalRegistro
                                            handleConductor={this.registrar}
                                        />
                                    </FormGroup>
                                    <FormGroup>
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
                                    </FormGroup>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </ReactCSSTransitionGroup >
            </Fragment>

        )
    }
}
const mapStateToProps = state => ({
    API: state.ThemeOptions.API_REST
});

const mapDispatchToProps = dispatch => ({});
export default connect(mapStateToProps, mapDispatchToProps)(FormConductor);