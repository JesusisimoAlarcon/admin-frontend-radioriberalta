import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import Fab from '@material-ui/core/Fab';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import WhatsappIcon from '@material-ui/icons/WhatsApp';
import { Paper, Divider, Tooltip, CardActionArea, TextareaAutosize, Input } from '@material-ui/core';
import { Row, Col, Label } from 'reactstrap';
//import portada from '../../assets/utils/images/dropdown-header/abstract1.jpg'
//import portada from '../../../assets/test/portada.png'
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import VideocamIcon from '@material-ui/icons/Videocam';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import DescriptionIcon from '@material-ui/icons/Description';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
//import AccessTimeIcon from '@material-ui/icons/AccessTime';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import foto from '../../../../assets/test/test04.jpg'
//import TextField from '@material-ui/core/TextField';
import esLocale from 'date-fns/locale/es';
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import Axios from 'axios';
import Dropzone from 'react-dropzone';
import SaveIcon from '@material-ui/icons/Save';
import { format } from 'date-fns';
import ReactPlayer from 'react-player';

import Switch from '@material-ui/core/Switch';
//import Grid from '@material-ui/core/Grid';


//import musica from '../../../assets/test/musica.mp3'

import AudioPlayer from 'react-h5-audio-player';
//import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
//import 'react-h5-audio-player/lib/styles.css';
import './styleControlAudio.css'
//import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';
//import YouTubePlayer from 'react-player/lib/players/Streamable'
//import { Route, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import LoopIcon from '@material-ui/icons/Loop';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
//import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import LinkOffIcon from '@material-ui/icons/LinkOff';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
//import PhotoCamera from '@material-ui/icons/PhotoCamera';
//import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import Image from 'material-ui-image'
import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
//import AlbumIcon from '@material-ui/icons/Album';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
//import CircularProgress from '@material-ui/core/CircularProgress';
//import { Button } from '@material-ui/core'
//import { AutoRotatingCarousel } from 'material-auto-rotating-carousel';
//import { Slide } from 'material-auto-rotating-carousel';
//import { red, blue, green } from '@material-ui/core/colors'

//const { red, blue, green } = require('@material-ui/core/colors');
//import { red, blue, green } from '@material-ui/core/colors'
//import { AutoRotatingCarousel } from 'material-auto-rotating-carousel'
//const { AutoRotatingCarousel } = require('material-auto-rotating-carousel')
//import AutoRotatingCarousel from 'material-auto-rotating-carousel';
//const Slide = require('material-auto-rotating-carousel/lib/Slide');
//import Slide from 'material-auto-rotating-carousel';
//const Slide = require('./Slide').default;
import {
    toast,
    Bounce
} from 'react-toastify';

import Swiper from './SwipeableTextMobileStepper'

import ChipInput from 'material-ui-chip-input';
//import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed';
import CKEditor from '@ckeditor/ckeditor5-react';
//import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import InlineEditor from '@ckeditor/ckeditor5-build-inline'
import '@ckeditor/ckeditor5-build-classic/build/translations/es';
//import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed';
const editorConfiguration = {
    //plugins: [MediaEmbed],
    //plugins: [Essentials, Bold, Italic, Paragraph],
    //toolbar: ['bold', 'italic']
    //blockToolbar: ['paragraph', 'heading1', 'heading2', '|', 'bulletedList', 'numberedList'],
    //plugins: [ Essentials, Paragraph, Bold, Italic, Heading ],
    //toolbar: ['heading', '|', 'bold', 'italic', '|', 'undo', 'redo'],
    language: 'es',
    image: {
        // You need to configure the image toolbar, too, so it uses the new style buttons.
        toolbar: ['imageTextAlternative', '|', 'imageStyle:alignLeft', 'imageStyle:full', 'imageStyle:alignRight'],

        styles: [
            // This option is equal to a situation where no style is applied.
            'full',

            // This represents an image aligned to the left.
            'alignLeft',

            // This represents an image aligned to the right.
            'alignRight'
        ]
    }
    /*
    ,
    mediaEmbed: {
        previewsInData: true
    }
    */
    //toolbar: [BalloonBlockEditor]
};

class FormNoticia extends Component {


