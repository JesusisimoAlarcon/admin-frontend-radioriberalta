import React, { Component, Fragment } from 'react'
import PageTitle from '../../../../Layout/AppMain/PageTitle'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import MaterialTable from 'material-table'
import { connect } from 'react-redux';
import {
    FormGroup
} from 'reactstrap';
import ModalRegistro from './modalRegistro'
import Axios from 'axios'
import { format } from 'date-fns/esm';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import { Chip, Switch } from '@material-ui/core';
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={0}>{children}</Box>}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};
function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}

class FormProgramacion extends Component {


    constructor(props) {
        super(props);
        this.state = {
            programacion: [],
            tab: 0,
            dias: [
                'Domingo',
                'Lunes',
                'Martes',
                'Miercoles',
                'Jueves',
                'Viernes',
                'Sabado'
            ],
            hoy: new Date().getDay()
        }
        this.getDatos();
        /*
        this.setState({
            tab: this.state.dias.indexOf(this.state.hoy)
        })
        */
    }

    recargar = async (diasemana, horainicio, horafin, idconductor, idprograma) => {
        const programacion = {
            diasemana: diasemana,
            horainicio: format(horainicio, 'HH:mm:ss'),
            horafin: format(horafin, 'HH:mm:ss'),
            idconductor: idconductor,
            idprograma: idprograma,
            estado: true
        }
        console.log(programacion)
        await Axios.post(this.props.API + 'programacion', programacion);
        this.getDatos();
        this.setState({
            tab: this.state.dias.indexOf(diasemana)
        })
    }

    getDatos = async () => {

        const list_programacion = await Axios.get(this.props.API + 'programacion/detalle');
        this.setState({
            programacion: list_programacion.data
        })
    }

    render() {
        return (
            <Fragment>
                <PageTitle
                    heading="Lista de programacion registra"
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
                    <FormGroup>
                        <ModalRegistro
                            handleList={this.recargar}
                            API={this.props.API}
                        />
                    </FormGroup>

                    <Paper square className='mb-3'>
                        <Tabs
                            value={this.state.tab}
                            indicatorColor="secondary"
                            textColor="primary"
                            variant="scrollable"
                            scrollButtons="on"
                            onChange={(event, tab) => {
                                this.setState({
                                    tab
                                })
                            }}
                            //  centered
                            aria-label="disabled tabs example"
                        >
                            {this.state.dias.map((dia, index) =>
                                <Tab key={index} label={dia} {...a11yProps(index)} />
                            )}
                        </Tabs>
                        <TabPanel value={this.state.tab} index={this.state.tab}>
                            <MaterialTable
                                //title={'Programacion ' + this.state.dias[this.state.tab]}
                                columns={[
                                    { title: 'HORA INICIO', field: 'horainicio' },
                                    { title: 'HORA FIN', field: 'horafin' },
                                    { title: 'DIA DE LA SEMANA', field: 'diasemana' },

                                    {
                                        title: 'GENERO', field: 'GENERO', render: rowData => (
                                            <small><i className={rowData.icono + ' pe-2x pe-spin mr-3'}></i>{rowData.genero}</small>
                                        )
                                    },
                                    {
                                        title: 'PROGRAMA',
                                        field: 'programa'
                                    },
                                    {
                                        title: 'CONDUCTOR',
                                        field: 'CONDUCTOR',
                                        render: rowData => <div>
                                            <Chip
                                                variant='outlined'

                                                avatar={<Avatar

                                                    src={this.props.API + 'static/perfiles/' + rowData.fotografia}
                                                />} label={rowData.nombres + ' ' + rowData.apellidos} />
                                        </div>
                                    },
                                    {
                                        title: 'ESTADO', field: 'estado', render: rowData =>
                                            <div>
                                                <Switch
                                                    checked={rowData.estado === 1 ? true : false}
                                                    onChange={async (event) => {
                                                        await Axios.put(this.props.API + 'programacion/' + rowData.idprogramacion, {
                                                            estado: !rowData.estado
                                                        });
                                                        this.getDatos();
                                                        this.setState({
                                                            tab: this.state.dias.indexOf(rowData.diasemana)
                                                        })
                                                    }
                                                    }
                                                />
                                            </div>
                                    }
                                ]}
                                data={this.state.programacion.filter((programa) => {
                                    return programa.diasemana === this.state.dias[this.state.tab]
                                })}
                                options={{
                                    search: true,
                                    paging: false
                                }}
                                editable={{
                                    onRowDelete: oldData =>
                                        new Promise((resolve, reject) => {
                                            setTimeout(async () => {
                                                await Axios.delete(this.props.API + 'programacion/' + oldData.idprogramacion);
                                                this.getDatos();
                                                resolve()
                                            }, 1000)
                                        })
                                }}
                            />
                        </TabPanel>


                    </Paper>

                </ReactCSSTransitionGroup>
            </Fragment>
        )
    }
}
const mapStateToProps = state => ({
    API: state.ThemeOptions.API_REST
});

const mapDispatchToProps = dispatch => ({});
export default connect(mapStateToProps, mapDispatchToProps)(FormProgramacion);