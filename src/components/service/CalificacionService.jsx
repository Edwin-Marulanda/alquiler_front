const API_URL = "http://127.0.0.1:8000/api/calificacion/";

export const registrarCalificacion= async(calificacion) =>{
        return await fetch(API_URL, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                "puntuacion": calificacion.puntuacion,
                "comentario": calificacion.comentario,
                "pelicula": calificacion.pelicula
            })
        })
    

}