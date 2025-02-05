import React from "react";
import {
    Grid2 as Grid,
    Button,
    TextField
} from '@mui/material';

import {
    Search as SearchIcon
} from '@mui/icons-material';

const SearchEngine = (props) => {
    return (
        <Grid
            container
            spacing={4}
            alignItems="center"
            justifyContent="center"
        >
            <Grid item size = {{ md:4 }}>
                <TextField
                    fullWidth
                    size="small"
                    label = "Search Dog"
                />
            </Grid>
            <Grid item size = {{ md:4 }}>
                <TextField
                    fullWidth
                    size="small"
                    label = "City"
                />
            </Grid>
            <Grid item size = {{ md:2 }}>
                <Button
                    color = "primary"
                    fullWidth
                    startIcon = {<SearchIcon/>}
                    variant = "contained"
                >
                    Search Dogs
                </Button>
            </Grid>
            <Grid item size = {{ md:1 }}></Grid>

            <Grid item size = {{ md:1 }}>
                <Tooltip title="Advance Search">
                    <IconButton sx={{
                            backgroundColor: "white",
                            marginRight: "30px"
                        }}>
                        <Logout color = "error"/>
                    </IconButton>
                </Tooltip>
            </Grid>
        </Grid>
        
    )
}

export default SearchEngine;