import React, { useEffect, useState } from "react";
import * as DetalleAlquilerService from '../service/DetalleAlquilerService';
import * as CalificacionService from '../service/CalificacionService';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const HistorialAlquiler = ({cliente}) => {
    const [show, setShow] = useState(false);
    const [puntos, setPuntos] = useState(1);
    const [comentario,setComentario] = useState();

    const [alquiladas, setAlquiladas] = useState([]);

    const [peldevolver, setPelDevolver] = useState({
        "id": "",
        "pelicula": {
            "pelicula_id": "",
            "nombre": ""

        }
    });
    const peliculasImg = require.context('../../assets/imagenes');
    const handleClose = () => {
        setShow(false)
    };

    const handleShow = (alquilada) => {
        setShow(true)
        setPelDevolver({
            "id": alquilada.id,
            "pelicula": {
                "pelicula_id": alquilada.pelicula.pelicula_id,
                "nombre": alquilada.pelicula.nombre

            }
        })
    };

    const calificacionChange = (e) => {
        setPuntos(parseInt(e.target.value));
    };

    const comentarioChange = (e) => {
        setComentario(e.target.value);
    };

    const listDetallesAlquiler = async () => {
        try {
            const res = await DetalleAlquilerService.detalleAlquilerPorCliente(cliente.id);
            const datos = await res.json()
            setAlquiladas(datos.detalles_alquiler)
        } catch (error) {
            console.log(error);
        }
    };

    const devolverPelicula = async () => {
        const calificacion = {
            "puntuacion": puntos,
            "comentario": comentario,
            "pelicula": peldevolver.pelicula.pelicula_id
        }

        try {
            await CalificacionService.registrarCalificacion(calificacion)
            await DetalleAlquilerService.actualizarDetalleAlquiler(peldevolver)
            listDetallesAlquiler()
            setPuntos(1)
        } catch (error) {
            console.log(error)
        }

        setShow(false)
    }

    useEffect(() => {
        listDetallesAlquiler();
    }, []);

    return (

        <div className="row border-input mt-2">
            <div className="col-12 text-center p-5 border-input">
                <h3>Historial de alquiler</h3>
            </div>
            <div className="col-12 bg-light">{
                <table className="table">
                    <thead>
                        <tr>
                            <th ></th>
                            <th className="w-25">Pelicula</th>
                            <th className="w-25">Genero</th>
                            <th className="w-25">valor alquiler</th>
                            <th className="w-25">Fecha alquiler</th>
                            <th className="w-25">Acciones</th>
                        </tr>

                    </thead>
                    <tbody>
                        {
                        alquiladas!=undefined?
                        alquiladas.map((alquilada) => {
                            return (
                                <tr key={alquilada.id}>
                                    <td><img src={peliculasImg(`./${alquilada.pelicula.pelicula_id}.jpg`)} width='80' /></td>
                                    <td>{alquilada.pelicula.nombre}</td>
                                    <td>{alquilada.pelicula.genero}</td>
                                    <td>${alquilada.valor}</td>
                                    <td>{alquilada.fecha}</td>
                                    <td>
                                        {
                                            alquilada.estado === 'A' ? <button onClick={() => handleShow(alquilada)} className="btn btn-danger">Devolver</button> : ''
                                        }

                                    </td>

                                </tr>)
                        }
                        ):""
                    }

                    </tbody>
                </table>
            }
            </div>
            <div className="row">
                <div className="col-12">
                    <Modal show={show} onHide={handleClose} >
                        <Modal.Header >
                            <Modal.Title>Devolver pelicula: {peldevolver.pelicula.nombre}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">Calificación</label>
                                    <p className="m-1"></p>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="inlineRadioOptions"
                                            onChange={calificacionChange} id="inlineRadio1" value={1} checked={puntos === 1} />
                                        <label className="form-check-label" htmlFor="inlineRadio1">1</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="inlineRadioOptions"
                                            onChange={calificacionChange} checked={puntos === 2} id="inlineRadio2" value={2} />
                                        <label className="form-check-label" htmlFor="inlineRadio2">2</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="inlineRadioOptions"
                                            onChange={calificacionChange} checked={puntos === 3} id="inlineRadio2" value={3} />
                                        <label className="form-check-label" htmlFor="inlineRadio2">3</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="inlineRadioOptions"
                                            onChange={calificacionChange} checked={puntos === 4} id="inlineRadio2" value={4} />
                                        <label className="form-check-label" htmlFor="inlineRadio2">4</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="inlineRadioOptions"
                                            onChange={calificacionChange} checked={puntos === 5} id="inlineRadio2" value={5} />
                                        <label className="form-check-label" htmlFor="inlineRadio2">5</label>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="comentario" className="form-label">Comentario</label>
                                    <textarea onChange={comentarioChange} className="form-control" id="comentario" rows="3"></textarea>
                                </div>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="warning" onClick={handleClose}>
                                Cancelar
                            </Button>
                            <Button variant="success" onClick={devolverPelicula}>
                                Devolver
                            </Button>
                        </Modal.Footer>
                    </Modal>

                </div>
            </div>
        </div>
    )
}

export default HistorialAlquiler 