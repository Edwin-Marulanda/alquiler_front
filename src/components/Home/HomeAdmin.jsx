import React, { useEffect, useState } from "react";
import * as  ReporteService from '../service/ReporteService';

const HomeAdmin = () => {

    const [reporteList, setReporteList] = useState([])
    const peliculasImg = require.context('../../assets/imagenes');

    const reporte = async () => {
        try {
            const res = await ReporteService.reporte();
            const datos = await res.json()
            setReporteList(datos.reporte)
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        reporte();
    }, []);

    return (
        <div className="row border-input mt-2">
            <div className="col-12 border-input text-center text-white p-5">
                <h3>Reporte de alquiler</h3>
            </div>
            <div className="col-12 mb-2">
                <table className="table">
                    <thead class="thead-dark">
                        <tr>
                            <th></th>
                            <th>Nombre pelicula</th>
                            <th className="text-center">Veces alquilada</th>
                            <th>Total valor alquiler</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            reporteList.map((reporte) => {
                                return (
                                    <tr>
                                        <td><img src={peliculasImg(`./${reporte.id}.jpg`)} width='70' /></td>
                                        <td className="w-25">{reporte.nombre}</td>
                                        <td className="fw-bold h5 text-center">{reporte.num_alquilada}</td>
                                        <td>{reporte.total}</td>
                                    </tr>
                                )
                            })

                        }

                    </tbody>
                </table>


            </div>
        </div>
    )
}

export default HomeAdmin