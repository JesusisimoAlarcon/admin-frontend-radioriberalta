import React, { Fragment, Component } from 'react'
import { connect } from 'react-redux';
import {
    Card, CardBody, Row, Col,
    FormGroup, Input
} from 'reactstrap';
import PageTitle from '../../../../Layout/AppMain/PageTitle';
import MaterialTable from 'material-table'
import ModalRegistro from './modalRegistro';

import axios from 'axios';
import { TextareaAutosize } from '@material-ui/core';
//import avatar from '../../../assets/utils/images/avatars/11.jpg'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Link } from 'react-router-dom';
class FormPrograma extends Component {

    constructor(props) {
        super(props);
        this.state = {
            programas: [],
            generos: []
        }
        this.tableRef = React.createRef();
    }

    componentDidMount() {
        this.getDatos();
    }

    getDatos = async () => {

        const list_programas = await axios.get(this.props.API + 'programa/detalle');
        this.setState({
            programas: list_programas.data
        })

        const list_generos = await axios.get(this.props.API + 'genero');
        this.setState({
            generos: list_generos.data
        })
    }

    recargar = async (nombre, descripcion, genero) => {
        const newPrograma = {
            programa: nombre,
            descripcion: descripcion,
            idgenero: genero
        }
        await axios.post(this.props.API + 'programa', newPrograma);
        this.getDatos();
    }

    render() {
        return (
            <Fragment>
                <PageTitle
                    heading="Formulacion para el registro programa radial"
                    subheading="Ingrese los datos correspondientes para la creacion y publicacion de su programa radial."
                    icon="pe-7s-radio text-primary"
                />
                <Link to='/admin/programa' replace>TEST</Link>
                <ReactCSSTransitionGroup
                    component="div"
                    transitionName="TabsAnimation"
                    transitionAppear={true}
                    transitionAppearTimeout={0}
                    transitionEnter={false}
                    transitionLeave={false}>
                    <Row>
                        <Col md="12">
                            <Card className="main-card mb-3">
                                <CardBody>
                                    <FormGroup>
                                        <ModalRegistro
                                            handleList={this.recargar}
                                            api={this.props.API}
                                            generos={this.state.generos}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <MaterialTable
                                            title="Programas registrados"
                                            tableRef={this.tableRef}
                                            columns={[
                                                {
                                                    title: 'GENERO',
                                                    field: 'genero',

                                                    editComponent: props => (
                                                        <Input type="select" bsSize="sm"
                                                            onChange={e => props.onChange(e.target.value)}>
                                                            <option>Seleccion un genero...</option>
                                                            {this.state.generos.map(genero =>
                                                                <option key={genero.idgenero} value={genero.idgenero}>{genero.genero}</option>
                                                            )}
                                                        </Input>
                                                    ),
                                                    render: rowData => (
                                                        <small><i className={rowData.icono + ' pe-2x pe-spin mr-3'}></i>{rowData.genero}</small>
                                                    )
                                                },
                                                { title: 'PROGRAMA', field: 'programa' },
                                                {
                                                    title: 'DESCRIPCION', field: 'descripcion', editComponent: props => (
                                                        <TextareaAutosize
                                                            className='form-control'
                                                            value={props.value}
                                                            onChange={e => props.onChange(e.target.value)}
                                                        />
                                                    )
                                                },
                                            ]}
                                            data={this.state.programas}
                                            options={{
                                                search: true,
                                                paging: false
                                            }}
                                            editable={{
                                                onRowUpdate: (newData, oldData) =>
                                                    new Promise((resolve, reject) => {
                                                        setTimeout(async () => {
                                                            await axios.put(this.props.API + 'programa/' + oldData.idprograma, {
                                                                idgenero: newData.genero,
                                                                programa: newData.programa,
                                                                descripcion: newData.descripcion
                                                            });
                                                            this.getDatos();
                                                            resolve()
                                                        }, 1000)
                                                    }),
                                                onRowDelete: oldData =>
                                                    new Promise((resolve, reject) => {
                                                        setTimeout(async () => {
                                                            await axios.delete(this.props.API + 'programa/' + oldData.idprograma);
                                                            this.getDatos();
                                                            resolve()
                                                        }, 1000)
                                                    })
                                            }}
                                        />
                                    </FormGroup>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </ReactCSSTransitionGroup>
            </Fragment>
        )
    }
}
const mapStateToProps = state => ({
    API: state.ThemeOptions.API_REST
});

const mapDispatchToProps = dispatch => ({});
export default connect(mapStateToProps, mapDispatchToProps)(FormPrograma);