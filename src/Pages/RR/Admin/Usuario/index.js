import React, { Component, Fragment } from 'react';
import PageTitle from '../../../../Layout/AppMain/PageTitle';
import Axios from 'axios';
import MaterialTable from 'material-table';
import { connect } from 'react-redux';
import { Paper, Switch, Chip, Avatar } from '@material-ui/core';
class Usuario extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usuarios: '',
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
        });
        this.tablaRef = React.createRef();
        this.getUsuarios();
    }

    getUsuarios = async () => {
        let usuarios = await (await this.api.get('usuario')).data;
        usuarios = usuarios.filter(usuario => { return usuario.rol !== 'ADMINISTRADOR' });
        this.setState({ usuarios });
    }
    render() {
        return (
            <Fragment>
                <PageTitle
                    heading="Usuarios registrados en la base de datos"
                    subheading="Como administrador usted puede eliminar o dar de baja a los usuarios del sistema."
                    icon="pe-7s-user text-primary"
                />
                <Paper className='mb-4'>
                    {this.state.usuarios &&
                        <MaterialTable
                            title='Usuarios registrados'
                            tableRef={this.tablaRef}
                            columns={[
                                {
                                    title: 'USUARIO',
                                    field: 'usuario',
                                    render: rowData =>

                                        <Chip
                                            variant='outlined'
                                            avatar={<Avatar
                                                src={this.props.API + 'static/perfiles/' + rowData.fotografia}
                                            />} label={rowData.nombres + ' ' + rowData.apellidos} />
                                },
                                {
                                    title: 'NOMBRE DE USUARIO',
                                    field: 'username'
                                },
                                {
                                    title: 'ROL',
                                    field: 'rol'
                                },
                                {
                                    title: 'ESTADO',
                                    field: 'estado',
                                    render: rowData =>
                                        <div>
                                            <Switch
                                                checked={rowData.estado === 1 ? true : false}
                                                onChange={async (event) => {
                                                    await this.api.put('usuario/' + rowData.idusuario, {
                                                        estado: !rowData.estado
                                                    });
                                                    this.getUsuarios();
                                                }}
                                            />
                                        </div>
                                }
                            ]}
                            data={this.state.usuarios}
                            options={{
                                paging: false
                            }}
                            editable={{
                                onRowDelete: oldData =>
                                    new Promise((resolve, reject) => {
                                        setTimeout(async () => {
                                            await this.api.delete('usuario/' + oldData.idusuario);
                                            this.getUsuarios();
                                            resolve();
                                        }, 1000)
                                    })
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
export default connect(mapStateToProps, mapDispatchToProps)(Usuario);