import React, { Component, Fragment } from 'react'
import { Paper, Grid, Avatar, Typography } from '@material-ui/core'
import Axios from 'axios';
import bolivia from '../../assets/utils/images/banderas/bolivia.png';
//import logocasa from '../../assets/utils/images/banderas/logo_casa.png';
import { Row, Col } from 'reactstrap';
//import { Link } from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
export default class CabeceraInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            datosoficiales: [],
            contadorbolivia: {},
            beni: {},
            contadorbeni: {}
        }
    }

    componentDidMount = async () => {
        const resp = await Axios.get('https://boliviasegura.agetic.gob.bo/wp-content/json/api.php');
        this.setState({
            datosoficiales: resp.data,
            contadorbolivia: resp.data.contador,
            beni: resp.data.departamento.bn,
            contadorbeni: resp.data.departamento.bn.contador
        })
        //console.log(this.state.datosoficiales)
    }
    render() {
        return (
            <Fragment>

                <ReactCSSTransitionGroup
                    component="div"
                    transitionName="TabsAnimation"
                    transitionAppear={true}
                    transitionAppearTimeout={0}
                    transitionEnter={false}
                    transitionLeave={false}>
                    {this.state.datosoficiales &&
                        <Paper style={{ background: '#f50057', color: 'white', fontWeight: 'bold' }} elevation={1} className='p-1 pb-0 mb-3'>

                            <Typography className='text-center' variant='h1' style={{
                                fontSize: '1.2rem',
                                //fontFamily: 'PlayfairDisplay-Bold',
                                lineHeight: '2.4rem',
                                fontWeight: 'bold'
                            }}>
                                COVID-19 BOLIVIA - BENI
                            </Typography>
                            <Row>
                                <Col lg='6' md='6' sm='12'>
                                    <Grid
                                        container
                                        direction="row"
                                        justify="space-evenly"
                                        spacing={1}
                                        alignItems="center"
                                    >

                                        <Grid item>
                                            <Paper className='text-center pt-2' style={{
                                                width: 100
                                            }}>
                                                <h4 style={{ color: 'red' }}><b>{this.state.contadorbolivia.confirmados}</b></h4>
                                                <center>
                                                    <Avatar style={{ width: '20px', height: '10px' }} variant='square' src={bolivia} />
                                                </center>
                                                <small><b>Casos</b></small>
                                                <small><p><b>Confirmados</b></p></small>
                                            </Paper>
                                        </Grid>

                                        <Grid item>
                                            <Paper className='text-center pt-2' style={{
                                                width: 100
                                            }}>
                                                <h4 style={{ color: '#009688' }}><b>{this.state.contadorbolivia.recuperados}</b></h4>
                                                <center>
                                                    <Avatar style={{ width: '20px', height: '10px' }} variant='square' src={bolivia} />
                                                </center>
                                                <small><b>Casos</b></small>
                                                <small><p><b>Recuperados</b></p></small>
                                            </Paper>
                                        </Grid>
                                        <Grid item>
                                            <Paper className='text-center pt-2' style={{
                                                width: 100
                                            }}>
                                                <h4 style={{ color: 'black' }}><b>{this.state.contadorbolivia.decesos}</b></h4>
                                                <center>
                                                    <Avatar style={{ width: '20px', height: '10px' }} variant='square' src={bolivia} />
                                                </center>
                                                <small><b>Casos</b></small>
                                                <small><p><b>Decesos</b></p></small>
                                            </Paper>
                                        </Grid>
                                    </Grid>
                                </Col>
                                <Col lg='6' md='6' sm='12'>
                                    <Grid
                                        container
                                        direction="row"
                                        justify="space-evenly"
                                        spacing={1}
                                        alignItems="center"
                                    >

                                        <Grid item>
                                            <Paper className='text-center pt-2' style={{
                                                width: 100
                                            }}>
                                                <h3 style={{ color: 'red' }}><b>{this.state.contadorbeni.confirmados}</b></h3>
                                                <center>
                                                    <Avatar style={{ width: '20px', height: '10px', color: 'green', background: 'green' }} variant='square' src={null} />
                                                </center>
                                                <small><b>Casos</b></small>
                                                <small><p><b>Confirmados</b></p></small>
                                            </Paper>
                                        </Grid>

                                        <Grid item>
                                            <Paper className='text-center pt-2' style={{
                                                width: 100
                                            }}>
                                                <h3 style={{ color: '#009688' }}><b>{this.state.contadorbeni.recuperados}</b></h3>
                                                <center>
                                                    <Avatar style={{ width: '20px', height: '10px', color: 'green', background: 'green' }} variant='square' src={null} />
                                                </center>
                                                <small><b>Casos</b></small>
                                                <small><p><b>Recuperados</b></p></small>
                                            </Paper>
                                        </Grid>
                                        <Grid item>
                                            <Paper className='text-center pt-2' style={{
                                                width: 100
                                            }}>
                                                <h3 style={{ color: 'black' }}><b>{this.state.contadorbeni.decesos}</b></h3>
                                                <center>
                                                    <Avatar style={{ width: '20px', height: '10px', color: 'green', background: 'green' }} variant='square' src={null} />
                                                </center>
                                                <small><b>Casos</b></small>
                                                <small><p><b>Decesos</b></p></small>
                                            </Paper>
                                        </Grid>
                                    </Grid>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg='4'>
                                </Col>
                                <Col lg='4' sm='6'>
                                    <Typography variant="caption" display="block" className='text-center'>
                                        Actualizado: {this.state.datosoficiales.fecha}
                                    </Typography>
                                </Col>
                                <Col lg='4' sm='6'>
                                    <Typography variant="caption" display="block" className='text-center'>
                                        Fuente: <a target='_blank' style={{ color: 'white' }} rel='noopener noreferrer' href="https://www.boliviasegura.gob.bo/">www.boliviasegura.gob.bo</a>
                                    </Typography>
                                </Col>
                            </Row>
                        </Paper>
                    }

                </ReactCSSTransitionGroup>


            </Fragment>
        )
    }
}
