import React from "react";
import "./Alerts.css";

const Alert = props => (
    <div className="default" style={props.style}>
        {props.message ? (
            <p>{props.message}</p>
        ) : (
                <p className="default-msg black">Click an image to begin!</p>
            )}
    </div>
)

export default Alerts;