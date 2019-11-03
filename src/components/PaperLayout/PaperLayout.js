import React from "react";
import Paper from "@material-ui/core/Paper";

const PaperLayout = props => (
    <Paper>
        {props.children}
    </Paper>
)

export default PaperLayout;