import React from "react";
import {
    Typography,
    Grid2 as Grid
} from '@mui/material';

const Login_Screen = (props) => {
    const [ name, setName] = React.useState("");
    const [ email, setEmail] = React.useState("");

    return (
        <React.Fragment>
            <Grid
                container
                style={{ height: '100vh'}}
                >
                <Grid item size={8} style={{ backgroundColor: 'white' }}>
                    {/* Content for the 8-column grid */}
                    <h1>Left Section</h1>
                </Grid>
                <Grid item size={4} style={{ backgroundColor: 'gray' }}>
                    {/* Content for the 4-column grid */}
                    <h1>Right Section</h1>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default Login_Screen;