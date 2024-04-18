const API_URL = "http://127.0.0.1:8000/api/genero/";

export const listaGeneros = async() => {
    return await fetch(API_URL)
}

export const actualizarValor = async (genero) => {
    return await fetch(`${API_URL}${genero.id}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            "id":genero.id,
            "valor": genero.valor
        })
    })
}