import React from "react";
import Grid from '@material-ui/core/Grid';

const Grid = props =>
    <Grid {...props}>
        {props.children}
    </Grid>

export default Grid;