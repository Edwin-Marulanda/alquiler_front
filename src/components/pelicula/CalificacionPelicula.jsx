import React from "react";

const CalificacionPelicula = ({ puntuacion }) => {
    const star = require.context('../../assets/back/')


    return Array.from(
        { length: 5 },
        (_, i) => (
            <div key={i} className="col-2 ps-1">
                {i<puntuacion?<img src={star(`./cal-pos.png`)} width='14' height='14' />:
                <img src={star(`./cal-neg.png`)} width='14' height='14' />}
            </div>
        )
    );
    
}

export default CalificacionPelicula
