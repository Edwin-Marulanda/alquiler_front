import React from "react";
import { Link } from "react-router-dom";

const imgBack = require.context('../../assets/back')

const Navbar = ({ cliente, alquiler,setCliente }) => {

    const cerrarSesoin = async ()=>{
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
                            <Link className="nav-link active" aria-current="page" to="/">Incio</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/alquiladas">Historial alquiler</Link>
                        </li>
                    </ul>

                </div>

                <div className="d-flex justify-content-right align-items-center pe-3">
                    <div className="row">
                        <div className="col-4">
                            <button className="btn btn-success" onClick={()=>cerrarSesoin()}> Salir</button>
                        </div>
                        <div className="col-5">
                            <span className="text-white fw-bold">
                                {cliente.nombres} 
                            </span>
                        </div>
                        <div className="col-3">
                            <div>
                                <div className="notificaion">
                                    {alquiler.length}
                                </div>
                                <Link to="/carroalquiler">
                                    <img className="ms-2" src={imgBack(`./car-shop.png`)} width='30' />
                                </Link>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </nav>
    )
}

export default Navbar