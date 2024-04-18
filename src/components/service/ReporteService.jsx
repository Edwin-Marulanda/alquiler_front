const API_URL= "http://127.0.0.1:8000/api/reporte";

export const reporte = async ()=>{
    return await fetch(API_URL)
}
