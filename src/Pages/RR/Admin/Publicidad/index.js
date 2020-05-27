import React, { Component, Fragment } from 'react'
import PageTitle from '../../../../Layout/AppMain/PageTitle';
import { Paper, Avatar, Switch } from '@material-ui/core';
import MaterialTable from 'material-table';
import { connect } from 'react-redux';
import Axios from 'axios';
import { format } from 'date-fns';
import esLocale from 'date-fns/locale/es';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import ModalRegistro from './ModalRegistro'
import { formatDistanceStrict } from 'date-fns';
import {
    toast,
    Bounce
} from 'react-toastify';
import ReactPlayer from 'react-player';
class Publicidad extends Component {
    constructor(props) {
        super(props);
        this.state = {
            publicidades: '',
            progreso: 0
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
        this.getPublicidades();
    }
    getPublicidades = async () => {
        const publicidades = await (await this.api.get('publicidad')).data;
        this.setState({ publicidades })
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
                <PageTitle
                    heading="Registro de publicidad"
                    subheading="Puede ver los registros publicitarios realizados para su publicacion en la pagina web."
                    icon="pe-7s-user text-primary"
                />
                <Paper className='mb-3'>
                    <ModalRegistro
                        confirmarRegistro={this.getPublicidades}
                    />
                    {this.state.publicidades &&
                        <MaterialTable
                            title='Publicidades'
                            tableRef={this.tablaRef}
                            columns={[
                                {
                                    title: 'CLIENTE',
                                    field: 'cliente'
                                },
                                {
                                    title: 'TIPO',
                                    field: 'tipo'
                                },
                                {
                                    title: 'PUBLICIDAD',
                                    field: 'publicidad',
                                    render: rowData =>
                                        <center>
                                            {rowData.tipo === 'image' ?
                                                <Avatar
                                                    src={this.props.API + 'static/publicidad/' + rowData.publicidad}
                                                    variant='rounded'
                                                    style={{ width: 160, height: 90 }}
                                                />
                                                :
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
                                                        url={rowData.publicidad}
                                                        width='100%'
                                                        height='100%'
                                                    />
                                                </div>}

                                        </center>
                                },
                                {
                                    title: 'FECHA INICIO',
                                    field: 'fecha',
                                    render: rowData =>
                                        <div>
                                            <CalendarTodayIcon style={{ fontSize: 15 }} />{" "}<small>{format(new Date(rowData.fecha_inicio), 'dd MMMM yyyy - HH:mm:ss', { locale: esLocale })}</small>
                                        </div>
                                },
                                {
                                    title: 'FECHA FIN',
                                    field: 'fecha_fin',
                                    render: rowData =>
                                        <div>
                                            <CalendarTodayIcon style={{ fontSize: 15 }} />{" "}<small>{format(new Date(rowData.fecha_fin), 'dd MMMM yyyy - HH:mm:ss', { locale: esLocale })}</small>
                                        </div>
                                },
                                {
                                    title: 'CONCLUYE',
                                    field: 'tiempo',
                                    render: rowData =>
                                        <small>{formatDistanceStrict(new Date(rowData.fecha_fin), new Date(), { locale: esLocale, includeSeconds: true, addSuffix: true })}</small>
                                },
                                {
                                    title: 'PAGINA WEB',
                                    field: 'paginaweb',
                                    render: rowData =>
                                        <a href={'https://' + rowData.paginaweb} rel='noopener noreferrer' target='_blank'>
                                            {rowData.paginaweb}
                                        </a>
                                },
                                {
                                    title: 'ESTADO',
                                    field: 'estado',
                                    render: rowData =>
                                        <div>
                                            <Switch
                                                checked={rowData.estado === 1 ? true : false}
                                                onChange={async (event) => {
                                                    await this.api.put('publicidad/' + rowData.idpublicidad, {
                                                        estado: !rowData.estado
                                                    });
                                                    this.notify(!rowData.estado ? 'La publicidad volvera a presentarse en la pagina' : 'La publicidad se quito de la pagina', !rowData.estado ? 'success' : 'warning');
                                                    this.getPublicidades();
                                                }}
                                            />
                                        </div>
                                }
                            ]}
                            data={this.state.publicidades}
                            options={{
                                paging: false,
                                headerStyle: {
                                    textAlign: 'center'
                                }
                            }}
                        />
                    }
                </Paper>
            </Fragment>
        )
    }
}
const mapStateToProps = state => ({
    API: state.ThemeOptions.API_REST,
    TOKEN: state.ThemeOptions.token
});

const mapDispatchToProps = dispatch => ({});
export default connect(mapStateToProps, mapDispatchToProps)(Publicidad);