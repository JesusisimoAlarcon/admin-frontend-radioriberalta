import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText, Button } from 'reactstrap';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
class ModalRegistro extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nombre: '',
            descripcion: '',
            genero: 0,
            modal: false
        };
        this.toggle = this.toggle.bind(this);
    }
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

    onSelectChange = (e) => {
        this.setState({
            genero: e.target.value
        })
    }



    onSubmit = async (e) => {
        e.preventDefault();
        this.setState({
            nombre: '',
            descripcion: '',
            genero: 0
        })
        this.toggle();
    }
    render() {
        const { generos, handleList } = this.props;

        return (
            <span className="d-inline-block mb-2 mr-2">
                <Button color="dark" onClick={this.toggle}>Nuevo programa</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <Form onSubmit={this.onSubmit}>
                        <ModalHeader toggle={this.toggle}>DATOS DEL PROGRAMA</ModalHeader>
                        <ModalBody>
                            <FormGroup>
                                <Label for="inputprograma">Nombre</Label>
                                <Input
                                    id="inputprograma"
                                    name='nombre'
                                    value={this.state.nombre}
                                    onChange={this.onInputChange}
                                />
                                <FormText>Ejemplo: El tren de la mañana</FormText>
                            </FormGroup>

                            <FormGroup>
                                <Label for="inputdescripcion">Descripcion</Label>
                                <TextareaAutosize
                                    name='descripcion'
                                    value={this.state.descripcion}
                                    id="inputdescripcion"
                                    className="form-control"
                                    onChange={this.onInputChange}
                                    rowsMin={3} />
                                <FormText>Ejemplo: Programa matutino noticiero informacion local, nacional e internacional, entrevistas a invitados.</FormText>
                            </FormGroup>

                            <FormGroup>
                                <Label for="selectgenero">Genero</Label>
                                <Input type="select" bsSize="sm" id="selectgenero" name='genero' onChange={this.onSelectChange}>
                                    <option value={0}>Seleccione un genero...</option>
                                    {generos.map(genero =>
                                        <option key={genero.idgenero} value={genero.idgenero}>{genero.idgenero + ' - ' + genero.genero}</option>
                                    )}
                                </Input>
                                <FormText>Ejemplo: Musica variada, noticias o enlaces.</FormText>
                            </FormGroup>

                        </ModalBody>
                        <ModalFooter>
                            <Button color="link" onClick={this.toggle}>Cancel</Button>
                            <Button size='sm' color='danger' onClick={() => handleList(this.state.nombre, this.state.descripcion, this.state.genero)} type='submit'>REGISTRAR</Button>
                        </ModalFooter>
                    </Form>
                </Modal>
            </span>
        );
    }
}

export default ModalRegistro;
