import React, { Fragment } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';


import { connect } from 'react-redux';

import Hamburger from 'react-hamburgers';
//import Programacion from '../../Programacion';
//import Programacion from '../../Pages/Programacion'
/*
import {

    faTasks

} from '@fortawesome/free-solid-svg-icons';
*/
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import './main.css';
import 'react-vertical-timeline-component/style.min.css';


import { Avatar, Grid, Typography } from '@material-ui/core';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
//import ContactlessIcon from '@material-ui/icons/Contactless';
import SettingsRemoteIcon from '@material-ui/icons/SettingsRemote';
import MenuBookIcon from '@material-ui/icons/MenuBook';


import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
//import Avatar from '@material-ui/core/Avatar';

//import FacebookIcon from '@material-ui/icons/Facebook';
//import WhatsAppIcon from '@material-ui/icons/WhatsApp';
//import TwitterIcon from '@material-ui/icons/Twitter';

//import Axios from 'axios';

import Chip from '@material-ui/core/Chip';
//import FaceIcon from '@material-ui/icons/Face';
import AlbumIcon from '@material-ui/icons/Album';
import * as moment from 'moment';
import format from 'date-fns/format';


const useStyles = makeStyles({
    list: {
        //width: window.screen.width,
        width: 300
    },
    fullList: {
        width: 'auto',
    },
});

function SwipeableTemporaryDrawer({ PROGRAMACION, API, HOY, PROGRAMA }) {
    const classes = useStyles();
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => event => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = anchor => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <div className='text-center mt-3'>Estas escuchando...</div>
            <VerticalTimeline
                layout='1-column'
            >
                {PROGRAMACION.filter((p) => {
                    return (
                        p.diasemana === HOY
                        && new Date(moment(p.horainicio, 'HH:mm:ss')) >= new Date(moment(PROGRAMA.horainicio, 'HH:mm:ss'))
                    )
                }).map(programa =>
                    <VerticalTimelineElement
                        key={programa.idprogramacion}

                        icon={
                            programa.genero === 'NOTICIAS' ?
                                <MenuBookIcon fontSize='large' className={programa.live ? 'pe-spin' : ''} />
                                : programa.genero === 'MUSICA' ?
                                    <MusicNoteIcon fontSize='large' className={programa.live ? 'pe-spin' : ''} />
                                    :
                                    <SettingsRemoteIcon fontSize='large' className={programa.live ? 'pe-spin' : ''} />
                        }
                        className="vertical-timeline-element--education"

                        contentStyle={
                            programa.live ?
                                {
                                    background: '#f50057', color: '#fff'
                                }
                                : {}
                        }
                        contentArrowStyle={{ borderRight: '7px solid  rgb(233, 30, 99)' }}
                        date={<b>
                            {programa.live ?
                                <Chip color="secondary" size='small' icon={<AlbumIcon />} label='en vivo' />
                                : ''
                            }
                            {" " + format(new Date(moment(programa.horainicio, 'hh:mm:ss')), 'HH:mm') + ' - ' + format(new Date(moment(programa.horafin, 'HH:mm:ss')), 'HH:mm')}</b>}
                        iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
                    >
                        <Grid
                            container
                            direction="column"
                            spacing={0}
                            justify="flex-start"
                            alignItems="flex-start"
                        >
                            <Grid item>
                                <Typography variant='h5'>
                                    <b>{programa.programa}</b>
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant='inherit'><b>Con:</b></Typography>
                            </Grid>
                            <Grid item>
                                <ListItem className='p-0'>
                                    <ListItemAvatar className='mr-2'>
                                        <Avatar variant="rounded" style={
                                            {
                                                width: '50px',
                                                height: '50px'
                                            }
                                        } src={API + 'static/perfiles/' + programa.fotografia} />

                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={<Typography component='small' variant='subtitle1'>{programa.nombres + ' ' + programa.apellidos}</Typography>}
                                    /*
                                    secondary={
                                        <Typography component='span' variant='subtitle1'>
                                            {programa.facebook ?
                                                <span><br /><FacebookIcon color={programa.live ? 'inherit' : 'secondary'} fontSize='small' />{programa.facebook}<br /></span>
                                                : ''
                                            }
                                            {programa.twiter ?
                                                <span><TwitterIcon color={programa.live ? 'inherit' : 'secondary'} fontSize='small' />{programa.twiter}<br /></span>
                                                : ''
                                            }
                                            {programa.whatsapp ?
                                                <span><WhatsAppIcon color={programa.live ? 'inherit' : 'secondary'} fontSize='small' />{programa.whatsapp}</span>
                                                : ''
                                            }
                                        </Typography>
                                    }
                                    */
                                    />
                                </ListItem>

                            </Grid>
                        </Grid>
                    </VerticalTimelineElement>
                )}
            </VerticalTimeline>
        </div>
    );
    return (
        <Fragment>

            <Hamburger type='elastic' onClick={toggleDrawer('right', true)} />
            {/*}
            <FontAwesomeIcon size={'2x'} className="ml-2 mr-2" icon={faTasks} onClick={toggleDrawer('right', true)} />
            {*/}
            <SwipeableDrawer
                anchor={'right'}
                open={state['right']}
                onClose={toggleDrawer('right', false)}
                onOpen={toggleDrawer('right', true)}
            >

                {list('right')}
            </SwipeableDrawer>
        </Fragment>
    );
}
const mapStateToProps = state => ({
    API: state.ThemeOptions.API_REST,
    PROGRAMACION: state.ThemeOptions.programacion,
    HOY: state.ThemeOptions.hoydia,
    PROGRAMA: state.ThemeOptions.programaactual
});

const mapDispatchToProps = dispatch => ({});
export default connect(mapStateToProps, mapDispatchToProps)(SwipeableTemporaryDrawer);
