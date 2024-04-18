
const API_URL = "http://127.0.0.1:8000/api/clientes/";

export const listaClientes = async() => {
    return await fetch(API_URL)
}

export const clientesPorCedula = async(cedula) => {
    return await fetch(`${API_URL}${cedula}`)
}