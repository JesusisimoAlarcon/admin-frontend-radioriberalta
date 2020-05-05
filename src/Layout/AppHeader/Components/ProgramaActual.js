import React, { Component } from 'react'
import { connect } from 'react-redux';
//import * as moment from 'moment';
class ProgramaActual extends Component {

    render() {
        return (
            this.props.PROGRAMAACTUAL &&
            <div className="ml-1 mr-2">
                <div className="widget-heading">
                    {this.props.PROGRAMAACTUAL && this.props.PROGRAMAACTUAL.programa}
                </div>
                <div className="widget-subheading">
                    <span>{this.props.PROGRAMAACTUAL && this.props.PROGRAMAACTUAL.nombres + ' ' + this.props.PROGRAMAACTUAL.apellidos}</span>
                </div>
            </div>

        )
    }
}
const mapStateToProps = state => ({
    //API: state.ThemeOptions.API_REST,
    //PROGRAMACION: state.ThemeOptions.programacion,
    PROGRAMAACTUAL: state.ThemeOptions.programaactual
});

const mapDispatchToProps = dispatch => ({});
export default connect(mapStateToProps, mapDispatchToProps)(ProgramaActual);