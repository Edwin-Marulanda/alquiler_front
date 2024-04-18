import React, { useEffect, useState } from "react";
import * as GeneroService from '../service/GeneroService';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


const Genero = () => {
    const [generos, setGeneros] = useState([]);
    const [show, setShow] = useState(false);
    const [valor, setValor] = useState(null);
    const [generoEditar, setGeneroEditar] = useState(
       { "id": "",
        "nombre": "",
        "valor": ""}
    );

    const listarGeneros = async () => {
        try {
            const res = await GeneroService.listaGeneros();
            const datos = await res.json()
            setGeneros(datos.generos)
        } catch (error) {
            console.log(error);
        }
    };

    const editarGenero = async () => {
        const generoEdit = {
            "id": generoEditar.id,
            "valor": valor,
        }

        try {
            await GeneroService.actualizarValor(generoEdit)
            listarGeneros()
            setValor(null)
        } catch (error) {
            console.log(error)
        }

        setShow(false)
    }


    useEffect(() => {
        listarGeneros();
    }, []);


    const cerrarModalEdicion = () => {
        setShow(false)
    };

    const abrirModalEdicion = (genero) => {
        setShow(true)
        setGeneroEditar({
            "id": genero.id,
            "nombre": genero.nombre,
            "valor": genero.valor
        })
        setValor(genero.valor)
    };

    const valorChange = async (e) => {
        setValor(e.target.value);
    };

    return (
        <div className="row border-input mt-2">
            <div className="col-12 text-center p-5 border-input">
                <h3>Generos</h3>
            </div>
            <div className="col-12 bg-light">{
                <table className="table">
                    <thead>
                        <tr>
                            <th className="w-25">Nombre</th>
                            <th className="w-25">Valor</th>
                            <th className="w-25">Acciones</th>
                        </tr>

                    </thead>
                    <tbody>
                        {
                            generos !== undefined ?
                                generos.map((genero) => {
                                    return (
                                        <tr key={genero.id}>
                                            <td>{genero.nombre}</td>
                                            <td>$ {genero.valor}</td>
                                            <td>
                                                {
                                                    <button onClick={() => abrirModalEdicion(genero)} className="btn btn-danger">
                                                        Editar
                                                    </button>
                                                }

                                            </td>

                                        </tr>)
                                }
                                ) : ""
                        }

                    </tbody>
                </table>
            }
            </div>
            <div className="row">
                <div className="col-12">
                    <Modal show={show} onHide={cerrarModalEdicion} >
                        <Modal.Header >
                            <Modal.Title>Edición genero: {generoEditar.nombre}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form>

                                <div className="mb-3">
                                    <label htmlFor="valor" className="form-label">Valor</label>
                                    <input onChange={valorChange} className="form-control" id="valor" value={valor}/>
                                </div>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="warning" onClick={cerrarModalEdicion}>
                                Cancelar
                            </Button>
                            <Button variant="success" onClick={() => editarGenero()}>
                                Editar
                            </Button>
                        </Modal.Footer>
                    </Modal>

                </div>
            </div>
        </div>
    )
}

export default Genero