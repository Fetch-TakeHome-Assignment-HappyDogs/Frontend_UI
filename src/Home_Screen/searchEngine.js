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
    SwapVert as SwapVertIcon,
    Close
} from '@mui/icons-material';


const SearchEngine = (props) => {
    const [ search, setSearch] = React.useState("");
    const [ city, setCity] = React.useState("");
    const [ minAge, setMinAge] = React.useState(null);
    const [ maxAge, setMaxAge] = React.useState(null);

    const handleChangeSearch = (evt) => {
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
            <Grid item size = {{ md:4 }}>
                <TextField
                    fullWidth
                    size="small"
                    label = "Search Dog Name"
                    value = {search}
                    onChange={handleChangeSearch}
                />
            </Grid>
            <Grid item size = {{ md:3 }}>
                <TextField
                    fullWidth
                    size="small"
                    label = "City"
                    value = {city}
                    onChange={(evt) => setCity( evt.target.value )}
                />
            </Grid>

            <Grid item size = {{ md:1 }}>
                <TextField
                    fullWidth
                    size="small"
                    label = "Max Age"
                    value = {maxAge}
                    onChange={(evt) => {
                        setMaxAge( evt.target.value);
                        props.setMaxAge( evt.target.value );
                    }}
                />
            </Grid>

            <Grid item size = {{ md:1 }}>
                <TextField
                    fullWidth
                    size="small"
                    label = "Min Age"
                    value = {minAge}
                    onChange={(evt) => {
                        setMinAge( evt.target.value );
                        props.setMinAge( evt.target.value );
                    }}
                />
            </Grid>

            <Grid item size = {{ md:2 }}>
                <Button
                    color = "primary"
                    fullWidth
                    startIcon = {<SearchIcon/>}
                    variant = "contained"
                    onClick = { () => props.handleCityChange(city)}
                >
                    Search Dogs
                </Button>
            </Grid>

            <Grid item size = {{ md:0.5 }}>
                <Tooltip title="Remove Filters">
                    <IconButton sx={{
                            backgroundColor: "white",
                            marginRight: "30px"
                        }}
                        onClick={()=>{
                            setCity("");
                            setMaxAge("");
                            setMinAge("");
                            props.cleanFilter()
                        }}
                    >
                        <Close color="error"/>
                    </IconButton>
                </Tooltip>
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