import React, { Component, Fragment } from 'react';
import PageTitle from '../../../../Layout/AppMain/PageTitle';
import { Paper, Button } from '@material-ui/core';
import { Row, Col, FormGroup, Input, Label, FormText } from 'reactstrap';
import Axios from 'axios';
import { connect } from 'react-redux';
import {
    toast,
    Bounce
} from 'react-toastify';
class Configuracion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            config: ''
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
        this.getConfig();
    }
    getConfig = async () => {
        const config = await (await this.api.get('configuracion')).data[0];
        this.setState({ config });
    }
    onInputChange = (e) => {
        let config = this.state.config;
        config[`${e.target.name}`] = e.target.value;
        this.setState({ config });
    }
    actualizar = async () => {
        const resp = await (await this.api.put('configuracion/1', this.state.config)).data;
        if (resp.changedRows)
            this.notifycorrecto('Actualizacion realizada de forma correcta', 'success');
        else
            this.notifycorrecto('Error al realizar la actualizacion', 'error');
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
    onVerificarCampos = (config) => {
        let bandera = true;
        for (const prop in config) {
            if (!config[prop]) {
                bandera = false;
                break;
            }
        }
        return bandera;
    }
    render() {
        return (
            <Fragment>
                <PageTitle
                    heading="Configuracion de los datos de las noticias"
                    subheading="Puede cambiar los tamaños de las principales propiedades de una noticia"
                    icon="pe-7s-user text-primary"
                />
                {this.state.config &&
                    <Paper className='p-3 mb-3'>
                        <Row>
                            <Col lg='3'>
                            </Col>
                            <Col lg='6'>
                                <FormGroup className='text-center m-3'>
                                    <Label>CONFIGURACION DE LA NOTICIA</Label>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="inputtitulo">Tamaño del Titulo</Label>
                                    <Input
                                        id='inputtitulo'
                                        bsSize='sm'
                                        className='form-control'
                                        type='text'
                                        name='tam_titulo_noticia'
                                        value={this.state.config.tam_titulo_noticia}
                                        onChange={this.onInputChange}
                                        placeholder='Escriba el tamaño'
                                    />
                                    <FormText>Ejemplo: 100</FormText>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="inputsubtitulo">Tamaño del Subtitulo</Label>
                                    <Input
                                        id='inputsubtitulo'
                                        bsSize='sm'
                                        className='form-control'
                                        type='text'
                                        name='tam_subtitulo_noticia'
                                        value={this.state.config.tam_subtitulo_noticia}
                                        onChange={this.onInputChange}
                                        placeholder='Escriba el tamaño'
                                    />
                                    <FormText>Ejemplo: 100</FormText>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="inputcontenido">Tamaño del Contenido</Label>
                                    <Input
                                        id='inputcontenido'
                                        bsSize='sm'
                                        className='form-control'
                                        type='text'
                                        name='tam_contenido_noticia'
                                        value={this.state.config.tam_contenido_noticia}
                                        onChange={this.onInputChange}
                                        placeholder='Escriba el tamaño'
                                    />
                                    <FormText>Ejemplo: 100</FormText>
                                </FormGroup>
                                <FormGroup className='text-center'>
                                    <Button color='secondary' variant='contained' onClick={this.actualizar} disabled={!this.onVerificarCampos(this.state.config)} size='small'>ACTUALIZAR</Button>
                                </FormGroup>
                            </Col>
                            <Col lg='3'>
                            </Col>
                        </Row>
                    </Paper>
                }
            </Fragment>
        )
    }
}
const mapStateToProps = state => ({
    API: state.ThemeOptions.API_REST,
    TOKEN: state.ThemeOptions.token
});

const mapDispatchToProps = dispatch => ({});
export default connect(mapStateToProps, mapDispatchToProps)(Configuracion);