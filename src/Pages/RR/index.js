import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import AppHeader from '../../Layout/AppHeader';
import AppSidebar from '../../Layout/AppSidebar';

import Conductor from './Admin/Conductor';
import Programa from './Admin/Programa';
import Programacion2 from './Admin/Programacion';
import FormNoticia from './Admin/Noticia';
import Noticia from './Admin/Noticia2';
import ListNoticias from './Admin/NoticiasList';
import Admin from './Admin';
import Usuario from './Admin/Usuario';
import Seccion from './Admin/Seccion';
import Configuracion from './Admin/Configuracion';
import Extras from './Admin/Extras';
import Perfil from './Admin/Perfil';
const RR = ({ match }) => {
    return (
        <Fragment>
            <AppHeader />
            <div className="app-main">
                <AppSidebar />
                <div className="app-main__outer">
                    <div className="app-main__inner">
                        <Switch>
                            {/* Administracion */}
                            <Route exact path={`${match.url}`} component={Admin} />
                            {/* Administracion noticias */}
                            <Route path={`${match.url}/registrar-noticia`} component={FormNoticia} />
                            <Route path={`${match.url}/registrar-noticia2/:id`} component={Noticia} />
                            <Route path={`${match.url}/listar-noticias`} component={ListNoticias} />
                            {/* Administracion programacion */}
                            <Route path={`${match.url}/programa`} component={Programa} />
                            <Route path={`${match.url}/conductor`} component={Conductor} />
                            <Route path={`${match.url}/programacion`} component={Programacion2} />


                            <Route path={`${match.url}/usuarios`} component={Usuario} />
                            <Route path={`${match.url}/confignoticia`} component={Configuracion} />
                            <Route path={`${match.url}/secciones`} component={Seccion} />
                            <Route path={`${match.url}/extras`} component={Extras} />
                            <Route path={`${match.url}/perfil`} component={Perfil} />
                        </Switch>
                    </div>
                </div>
            </div>
        </Fragment>
    )
};
export default (RR);