    constructor(props) {
        super(props)



        this.state = {


            tipoinfografia: true,
            carusel: false,
            //urlinfografia: 'https://youtu.be/CPK_IdHe1Yg',
            urlinfografia: '',
            foto: '',
            media: [],
            portada: '',
            tipo: 'tipo',
            seccion: 0,
            idconductor: 55,
            pieportada: '',
            secciones: this.props.SECCIONES,
            titulo: '',
            subtitulo: '',
            contenido: '',
            infocontenido: '',
            fecha: new Date(),
            hora: new Date(),
            prioridad: 2,
            hover: -1,
            labels: {
                //1: 'noticia normal',
                //2: 'noticia secundaria',
                //3: 'primera plana',
                0.5: 'Normal',
                1: 'Useless+',
                1.5: 'Poor',
                2: 'Poor+',
                2.5: 'Ok',
                3: 'Ok+',
                3.5: 'Good',
                4: 'Good+',
                4.5: 'Excellent',
                5: 'Primera plana',
            },
            etiquetas: []
        }
        this.dropzoneRef = React.createRef();
        this.dropzoneRef2 = React.createRef();
        this.player = React.createRef();
        //this.arrayimages = [];
    }
    notifycorrecto = () => {
        this.toastId =
            toast("Registro realizo de forma correcta", {
                transition: Bounce,
                closeButton: true,
                autoClose: 5000,
                position: 'bottom-center',
                type: 'success'
            });
        //<Redirect to="/noticias/riberalta" />
    };


    notifyvalidacion = () => this.toastId =
        toast("Por favor complete los compos obligatorios para registrar una noticia.", {
            transition: Bounce,
            closeButton: true,
            autoClose: 5000,
            position: 'bottom-center',
            type: 'error'
        });
    onPreviewDrop = (file) => {
        this.setState({
            foto: file
        });
        console.log(file[0])
    }


    onPreviewDrop2 = (file) => {
        this.setState({
            media: file
        });
        console.log(file)
        console.log(this.state.media)
    }



    openDialog = () => {
        if (this.dropzoneRef.current) {
            this.dropzoneRef.current.open()
        }
    };

    openDialog2 = () => {
        if (this.dropzoneRef2.current) {
            this.dropzoneRef2.current.open()
        }
    };



    checkedChange = (e) => {
        this.setState({
            [e.target.name]: e.target.checked,
            urlinfografia: '',
            media: []
        })
        console.log(e.target.checked)
    }

    inputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    setinfoContenido = (event, editor) => {
        this.setState({ infocontenido: editor.getData() })
    }
    setContenido = (event, editor) => {
        this.setState({ contenido: editor.getData() })
    }
    verificarcampos() {
        if (this.state.foto === '' || this.state.seccion === 0 ||
            this.state.tipo === 'tipo' || this.state.titulo === '' ||
            this.state.subtitulo === '' || this.state.pieportada === '' || this.state.contenido === '' || this.state.etiquetas.length === 0) {
            return false;
        }
        else {
            if (this.state.tipo !== 'nota' && this.state.infocontenido !== '' && this.state.media.length > 0) {
                return true;
            }
            else if (this.state.tipo === 'video' && this.state.urlinfografia !== '') {
                return true;
            }
            else if (this.state.tipo === 'nota') {
                return true;
            }
            else {
                return false;
            }

        }
    }
    registrar = (eventt) => {
        console.log(this.verificarcampos())
        if (this.verificarcampos()) {
            const newNoticia = {
                titulo: this.state.titulo,
                subtitulo: this.state.subtitulo,
                pieportada: this.state.pieportada,
                portada: this.state.portada,
                contenido: this.state.contenido,
                tipo: this.state.tipo,
                idseccion: this.state.seccion,
                idconductor: this.state.idconductor,
                fecha: format(this.state.fecha, 'yyyy-MM-dd H:mm:ss'),
                //fecha: format(this.state.fecha, 'yyyy-MM-dd'),
                hora: format(this.state.fecha, 'H:mm:ss'),
                prioridad: this.state.prioridad,
                infocontenido: this.state.infocontenido,
                estado: true
            }
            //console.log(newNoticia);
            console.log(this.state.foto[0])
            const dato = new FormData();
            dato.append('imagen', this.state.foto[0]);
            fetch(this.props.API + 'noticia/portada', {
                method: 'post',
                body: dato
            }).then((response) => {
                return response.json()
            }).then(async (response) => {
                console.log(response)
                newNoticia.portada = response.imagen
                newNoticia.etiquetas = this.state.etiquetas.toString()
                console.log(newNoticia)
                const resp = await Axios.post(this.props.API + 'noticia', newNoticia);
                console.log(resp)
                console.log(resp.data.insertId)
                const newid = resp.data.insertId
                this.registrarInfografia(newid);
                this.notifycorrecto();

                this.props.history.push('/listar-noticias');
            })

        }
        else {
            this.notifyvalidacion()
        }
    }

