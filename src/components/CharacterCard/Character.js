import React from "react";
import "./Character.css";


const CharacterCard = ({ id, name, image, handleChosen }) => (
    <div>
        <div
            className="card"
            key={id}
            data-id={id}
            name={name}
            style={{ backgroundImage: `url(${image})` }}
            onClick={handleChosen}
        >
        </div>
    </div>
)

export default CharacterCard;