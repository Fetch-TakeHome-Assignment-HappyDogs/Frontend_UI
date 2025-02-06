import React from "react";
import {
    Grid2 as Grid,
    Button,
    TextField,
    Tooltip,
    IconButton
} from '@mui/material';

import {
    Search as SearchIcon,
    SwapVert as SwapVertIcon
} from '@mui/icons-material';


const SearchEngine = (props) => {
    const [ search, setSearch] = React.useState("");
    const [ city, setCity] = React.useState("");

    const handleChangeSearch = (evt) => {
        console.log( "prajwal here is teh change ...", props);

        setSearch( evt.target.value);
        props.searchIds( evt.target.value );

    }

    return (
        <Grid
            container
            spacing={4}
            alignItems="center"
            justifyContent="center"
        >
            <Grid item size = {{ md:4.5 }}>
                <TextField
                    fullWidth
                    size="small"
                    label = "Search Dog Name"
                    value = {search}
                    onChange={handleChangeSearch}
                />
            </Grid>
            <Grid item size = {{ md:4.5 }}>
                <TextField
                    fullWidth
                    size="small"
                    label = "City"
                    value = {city}
                    onChange={(evt) => setCity( evt.target.value)}
                />
            </Grid>
            <Grid item size = {{ md:1.5 }}>
                <Button
                    color = "primary"
                    fullWidth
                    startIcon = {<SearchIcon/>}
                    variant = "contained"
                >
                    City
                </Button>
            </Grid>
            <Grid item size = {{ md:1 }}>
                <Button
                    color = "primary"
                    fullWidth
                    variant = "contained"
                >
                    Adv.
                </Button>
            </Grid>

            <Grid item size = {{ md:0.5 }}>
                <Tooltip title="Sort Names">
                    <IconButton sx={{
                            backgroundColor: "white",
                            marginRight: "30px"
                        }}
                        onClick={props.handleSort}
                    >
                        <SwapVertIcon color="primary"/>
                    </IconButton>
                </Tooltip>
            </Grid>
        </Grid>
        
    )
}

export default SearchEngine;