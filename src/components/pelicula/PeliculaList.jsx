import React, { useEffect, useState } from "react";
import * as  PeliculaService from '../service/PeliculaService';
import PeliculaItem from './PeliculaItem'

const PeliculaList = ({setAlquiler}) => {
    const [peliculas, setPeliculas] = useState([])
    const [filtro, setFiltro] = useState("");

    const listPeliculas = async () => {
        try {
            const res = await PeliculaService.listPeliculas();
            const datos = await res.json()
            setPeliculas(datos.peliculas)
        } catch (error) {
            console.log(error);
        }
    };
    const busqueda = (e) => {
        setFiltro(e.target.value)
    }

    let peliculasFiltro = []
    if (!filtro) {
        peliculasFiltro = peliculas
    } else {
        peliculasFiltro = peliculas.filter((dato) =>
            dato.nombre.toLowerCase().includes(filtro.toLowerCase())
        )
    }

    useEffect(() => {
        listPeliculas();
    }, []);

    return (
        <div className="row">
            <div className="col-12 mb-2">
                <div className="input-group mb-3 mt-4">
                    <input type="text" placeholder="Buscar pelicula..." value={filtro} className="form-control border-input" aria-label="descripción"
                        aria-describedby="inputGroup-sizing-default" onChange={busqueda} />
                </div>
            </div>
            {
                peliculasFiltro.map((pelicula) => {
                    return <PeliculaItem key={pelicula.codigo} {...{pelicula, setAlquiler}} />
                }
                )
            }
        </div>
    )
}

export default PeliculaList;