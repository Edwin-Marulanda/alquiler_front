import React, { useEffect, useState } from "react";
import * as  DetalleAlquilerService from '../service/DetalleAlquilerService';
const CarroAlquiler = ({ cliente, alquiler, setAlquiler }) => {

    const peliculasImg = require.context('../../assets/imagenes');
    const [total, setTotal] = useState(0)

    const eliminarPelicula = async (pelicula) => {
        const indiceEliminar = alquiler.findIndex(peliculaData => peliculaData.id === pelicula.id);
        
        if (indiceEliminar !== -1) {
            const nuevaListaPeliculas = [...alquiler];
            nuevaListaPeliculas.splice(indiceEliminar, 1);
            setAlquiler(nuevaListaPeliculas);
        }

    }

    const alquilarPelicula = async (e) => {
        e.preventDefault();
        let requestAlquiler = []
        for (let i = 0; i < alquiler.length; i++) {
            const detalleAlquiler = {
                "cliente": cliente.id,
                "pelicula": alquiler[i].id,
                "valor": alquiler[i].genero.valor,
                "estado": "A"
            }
            try {

                requestAlquiler.push(
                    await DetalleAlquilerService.registrarDetalleAlquiler(detalleAlquiler)
                )

            } catch (error) {
                console.log(error)
            }
        }

        Promise.all(requestAlquiler).then(() => {
            setAlquiler([])
            console.log('done')
        })


    };

    useEffect(() => {
        let totalCalculado = 0;
        alquiler.forEach(pelicula => {
            totalCalculado += pelicula.genero.valor;
        });
        setTotal(totalCalculado);
    }, [alquiler]);

    return (
        <div className="row border-input">
            <div className="col-12 border-input p-4 d-flex justify-content-end align-items-center">
                <div className="fw-bold me-5">
                    Total: $ {total}
                </div>
                <form onSubmit={alquilarPelicula}>
                    <button type="submit" className="btn btn-success">Alquilar</button>
                </form>
            </div>
            <div className="col-12 border-input">{
                <table className="table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>valor</th>
                            <th>Acciones</th>
                        </tr>

                    </thead>
                    <tbody>
                        {alquiler.map((pelicula, index) => {
                            return (
                                <tr key={index}>
                                    <td><img src={peliculasImg(`./${pelicula.id}.jpg`)} width='80' /></td>
                                    <td>{pelicula.nombre}</td>
                                    <td className="w-50">{pelicula.descripcion}</td>
                                    <td>${pelicula.genero.valor}</td>
                                    <td>
                                        <button onClick={() => eliminarPelicula(pelicula)} className="btn btn-danger">Eliminar</button>
                                    </td>

                                </tr>)
                        }
                        )}

                    </tbody>
                </table>


            }
            </div>
        </div>
    )
}

export default CarroAlquiler