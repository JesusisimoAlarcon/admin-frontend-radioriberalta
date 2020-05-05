import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import AppHeader from '../../Layout/AppHeader';
import AppSidebar from '../../Layout/AppSidebar';
import { connect } from 'react-redux';

import Conductor from './Admin/Conductor';
import Programa from './Admin/Programa';
import Programacion2 from './Admin/Programacion';
import FormNoticia from './Admin/Noticia';
import ListNoticias from './Admin/NoticiasList';
import Admin from './Admin';
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
                            <Route exact path={`/admin/`} component={Admin} />
                            {/* Administracion noticias */}
                            <Route path={`/admin/registrar-noticia`} component={FormNoticia} />
                            <Route path={`/admin/listar-noticias`} component={ListNoticias} />
                            {/* Administracion programacion */}
                            <Route path={`/admin/programa`} component={Programa} />
                            <Route path={`/admin/conductor`} component={Conductor} />
                            <Route path={`/admin/programacion`} component={Programacion2} />
                        </Switch>
                    </div>
                </div>
            </div>
        </Fragment>
    )
};
const mapStateToProps = state => ({
    SECCIONES: state.ThemeOptions.secciones
});
const mapDispatchToProps = dispatch => ({});
export default connect(mapStateToProps, mapDispatchToProps)(RR);