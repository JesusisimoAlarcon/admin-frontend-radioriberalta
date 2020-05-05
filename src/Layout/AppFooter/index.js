import React from 'react';
import './footer.scss'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import WhatsappIcon from '@material-ui/icons/WhatsApp';
import Instagram from '@material-ui/icons/Instagram';
import { Button } from '@material-ui/core';
import { Divider } from '@material-ui/core';
class AppFooter extends React.Component {
    render() {
        return (

            <footer className=''>
                <Divider
                    className='mb-2'
                //style={{ background: '#f50057' }} 
                />
                <div className='container pt-5'>
                    <div className='row'>
                        <div className='col-sm-6 col-md-6 col-lg-3 mb-5'>
                            <div className='footer-title'>
                                <h6>Nos encuentras</h6>
                            </div>
                            <div className='footer-content'>

                                <div className="app-header__logo">
                                    <div className="logo-src" />
                                </div>

                                <p><b>Direccion:</b> Barrio Base Aerea</p>
                                <p><b>Calle:</b> Av. Bernandino Ochoa</p>
                                <p><b>N°:</b> 1030</p>
                                <p>RIBERALTA - BENI -BOLIVIA</p>

                                <Button color='secondary' variant='contained' size='small'>Saber mas...</Button>
                            </div>
                        </div>
                        <div className='col-sm-6 col-md-6 col-lg-3 mb-5'>
                            <div className='footer-title'>
                                <h6>Secciones</h6>
                            </div>
                            <div className='footer-content'>
                                <ul className='list-group quick-links'>
                                    {this.props.SECCIONES.map(sec =>
                                        <li key={sec.id}>
                                            <Link to={`/${sec.label.toLowerCase()}`}>
                                                {sec.label}
                                            </Link>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>
                        <div className='col-sm-6 col-md-6 col-lg-3 mb-5'>
                            <div className='footer-title'>
                                <h6>Nuestra Radio</h6>
                            </div>
                            <div className='footer-content'>
                                <ul className='list-group quick-links'>
                                    <li>
                                        <Link to={`/quienes-somos`}>
                                            QUIENES SOMOS?
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={`/nuestros-servicios`}>
                                            NUESTROS SERVICIOS
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={`/nuestra-programacion`}>
                                            PROGRAMACION RADIAL
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className='col-sm-6 col-md-6 col-lg-3 mb-5'>
                            <div className='footer-title'>
                                <h6>Contactanos</h6>
                            </div>
                            <div className='footer-content'>
                                <p className='text-muted'>
                                    <b>Telefono Fijo:</b> 3-852 4014
                                </p>
                                <p className='text-muted'>
                                    <b>Celular:</b> 76873500
                                </p>
                                <p className='text-muted'>
                                    <b>Email:</b> radioriberalta@hotmail.com
                                </p>
                                <center>
                                    <div className='social-media mt-4'>
                                        <a href='!#' className='text-light'>

                                            <FacebookIcon color='secondary' className='mr-4' />

                                        </a>
                                        <a href='!#' className='text-light'>
                                            <TwitterIcon color='secondary' className='mr-4' />

                                        </a>
                                        <a href='!#' className='text-light'>
                                            <Instagram color='secondary' className='mr-4' />

                                        </a>
                                        <a href='!#' className='text-light'>
                                            <WhatsappIcon color='secondary' className='mr-4' />

                                        </a>
                                    </div>
                                </center>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='bottom-footer pt-3 pb-3 text-center mb-4'>
                    <small>© 2020 Radio Riberalta, todos los derechos reservados.</small>
                </div>
            </footer>

        )
    }
}
const mapStateToProps = state => ({
    //API: state.ThemeOptions.API_REST
    SECCIONES: state.ThemeOptions.secciones
});

const mapDispatchToProps = dispatch => ({});
export default connect(mapStateToProps, mapDispatchToProps)(AppFooter);