    registrarInfografia = async (newid) => {
        switch (this.state.tipo) {
            case 'audio':
                console.log(this.state.media[0])
                const audio = new FormData();
                audio.append('audio', this.state.media[0]);
                fetch(this.props.API + 'infografia/audio', {
                    method: 'post',
                    body: audio
                }).then((response) => {
                    return response.json()
                }).then(async (response) => {
                    console.log(response)
                    const infoaudio = {
                        tipo: this.state.tipo,
                        infografia: response.recurso,
                        infotitulo: response.name,
                        //infocontenido: this.state.infocontenido,
                        infopie: 'pie',
                        idnoticia: newid
                    }
                    console.log(infoaudio)
                    const resp = await Axios.post(this.props.API + 'infografia', infoaudio);
                    console.log(resp)
                })
                break;
            case 'video':
                if (this.state.tipoinfografia) {
                    const infovideo = {
                        tipo: 'video_url',
                        infografia: this.state.urlinfografia,
                        infotitulo: '',
                        //infocontenido: this.state.infocontenido,
                        infopie: 'pie',
                        idnoticia: newid
                    }
                    console.log(infovideo)
                    const resp = await Axios.post(this.props.API + 'infografia', infovideo);
                    console.log(resp)
                }
                else {
                    console.log(this.state.media[0])
                    const video = new FormData();
                    video.append('video', this.state.media[0]);
                    fetch(this.props.API + 'infografia/video', {
                        method: 'post',
                        body: video
                    }).then((response) => {
                        return response.json()
                    }).then(async (response) => {
                        console.log(response)
                        const infovideo = {
                            tipo: 'video_archivo',
                            infografia: response.recurso,
                            infotitulo: response.name,
                            //infocontenido: this.state.infocontenido,
                            infopie: 'pie',
                            idnoticia: newid
                        }
                        console.log(infovideo)
                        const resp = await Axios.post(this.props.API + 'infografia', infovideo);
                        console.log(resp)
                    })
                }
                break;
            case 'image':
                this.state.media.map((recurso) => {
                    console.log(recurso)
                    const imagen = new FormData();
                    imagen.append('imagen', recurso);
                    fetch(this.props.API + 'infografia/images', {
                        method: 'post',
                        body: imagen
                    }).then((response) => {
                        return response.json()
                    }).then(async (response) => {
                        console.log(response)
                        const infoimagen = {
                            tipo: this.state.tipo,
                            infografia: response.recurso,
                            infotitulo: response.name,
                            //infocontenido: this.state.infocontenido,
                            infopie: 'pie',
                            idnoticia: newid
                        }
                        console.log(infoimagen)
                        const resp = await Axios.post(this.props.API + 'infografia', infoimagen);
                        console.log(resp)
                    })
                    return 0;
                })
                break;
            default:
                break;
        }
    }



