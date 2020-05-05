import React, { Component, Fragment } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle, faPauseCircle } from '@fortawesome/free-regular-svg-icons';
import IconButton from '@material-ui/core/IconButton';
//import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
export default class PlayStream extends Component {

    constructor(props) {
        super(props);
        this.state = {
            play: false
        }
        this.repro = React.createRef();
        this.encender.bind()
    }

    componentDidMount() {
        //this.repro.current.autoplay = this.state.play;
        //this.repro.current.pause();
        //this.setState({ play: !this.state.play });
        //console.log(this.repro)
    }

    encender = () => {
        if (this.state.play) {
            this.repro.current.pause();
        }
        else {
            this.repro.current.play();
        }
        this.setState({ play: !this.state.play });
    }

    render() {
        return (
            <Fragment>
                <IconButton onClick={this.encender} aria-label="play" size="small">
                    {/*}
                    <PlayCircleOutlineIcon style={{
                        fontSize: '20px',
                        padding: '0'
                    }} />
                    {*/}

                    <FontAwesomeIcon icon={
                        this.state.play ?
                            faPauseCircle
                            : faPlayCircle
                    } size='2x' color={"white"} />
                </IconButton>

                {/*}<FontAwesomeIcon icon={faPlayCircle} size='3x' color={"white"} />{*/}
                <audio ref={this.repro} name="media">
                    {/*}<source src="http://stm10.miradio.com.es:10544/stream/1/" type="audio/mpeg"></source>{*/}
                    <source src="https://ssl.xcast.com.br:10544/" type="audio/mpeg"></source>

                </audio>
            </Fragment>
        )
    }
}
