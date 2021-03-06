import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import Fab from '@material-ui/core/Fab';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import WhatsappIcon from '@material-ui/icons/WhatsApp';
import {
    Paper, Divider, Tooltip, CardActionArea, TextareaAutosize, Input,
    //Dialog, DialogTitle,
    CircularProgress,
    //Typography,
    Backdrop
} from '@material-ui/core';
import { Row, Col, Label } from 'reactstrap';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import VideocamIcon from '@material-ui/icons/Videocam';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import DescriptionIcon from '@material-ui/icons/Description';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
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
import AudioPlayer from 'react-h5-audio-player';
import './styleControlAudio.css'
import { withRouter } from 'react-router-dom';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import LoopIcon from '@material-ui/icons/Loop';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import LinkOffIcon from '@material-ui/icons/LinkOff';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import Image from 'material-ui-image'
import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import {
    toast,
    Bounce
} from 'react-toastify';
import Swiper from './SwipeableTextMobileStepper'
import ChipInput from 'material-ui-chip-input';
import CKEditor from '@ckeditor/ckeditor5-react';
import InlineEditor from '@ckeditor/ckeditor5-build-inline'
import jwt from 'jsonwebtoken';
import '@ckeditor/ckeditor5-build-classic/build/translations/es';
import portada from '../../../../assets/utils/images/dropdown-header/abstract1.jpg'
import CheckIcon from '@material-ui/icons/Check';
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
            boton: false,
            secciones: '',
            open: false,
            progreso: 0,
            autor: jwt.decode(this.props.TOKEN).user,
            tipoinfografia: true,
            carusel: false,
            urlinfografia: '',
            foto: '',
            media: '',
            portada: '',
            tipo: 'tipo',
            seccion: 0,
            pieportada: '',
            titulo: '',
            subtitulo: '',
            contenido: '',
            infocontenido: '',
            fecha: new Date(),
            hora: new Date(),
            prioridad: 2,
            hover: -1,
            labels: {
                1: 'noticia',
                2: 'noticia cuarta plana',
                3: 'noticia tercera plana',
                4: 'noticia segunda plana',
                5: 'noticia primera plana'
            },
            etiquetas: []
        }
        this.dropzoneRef = React.createRef();
        this.dropzoneRef2 = React.createRef();
        this.player = React.createRef();
        this.api = Axios.create({
            baseURL: this.props.API,
            headers: {
                'x-access-token': this.props.TOKEN
            },
            timeout: 0,
            onUploadProgress: (e) => {
                console.log(e.loaded)
                console.log(e.total)
                this.setState({
                    progreso: (e.loaded * 100) / e.total
                })
            }
        })
    }

    async componentDidMount() {
        const secciones = await (await this.api.get('seccion/navs')).data;
        this.setState({ secciones })
    }



    notifyMensaje = (mensaje, type) => this.toastId =
        toast(mensaje, {
            transition: Bounce,
            closeButton: true,
            autoClose: 5000,
            position: 'bottom-center',
            type
        });


    onPreviewDrop = (file) => {
        this.setState({
            foto: file
        });
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
    registrar = async (event) => {
        console.log(this.verificarcampos())
        if (this.verificarcampos()) {
            this.setState({ boton: true })
            const newNoticia = {
                titulo: this.state.titulo,
                subtitulo: this.state.subtitulo,
                pieportada: this.state.pieportada,
                portada: this.state.portada,
                contenido: this.state.contenido,
                tipo: this.state.tipo,
                idseccion: this.state.seccion,
                idconductor: this.state.autor.idconductor,
                fecha: format(this.state.fecha, 'yyyy-MM-dd H:mm:ss'),
                hora: format(this.state.fecha, 'H:mm:ss'),
                prioridad: this.state.prioridad,
                infocontenido: this.state.infocontenido,
                etiquetas: this.state.etiquetas.toString(),
                estado: true
            };
            try {
                const dato = new FormData();
                dato.append('portada', this.state.foto[0]);
                dato.append('noticia', JSON.stringify(newNoticia));
                dato.append('tipoinfografia', this.state.tipo);
                dato.append('urlinfografia', this.state.tipo === 'video' ? this.state.urlinfografia : '');
                console.log(this.state.media)
                if (this.state.tipo === 'nota' || this.state.urlinfografia) {
                    this.setState({
                        media: ''
                    })
                }
                this.state.media && this.state.media.map(recurso =>
                    dato.append('recurso', recurso)
                )
                try {
                    this.setState({
                        open: true
                    })
                    const response = await (await this.api.post('noticia', dato)).data;
                    console.log(response)
                    if (response.ok) {
                        this.notifyMensaje('Registro realizado de forma correcta :)', 'success')
                        this.setState({ open: false })
                        this.props.history.push('/admin/listar-noticias')
                    }
                    else {
                        alert('problemas al registrar la noticia por faovr vuelva a intentarlo... :(')
                    }
                } catch (error) {
                    console.log(error)
                    this.notifyMensaje('Ups tenemos problemas con su conexion a internet, por favor vuelva a intentarlo.', 'warning')
                }
            } catch (error) {
                console.log(error)
            }
        }
        else {
            this.notifyMensaje('Por favor complete los compos obligatorios para registrar una noticia.', 'error')
        }
    }
    render() {
        return (
            <Fragment>
                {/*}
                <Dialog
                    open={this.state.open}
                    disableBackdropClick={true}
                    disableEscapeKeyDown={true}
                    //onClose={this.setState({ open: false })}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title" className='text-center' style={{ color: 'f50057' }}>
                        {Math.round(this.state.progreso)} %
                    </DialogTitle>
                    <center className='m-3'>
                        {this.state.progreso === 100 ?
                            <span>
                                <Typography color='primary'>
                                    Registro realizado correctamente..
                                </Typography>
                                <CheckIcon style={{ fontSize: '150px', color: 'green' }} />
                            </span>
                            :
                            <CircularProgress className='mt-0 mb-3 ml-3 mr-3' thickness={3.6} size='8rem' variant="determinate" value={this.state.progreso}
                                color="secondary" />
                        }
                    </center>
                </Dialog>
                {*/}
                <Paper my={2} className='p-3 mb-2'>
                    <Backdrop
                        style={{
                            zIndex: 1
                        }}
                        open={this.state.open}
                    >
                        {this.state.progreso === 100 ?
                            <span>
                                {/*}
                                <Typography color='primary'>
                                    {'Registro realizado correctamente..'}
                                </Typography>
                                {*/}
                                <CheckIcon style={{ fontSize: '150px', color: 'white' }} />
                            </span>
                            :
                            <CircularProgress className='mt-0 mb-3 ml-3 mr-3' thickness={3} size='8rem' variant="determinate" value={this.state.progreso} color="secondary" />
                        }
                    </Backdrop>
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
                                                                        URL.createObjectURL(this.state.foto[0]) : portada
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
                                        >
                                            <MenuItem value={0}>Seccion</MenuItem>
                                            {this.state.secciones && this.state.secciones.map(sec =>
                                                <MenuItem key={sec.id} value={sec.id}>
                                                    <Chip size="small" label={sec.label} />
                                                </MenuItem>
                                            )}
                                        </Select>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
                                            <DateTimePicker
                                                variant='inline '
                                                autoOk
                                                size='small'
                                                ampm={false}
                                                format="dd MMM yyyy HH:mm"
                                                disableFuture
                                                value={this.state.fecha}
                                                onChange={(fecha) => {
                                                    this.setState({
                                                        fecha
                                                    })
                                                }}
                                                InputProps={{
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
                                                <Avatar
                                                    variant="rounded"
                                                    fontSize='small'
                                                    src={this.props.API + 'static/perfiles/' + this.state.autor.fotografia}
                                                />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={this.state.autor.nombres + ' ' + this.state.autor.apellidos}
                                                secondary={this.state.autor.correo}
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
                                        color='secondary'
                                        value={this.state.etiquetas}
                                        onAdd={(chip) => {
                                            this.state.etiquetas.push(chip);
                                            this.setState({
                                                etiquetas: this.state.etiquetas
                                            })
                                        }}
                                        onDelete={(chip, index) => {
                                            const newetiquetas = this.state.etiquetas;
                                            newetiquetas.splice(index, 1)
                                            this.setState({
                                                etiquetas: newetiquetas
                                            })
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
                                            disabled={this.state.boton}
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
    API: state.ThemeOptions.API_REST,
    TOKEN: state.ThemeOptions.token
});

const mapDispatchToProps = dispatch => ({});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FormNoticia));