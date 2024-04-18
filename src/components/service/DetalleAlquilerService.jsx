const API_URL = "http://127.0.0.1:8000/api/alquiler/";

export const registrarDetalleAlquiler = async (detalleAlquiler) => {
    return await fetch(API_URL, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            "cliente": detalleAlquiler.cliente,
            "pelicula": detalleAlquiler.pelicula,
            "valor": detalleAlquiler.valor,
            "estado": detalleAlquiler.estado
        })
    })
}

export const actualizarDetalleAlquiler = async (alquilada) => {
    return await fetch(`${API_URL}${alquilada.id}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            "id":alquilada.id,
            "estado": "E"
        })
    })
}

export const detalleAlquilerPorCliente = async (cliente_id) => {
    return await fetch(API_URL+`${cliente_id}`)
    
}


