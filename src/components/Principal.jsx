import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


//componentes
import PeliculaList from './pelicula/PeliculaList';
import HomeAdmin from "./Home/HomeAdmin";
import NavbarAdmin from "./Navbar/NavbarAdmin";
import Navbar from './Navbar/Navbar';
import Login from './Login/Login'
import CarroAlquiler from "./carroalquiler/CarroAlquiler";
import HistorialAlquiler from './pelicula/HistorialAlquiler'
import Genero from "./Genero/Genero";

const Principal = () => {
    const [cliente, setCliente] = useState(null)
    const [alquiler, setAlquiler] = useState([])


    return (
        cliente == null
            ? <Login setCliente={setCliente} />
            : cliente.nombres === "admin"
                ? (
                    <Router>
                        <NavbarAdmin {...{ cliente,setCliente}} />
                        <Routes>
                            <Route exact path="/" element={<HomeAdmin />} />
                            <Route exact path="/generos" element={<Genero />} />
                        </Routes>
                    </Router>
                )
                : (
                    <Router>
                        <Navbar {...{ cliente, alquiler, setCliente }} />
                        <Routes>
                            <Route exact path="/" element={<PeliculaList {...{setAlquiler}} />} />
                            <Route path="/alquiladas" element={<HistorialAlquiler cliente={cliente} />} />
                            <Route path="/carroalquiler" element={<CarroAlquiler {...{ cliente, alquiler, setAlquiler }} />} />
                        </Routes>
                    </Router>
                )
    )
}

export default Principal 