    render() {
        return (
            <Fragment>
                <Paper my={2} className='p-3 mb-2'>
                    <Row>
                        <Col lg='1'>
                            <aside style={{
                                position: 'sticky',
                                top: '70px'
                            }}>
                                <small>Compartir</small>
                                <Divider className='mt-1 mb-1' />
                                <div className='m-1'>
                                    <Tooltip title='Compartir por Facebook' placement='right-start'>
                                        <Fab size='small' color='secondary' className='m-1' >
                                            <FacebookIcon fontSize='small' />
                                        </Fab>
                                    </Tooltip>
                                    <Tooltip title='Compartir por Twiter' placement='right-start'>
                                        <Fab size='small' color='secondary' className='m-1' >
                                            <TwitterIcon fontSize='small' />
                                        </Fab>
                                    </Tooltip>
                                    <Tooltip title='Compartir por WhatsApp' placement='right-start'>
                                        <Fab size='small' color='secondary' className='m-1' >
                                            <WhatsappIcon fontSize='small' />
                                        </Fab>
                                    </Tooltip>
                                </div>
                            </aside>
                        </Col>

                        <Col lg='11'>
                            <Row>
                                <Col lg='8'>

                                    <Dropzone
                                        ref={this.dropzoneRef}
                                        noClick
                                        noKeyboard
                                        onDrop={this.onPreviewDrop}
                                        accept='image/*'
                                        multiple={false}
                                    >
                                        {({ getRootProps, getInputProps, acceptedFiles }) => {
                                            return (
                                                <div>
                                                    <div {...getRootProps({ className: 'dropzone' })}>
                                                        <input
                                                            {...getInputProps()}
                                                        />
                                                        <CardActionArea
                                                            onClick={this.openDialog}>
                                                            <Image
                                                                animationDuration={10000}
                                                                //loading={false}
                                                                //loading={<CircularProgress size={48} />}
                                                                aspectRatio={(16 / 9)}
                                                                src={
                                                                    this.state.foto.length > 0 ?
                                                                        URL.createObjectURL(this.state.foto[0]) : null
                                                                }
                                                            />
                                                        </CardActionArea>
                                                    </div>
                                                </div>
                                            );
                                        }}
                                    </Dropzone>

                                    <TextareaAutosize
                                        name='pieportada'
                                        className='form-control'
                                        //value={this.state.pieportada}
                                        onChange={this.inputChange}
                                        style={{ fontSize: '0.8rem' }}
                                        rowsMin={1}
                                        placeholder='pie de la portada'
                                    />
                                </Col>
                                <Col lg='4'>
                                    <Grid
                                        container
                                        direction="row"
                                        justify="space-between"
                                        alignItems="flex-end"
                                    >
                                        <Select
                                            name='tipo'
                                            style={{
                                                fontSize: '0.9rem'
                                            }}
                                            value={this.state.tipo}
                                            onChange={this.inputChange}
                                            size='small'
                                        >
                                            <MenuItem value='tipo'>Tipo</MenuItem>
                                            <MenuItem value='nota'>
                                                <Chip size="small" avatar={<DescriptionIcon />} />
                                            </MenuItem>
                                            <MenuItem value='image'>
                                                <Chip size="small" avatar={<PhotoLibraryIcon />} />
                                            </MenuItem>
                                            <MenuItem value='audio'>
                                                <Chip size="small" avatar={<VolumeUpIcon />} />
                                            </MenuItem>
                                            <MenuItem value='video'>
                                                <Chip size="small" avatar={<VideocamIcon />} />
                                            </MenuItem>
                                        </Select>
                                        <Select
                                            name='seccion'
                                            style={{
                                                fontSize: '0.9rem'
                                            }}
                                            value={this.state.seccion}
                                            onChange={this.inputChange}
                                            size='small'
                                        //onChange={onChangeSeccion}
                                        >
                                            <MenuItem value={0}>Seccion</MenuItem>
                                            {this.props.SECCIONES.map(sec =>
                                                <MenuItem key={sec.id} value={sec.id}>
                                                    <Chip size="small" label={sec.label} />
                                                </MenuItem>
                                            )}
                                        </Select>


                                        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>

                                            <DateTimePicker
                                                //inputVariant="outlined"
                                                variant='inline '
                                                autoOk
                                                size='small'
                                                ampm={false}

                                                //className='form-control'
                                                format="dd MMM yyyy HH:mm"
                                                disableFuture
                                                value={this.state.fecha}
                                                onChange={(fecha) => {
                                                    this.setState({
                                                        fecha
                                                    })
                                                }}
                                                InputProps={{
                                                    //fullWidth: '10px',
                                                    endAdornment: (
                                                        <InputAdornment position="start">
                                                            <IconButton>
                                                                <AccessTimeIcon />
                                                            </IconButton>
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />

                                        </MuiPickersUtilsProvider>

                                    </Grid>


                                    <TextareaAutosize
                                        name='titulo'
                                        className='form-control'
                                        //value={this.state.titulo}
                                        onChange={this.inputChange}
                                        style={{
                                            fontSize: '2.2rem',
                                            fontFamily: 'PlayfairDisplay-Bold',
                                            lineHeight: '2.4rem',
                                            fontWeight: 'bold'
                                        }}
                                        rowsMin={3}
                                        placeholder='Titulo de la noticia'
                                    />

                                    <TextareaAutosize
                                        name='subtitulo'
                                        className='form-control'
                                        //value={this.state.subtitulo}
                                        onChange={this.inputChange}
                                        style={{
                                            marginTop: '10px',
                                            color: '#4a4a4a',
                                            fontFamily: 'LatoBold',
                                            fontSize: '1rem',
                                            lineHeight: '1.2rem',
                                        }}
                                        rowsMin={3}
                                        placeholder='Subtitulo o resumen de la noticia'
                                    />

                                    <div>
                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar src={foto} variant="rounded" fontSize='small' />

                                            </ListItemAvatar>
                                            <ListItemText
                                                primary="Radio Riberalta"
                                                secondary='@alarconcito'
                                            />
                                        </ListItem>
                                    </div>

                                    <center>
                                        <Rating
                                            name="hover-feedback"
                                            size="large"
                                            value={this.state.prioridad}
                                            precision={1}
                                            onChange={(event, prioridad) => {
                                                this.setState({
                                                    prioridad
                                                })
                                            }}
                                            onChangeActive={(event, hover) => {
                                                this.setState({
                                                    hover
                                                })
                                            }}
                                        />
                                        {this.state.prioridad !== null &&
                                            <Box ml={0}>
                                                {this.state.labels[this.state.hover !== -1 ? this.state.hover : this.state.prioridad]}
                                            </Box>
                                        }
                                    </center>

                                    <ChipInput
                                        //defaultValue={}
                                        value={this.state.etiquetas}
                                        onAdd={(chip) => {
                                            //this.setState({ etiquetas: this.state.etiquetas.push(chip) })
                                            const newetiquetas = this.state.etiquetas;
                                            newetiquetas.push(chip)
                                            //this.state.etiquetas.push(chip)
                                            this.setState({
                                                etiquetas: newetiquetas
                                                //...etiquetas.push(chip)
                                            })
                                            //console.log(this.state.etiquetas)
                                        }}
                                        onDelete={(chip, index) => {
                                            //this.setState({ etiquetas: this.state.etiquetas.slice(index, 1) })
                                            const newetiquetas = this.state.etiquetas;
                                            newetiquetas.splice(index, 1)
                                            this.setState({
                                                etiquetas: newetiquetas
                                            })

                                            //console.log(this.state.etiquetas)
                                        }}
                                        fullWidth
                                        label='Palabras clave o etiquetas'
                                        placeholder='Escriba y presione Intro para agregar las etiquetas'
                                    />
                                </Col>

                            </Row>
                            <Divider className='mt-2 mb-3' />
                            <Row>
                                <Col lg='8'>
                                    {this.state.tipo !== 'nota' && this.state.tipo !== 'tipo' &&
                                        <CKEditor
                                            name='infocontenido'
                                            editor={InlineEditor}
                                            //editor={BalloonBlockEditor}
                                            config={editorConfiguration}
                                            data='<b>Escriba el contenido superior aqui<b/>'
                                            onInit={editor => {
                                                // You can store the "editor" and use when it is needed.
                                                //console.log('Editor is ready to use!', editor);
                                            }}
                                            /*
                                            onChange={(event, editor) => {
                                                const contenido = editor.getData();
                                                this.setState(contenido)
                                                //setContenido(data)
                                                //console.log({ event, editor, data });
                                                //console.log(data);
                                            }}
                                            */
                                            onChange={this.setinfoContenido}
                                            onBlur={(event, editor) => {
                                                //console.log('Blur.', editor);
                                            }}
                                            onFocus={(event, editor) => {
                                                //console.log('Focus.', editor);
                                            }}
                                        />
                                    }
                                    <Dropzone
                                        ref={this.dropzoneRef2}
                                        noClick
                                        noKeyboard
                                        onDrop={this.onPreviewDrop2}
                                        accept={this.state.tipo + '/*'}
                                        multiple={this.state.tipo === 'image' ? true : false}
                                    >
                                        {({ getRootProps, getInputProps, acceptedFiles }) => {
                                            return (
                                                <div>
                                                    <div {...getRootProps({ className: 'dropzone' })}>
                                                        <input
                                                            {...getInputProps()}
                                                        />

                                                        {this.state.tipo === 'audio' ?
                                                            <div>
                                                                <center>
                                                                    <IconButton
                                                                        color="secondary"
                                                                        aria-label="upload picture"
                                                                        component="span"
                                                                        onClick={this.openDialog2}
                                                                    >
                                                                        <PlaylistAddIcon
                                                                            fontSize='large'
                                                                        />
                                                                    </IconButton>
                                                                </center>
                                                                < AudioPlayer
                                                                    //autoPlay
                                                                    ref={this.player}
                                                                    autoPlay={false}
                                                                    autoPlayAfterSrcChange={false}
                                                                    style={{
                                                                        background: 'white',
                                                                        color: '#e91e63',
                                                                        fontSize: '20px',
                                                                        borderColor: '#e91e63'

                                                                    }}
                                                                    //className=''
                                                                    src={
                                                                        this.state.media.length > 0 ?
                                                                            URL.createObjectURL(this.state.media[0]) : null
                                                                    }
                                                                    onPlay={e => console.log("onPlay")}
                                                                    header={this.state.media.length > 0 ?
                                                                        this.state.media[0].name : 'Nombre del archivo audio'}
                                                                    //footer="This is a footer"
                                                                    showJumpControls={false}
                                                                    //layout="horizontal"
                                                                    // other props here
                                                                    defaultCurrentTime="Cargando" defaultDuration="Cargando" customIcons={{
                                                                        play: <PlayCircleOutlineIcon color='secondary' style={{
                                                                            fontSize: '80px'
                                                                        }} />,
                                                                        pause: <PauseCircleOutlineIcon color='secondary' style={{
                                                                            fontSize: '80px'
                                                                        }} />,
                                                                        volume: <VolumeUpIcon color='secondary' fontSize='default' />,
                                                                        volumeMute: <VolumeOffIcon color='secondary' fontSize='default' />,
                                                                        loop: <LinkOffIcon color='secondary' fontSize='default' />,
                                                                        loopOff: <LoopIcon color='secondary' fontSize='default' />,

                                                                    }}
                                                                /*
                                                                customProgressBarSection={
                                                                    [
                                                                        RHAP_UI.PROGRESS_BAR,
                                                                        RHAP_UI.CURRENT_TIME,
                                                                        <div>/</div>,
                                                                        RHAP_UI.DURATION
                                                                    ]
                                                                }
                                                                */
                                                                />

                                                            </div>
                                                            :
                                                            this.state.tipo === 'video' ?
                                                                <div>
                                                                    <center className='mb-3'>
                                                                        <Grid
                                                                            container
                                                                            direction="row"
                                                                            justify="center"
                                                                            alignItems="center"
                                                                            spacing={3}
                                                                        >

                                                                            <Grid item>
                                                                                <Label>Archivo</Label>
                                                                                <Switch
                                                                                    checked={this.state.tipoinfografia}
                                                                                    onChange={this.checkedChange}
                                                                                    name="tipoinfografia"
                                                                                    color="secondary"
                                                                                />
                                                                                <Label>URL</Label>
                                                                            </Grid>

                                                                            <Grid item>
                                                                                {this.state.tipoinfografia === true ?
                                                                                    <Input
                                                                                        name='urlinfografia'
                                                                                        onChange={this.inputChange}
                                                                                        type='url'
                                                                                        placeholder='Escriba aqui la url'
                                                                                    />
                                                                                    :
                                                                                    <IconButton
                                                                                        color="secondary"
                                                                                        aria-label="upload picture"
                                                                                        component="span"
                                                                                        onClick={this.openDialog2}
                                                                                    >
                                                                                        <VideoLibraryIcon
                                                                                            fontSize='large'
                                                                                        />
                                                                                    </IconButton>


                                                                                }
                                                                            </Grid>
                                                                        </Grid>
                                                                    </center>
                                                                    {/*}<div className="embed-responsive embed-responsive-16by4">{*/}
                                                                    <div style={{
                                                                        //position: 'relative',
                                                                        //paddingTop: '56.25%'
                                                                        height: 0,
                                                                        overflow: 'hidden',
                                                                        paddingBottom: '56.25%',
                                                                        paddingTop: '30px',
                                                                        position: 'relative'
                                                                    }}>
                                                                        <ReactPlayer
                                                                            style={{
                                                                                position: "absolute",
                                                                                top: 0,
                                                                                left: 0,
                                                                                width: '100%',
                                                                                height: '100%'
                                                                            }}
                                                                            className='mb-3'
                                                                            //url='https://www.facebook.com/435932830125753/videos/614756425922384/'
                                                                            //url={portada}
                                                                            controls
                                                                            light={false}
                                                                            url={
                                                                                this.state.tipoinfografia === true ?

                                                                                    this.state.urlinfografia

                                                                                    :

                                                                                    this.state.media.length > 0 ?
                                                                                        URL.createObjectURL(this.state.media[0]) : null
                                                                            }
                                                                            //url={video}
                                                                            width='100%'
                                                                            height='100%'

                                                                        />
                                                                    </div>
                                                                </div>
                                                                :
                                                                this.state.tipo === 'image' ?
                                                                    <div>
                                                                        <center>
                                                                            <IconButton
                                                                                color="secondary"
                                                                                aria-label="upload picture"
                                                                                component="span"
                                                                                onClick={this.openDialog2}
                                                                            >
                                                                                <ImageSearchIcon
                                                                                    fontSize='large'
                                                                                />
                                                                            </IconButton>
                                                                        </center>
                                                                        {this.state.media.length > 0 &&
                                                                            <Swiper imagenes={this.state.media} />
                                                                        }
                                                                    </div>
                                                                    :
                                                                    ''
                                                        }

                                                    </div>

                                                    {this.state.tipo !== 'tipo' ?
                                                        <CKEditor
                                                            name='contenido'
                                                            editor={InlineEditor}
                                                            //editor={BalloonBlockEditor}
                                                            config={editorConfiguration}
                                                            data='<b>Escriba el contenido aqui</b>'
                                                            onInit={editor => {
                                                                // You can store the "editor" and use when it is needed.
                                                                //console.log('Editor is ready to use!', editor);
                                                            }}
                                                            /*
                                                            onChange={(event, editor) => {
                                                                const contenido = editor.getData();
                                                                this.setState(contenido)
                                                                //setContenido(data)
                                                                //console.log({ event, editor, data });
                                                                //console.log(data);
                                                            }}
                                                            */
                                                            onChange={this.setContenido}
                                                            onBlur={(event, editor) => {
                                                                //console.log('Blur.', editor);
                                                            }}
                                                            onFocus={(event, editor) => {
                                                                //console.log('Focus.', editor);
                                                            }}
                                                        />
                                                        :
                                                        ''}
                                                </div>
                                            );
                                        }}
                                    </Dropzone>





                                </Col>

                                <Col lg='4'>

                                    <aside style={{
                                        position: 'sticky',
                                        top: '70px'
                                    }}>


                                        <Fab
                                            color='secondary'
                                            onClick={this.registrar}
                                            style={{
                                                position: 'fixed',
                                                bottom: '5%',
                                                right: '5%'
                                            }}
                                        >
                                            <SaveIcon />
                                        </Fab>
                                    </aside>
                                </Col>

                            </Row>
                        </Col>
                    </Row>
                </Paper>
            </Fragment >
        )
    }
}
const mapStateToProps = state => ({
    SECCIONES: state.ThemeOptions.secciones,
    API: state.ThemeOptions.API_REST
});

const mapDispatchToProps = dispatch => ({});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FormNoticia));