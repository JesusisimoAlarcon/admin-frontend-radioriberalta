import React, { Fragment, Component } from 'react'
import { connect } from 'react-redux';
import {
    Card, CardBody, Row, Col,
    FormGroup, Input
} from 'reactstrap';
import PageTitle from '../../../../Layout/AppMain/PageTitle';
import MaterialTable from 'material-table'
import ModalRegistro from './modalRegistro';
import Axios from 'axios';
import { TextareaAutosize } from '@material-ui/core';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
class FormPrograma extends Component {

    constructor(props) {
        super(props);
        this.state = {
            programas: [],
            generos: []
        }
        this.tableRef = React.createRef();
        this.api = Axios.create({
            baseURL: this.props.API,
            headers: { 'x-access-token': this.props.TOKEN }
        })
    }

    componentDidMount() {
        this.getDatos();
    }

    getDatos = async () => {

        const list_programas = await this.api.get('programa/detalle');
        this.setState({
            programas: list_programas.data
        })

        const list_generos = await this.api.get('genero');
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
        await this.api.post('programa', newPrograma);
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
                                                            await this.api.put('programa/' + oldData.idprograma, {
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
                                                            await this.api.delete('programa/' + oldData.idprograma);
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
    API: state.ThemeOptions.API_REST,
    TOKEN: state.ThemeOptions.token
});

const mapDispatchToProps = dispatch => ({});
export default connect(mapStateToProps, mapDispatchToProps)(FormPrograma);