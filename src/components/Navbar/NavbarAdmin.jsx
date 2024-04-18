import React from "react";
import { Link } from "react-router-dom";

const imgBack = require.context('../../assets/back')

const NavbarAdmin = ({ cliente, setCliente }) => {

    const cerrarSesoin = async () => {
        setCliente(null)
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <img src={imgBack(`./logo.png`)} width='140' />
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Inicio</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/generos">Generos</Link>
                        </li>

                    </ul>

                </div>

                <div className="d-flex justify-content-right align-items-center">
                    <div className="row">

                        <div className="col-5">
                            <span className="text-white fw-bold">
                                {cliente.nombres}
                            </span>
                        </div>
                        <div className="col-4">
                            <button className="btn btn-success" onClick={() => cerrarSesoin()}> Salir</button>
                        </div>
                    </div>

                </div>
            </div>
        </nav>
    )
}

export default NavbarAdmin