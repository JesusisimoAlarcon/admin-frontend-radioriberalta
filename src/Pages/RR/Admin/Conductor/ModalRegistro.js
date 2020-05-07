import React from 'react';
import { Modal, ModalHeader, ModalBody, InputGroup, InputGroupAddon, ModalFooter, Form, FormGroup, Label, Input, FormText, Button, Row, Col } from 'reactstrap';
import { Divider, Fab } from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';

import AddIcon from '@material-ui/icons/Add';

import { green, lightBlue, purple } from '@material-ui/core/colors';
import Dropzone from 'react-dropzone';
import Avatar from '@material-ui/core/Avatar';
class ModalRegistro extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            newConductor: {
                nombres: '',
                apellidos: '',
                sexo: '',
                telefono: '',
                celular: '',
                correo: '',
                facebook: '',
                whatsapp: '',
                twiter: '',
                instagram: '',
                fotografia: ''
            },
            nombres: '',
            apellidos: '',
            sexo: 'MASCULINO',
            telefono: '',
            celular: '',
            correo: '',
            facebook: '',
            whatsapp: '',
            twiter: '',
            instagram: '',
            fotografia: {},
            modal: false
        }
        this.dropzoneRef = React.createRef();
        this.toggle = this.toggle.bind(this);
    }
    onPreviewDrop = (file) => {
        this.setState({
            fotografia: file
        });
    }

    openDialog = () => {
        if (this.dropzoneRef.current) {
            this.dropzoneRef.current.open()
        }
    };
    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }
    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    onActualizar = () => {
        this.setState({
            newConductor: {
                nombres: this.state.nombres,
                apellidos: this.state.apellidos,
                sexo: this.state.sexo,
                telefono: this.state.telefono,
                celular: this.state.celular,
                correo: this.state.correo,
                facebook: this.state.facebook,
                whatsapp: this.state.whatsapp,
                twiter: this.state.twiter,
                instagram: this.state.instagram,
                fotografia: this.state.fotografia
            }
        })

    }
    onSubmit = async (e) => {
        e.preventDefault();
        this.toggle();
    }

    render() {

        const { handleConductor } = this.props
        return (
            <div>
                <Fab color='secondary' onClick={this.toggle}>
                    <AddIcon />
                </Fab>
                <Modal isOpen={this.state.modal} size='lg' toggle={this.toggle} className={this.props.className}>
                    <Form onChange={this.onActualizar} onSubmit={this.onSubmit}>
                        <ModalHeader toggle={this.toggle}>DATOS DEL CONDUCTOR</ModalHeader>
                        <ModalBody>
                            <Label>DATOS PERSONALES</Label>
                            <Row>
                                <Col lg='4'>
                                    <center>
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
                                                            <Avatar

                                                                src={this.state.fotografia.length > 0 ? URL.createObjectURL(this.state.fotografia[0]) : null}
                                                                style={{ width: 150, height: 150 }}
                                                            />
                                                            {/*}
                                                    {acceptedFiles.map(file => (
                                                        <Avatar
                                                            key={file.name}
                                                            src={URL.createObjectURL(file)}
                                                            style={{ width: 200, height: 200 }}
                                                        />
                                                    ))}
                                                    {*/}
                                                            <Button
                                                                outline
                                                                size='sm'
                                                                className='mt-2'
                                                                color='info'
                                                                onClick={this.openDialog}>
                                                                Buscar foto
                                                    </Button>
                                                        </div>
                                                    </div>
                                                );
                                            }}
                                        </Dropzone>
                                    </center>
                                </Col>
                                <Col lg='4' sm='6'>
                                    <FormGroup>
                                        <Label for="inputnombre">Nombres</Label>
                                        <Input
                                            id="inputnombre"
                                            bsSize='sm'
                                            name='nombres'
                                            value={this.state.nombres}
                                            onChange={this.onInputChange}
                                        />
                                        <FormText>Ejemplo: Jose Luis</FormText>
                                    </FormGroup>
                                </Col>
                                <Col lg='4' sm='6'>
                                    <FormGroup>
                                        <Label for="inputapellidos">Apellidos</Label>
                                        <Input
                                            id="inputapellidos"
                                            bsSize='sm'
                                            name='apellidos'
                                            value={this.state.apellidos}
                                            onChange={this.onInputChange}
                                        />
                                        <FormText>Ejemplo: Paredes Suarez</FormText>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg='4' sm='4'>
                                    <FormGroup>
                                        <Label for="inputtelefono">Telefono</Label>
                                        <Input
                                            id="inputtelefono"
                                            bsSize='sm'
                                            name='telefono'
                                            type='tel'
                                            value={this.state.telefono}
                                            onChange={this.onInputChange}
                                        />
                                        <FormText>Ejemplo: 50235485</FormText>
                                    </FormGroup>
                                </Col>
                                <Col lg='4' sm='4'>
                                    <FormGroup>
                                        <Label for="inputcelular">Celular</Label>
                                        <Input
                                            id="inputcelular"
                                            bsSize='sm'
                                            name='celular'
                                            type='tel'
                                            value={this.state.celular}
                                            onChange={this.onInputChange}
                                        />
                                        <FormText>Ejemplo: 78459656</FormText>
                                    </FormGroup>
                                </Col>
                                <Col lg='4' sm='4'>
                                    <FormGroup>
                                        <Label for="inputcorreo">Correo electronico</Label>
                                        <Input
                                            id="inputcorreo"
                                            bsSize='sm'
                                            name='correo'
                                            type='email'
                                            value={this.state.correo}
                                            onChange={this.onInputChange}
                                        />
                                        <FormText>Ejemplo: joselui@hotmail.com</FormText>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Divider className='m-2' />
                            <Label>REDES SOCIALES</Label>
                            <Row form>
                                <Col lg='3'>
                                    <InputGroup size='sm'>
                                        <InputGroupAddon addonType="append"><FacebookIcon color='primary' /></InputGroupAddon>
                                        <Input
                                            name='facebook'
                                            value={this.state.facebook}
                                            onChange={this.onInputChange}
                                        />
                                    </InputGroup>
                                </Col>
                                <Col lg='3'>
                                    <InputGroup size='sm'>
                                        <InputGroupAddon addonType="append"><WhatsAppIcon style={{ color: green[500] }} /></InputGroupAddon>
                                        <Input
                                            name='whatsapp'
                                            value={this.state.whatsapp}
                                            onChange={this.onInputChange}
                                        />
                                    </InputGroup>
                                </Col>
                                <Col lg='3'>
                                    <InputGroup size='sm'>
                                        <InputGroupAddon addonType="append"><TwitterIcon style={{ color: lightBlue[500] }} /></InputGroupAddon>
                                        <Input
                                            name='twiter'
                                            value={this.state.twiter}
                                            onChange={this.onInputChange}
                                        />
                                    </InputGroup>
                                </Col>
                                <Col lg='3'>
                                    <InputGroup size='sm'>
                                        <InputGroupAddon addonType="append"><InstagramIcon style={{ color: purple[500] }} /></InputGroupAddon>
                                        <Input
                                            name='instagram'
                                            value={this.state.instagram}
                                            onChange={this.onInputChange}
                                        />
                                    </InputGroup>
                                </Col>
                            </Row>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="link" onClick={this.toggle}>Cancel</Button>
                            <Button size='sm' type='submit' color='danger' onClick={() => handleConductor(this.state.newConductor, this.state.fotografia)} >Registrar</Button>
                        </ModalFooter>
                    </Form>
                </Modal>
            </div>
        );
    }
}
export default ModalRegistro;