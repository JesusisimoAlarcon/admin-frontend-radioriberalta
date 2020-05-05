import React, { Fragment } from 'react';

import cx from 'classnames';
import { withRouter } from 'react-router-dom';
//import { Input } from 'reactstrap'
class SearchBox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeSearch: false,
            focus: false,
            texto: ''
        };
    }

    render() {
        return (
            <Fragment>
                <div className={cx("search-wrapper", {
                    'active': this.state.activeSearch
                })}>

                    <div className="input-holder">
                        <input
                            placeholder='Buscar'
                            onChange={(event) => this.setState({ texto: event.target.value })}
                            autoFocus={this.state.focus}
                            type="text"
                            className="search-input" />

                        <button onClick={
                            () => {
                                this.state.activeSearch && this.state.texto.length > 0 ?
                                    this.props.history.push('/search/' + this.state.texto)
                                    :
                                    this.setState({
                                        focus: !this.state.focus,
                                        activeSearch: !this.state.activeSearch
                                    })

                            }}
                            className="search-icon"><span />
                        </button>

                    </div>
                    <button onClick={
                        () => this.setState({
                            focus: !this.state.focus,
                            activeSearch: !this.state.activeSearch
                        })}
                        className="close" />

                </div>
            </Fragment >
        )
    }
}

export default withRouter(SearchBox);