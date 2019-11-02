import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const Nav = props => {
    return(
        <div>
        <AppBar position="fixed" {...props}>
            <Toolbar>
                <Typography variant="headline" color="inherit" align="center">
                Clicky Game
                </Typography>
            </Toolbar>
        </AppBar>
        </div>
    )
}
export default Nav;