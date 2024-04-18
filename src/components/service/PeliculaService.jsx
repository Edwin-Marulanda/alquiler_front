const API_URL= "http://127.0.0.1:8000/api/peliculas";

export const listPeliculas = async ()=>{
    return await fetch(API_URL)
}

