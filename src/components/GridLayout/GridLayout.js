import React from "react";
import Grid from '@material-ui/core/Grid';

const GridLayout = props =>
    <Grid {...props}>
        {props.children}
    </Grid>

export default GridLayout;