import React, { useState } from 'react';
import * as ClienteService from '../service/ClienteService';

const logoImg = require.context('../../assets/back')
const Login = ({ setCliente }) => {
    const [cedula, setCedula] = useState('');
    const [clave, setClave] = useState('');
    const [cedulaVacio, setCedulaVacio] = useState('');
    const [claveVacio, setClaveVacio] = useState('');
    const [registrado, setRegistrado] = useState(true);

    const handleCedulaChange = (e) => {
        setCedula(e.target.value);
    };

    const handleClaveChange = (e) => {
        setClave(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (cedula === "" && clave === "") {
            setCedulaVacio(true);
            setClaveVacio(true)
            return
        } else if (cedula === "") {
            setCedulaVacio(true)
            return
        } else if (clave === "") {
            setClaveVacio(true)
            return
        }

        setCedulaVacio(false)
        setClaveVacio(false)

        try {
            const res = await ClienteService.clientesPorCedula(cedula)
            const datosCliente = await res.json()

            if (datosCliente.mensaje==="correcto") {
                setCliente(datosCliente.cliente)
                setRegistrado(true);
            } else {
                setRegistrado(false);
            }
        } catch (error) {

        }



    };



    return (
        <div className="container mt-5 d-flex justify-content-center align-items-center">

            <div id="texto-inicio">
                <p>Alquila las mejores peliculas de comedia, acción y romance.</p>
            </div>

            <div className="row position-absolute top-50 start-50 translate-middle">
                <div className="col-12 text-center text-white mb-4 h3">
                    Inicio de sesión
                </div>
                <div className="col-12">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <input
                                type="number"
                                id="cedula"
                                placeholder="Cédula"
                                value={cedula}
                                onChange={handleCedulaChange}
                                className="form-control border-input"
                            />
                            <div className='text-white'>
                                {cedulaVacio && <p>Cédula es obligatorio</p>}
                            </div>
                        </div>
                        <div className="mb-3">
                            <input
                                type="password"
                                id="clave"
                                placeholder="Clave"
                                value={clave}
                                onChange={handleClaveChange}
                                className="form-control border-input"
                            />
                            <div className='text-white'>
                                {claveVacio && <p>Clave es obligatorio</p>}
                            </div>
                        </div>
                        <div className='d-flex justify-content-center'>
                            <button type="submit" className="btn btn-backcolor mt-3">
                                Iniciar Sesión
                            </button>
                        </div>
                    </form>
                </div>

            </div>
            <img className='position-absolute bottom-0 start-0 pb-5 ps-2' src={logoImg(`./logo.png`)} width='280' />
        </div>
    );
};

export default Login;
