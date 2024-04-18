import React, { useState } from "react";
import CalificacionPelicula from "./CalificacionPelicula";

const peliculasImg = require.context('../../assets/imagenes')

let peliculas = [];
const PeliculaItem = ({ pelicula, setAlquiler }) => {
    
    const agregarPelicula = (pelicula) => {
        peliculas.push(pelicula)
        const nuevaListaPeliculas = [...peliculas];
        setAlquiler(nuevaListaPeliculas)
    }

    const agregarPeliculaYAlquilar = (pelicula) => {
        peliculas.push(pelicula)
        const nuevaListaPeliculas = [...peliculas];
        setAlquiler(nuevaListaPeliculas)
    }

    return (
        <div className="col-2">
            <div className="card mb-3 ">
                <div className="card-body">
                    <div className="d-flex justify-content-center">
                        <img src={peliculasImg(`./${pelicula.id}.jpg`)} width='140' height='170' alt={`pelicula ${pelicula.id} `}/>
                        {
                            pelicula.cantidad === 0 ? <div className="text-not">
                                <p>No Disponible</p>
                            </div> : ''
                        }
                    </div>
                    <p className="st-valor">${pelicula.genero.valor}</p>
                    <div className="card-title ">
                        <h5>{pelicula.nombre}</h5>
                    </div>
                    <p className="card-text text-truncate mb-0" data-bs-toggle="tooltip" title={pelicula.descripcion} >
                        {pelicula.descripcion}
                    </p>


                    <div className="row">
                        <div className="col-5 pe-0">
                            <p className="text-secondary text-size mt-1 mb-2">{pelicula.genero.nombre}</p>
                        </div>
                        <div className="col-7 ps-0">
                            <div className="row">
                                <CalificacionPelicula puntuacion={pelicula.puntuacion} />

                            </div>

                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 d-flex justify-content-center">
                            <button disabled={pelicula.cantidad === 0} onClick={() => agregarPelicula(pelicula)} 
                            className="btn btn-warning ms-0">Agregar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default PeliculaItem