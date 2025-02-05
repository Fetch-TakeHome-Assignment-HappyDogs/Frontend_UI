import React from "react";
import {
    Grid2 as Grid,
    Typography,
    Button,
    IconButton,
    Tooltip
} from '@mui/material';
import { 
    Logout,
    Favorite as FavoriteIcon
} from "@mui/icons-material";



const Header = (props) => {
    return (
        <Grid
            container
            spacing={4}
            alignItems="center"
            justifyContent="center"
            sx={{
                background: "linear-gradient(90deg, #000000 0%, #002F6C 35%,rgb(96, 160, 196) 100%)",
                height: '7vh'
            }}
        >
            <Grid item size = {{ md:4 }}>
                <Typography
                    sx={{
                        ml: 2,
                        flex: 1,
                        color: "white",
                    }}
                    variant="h4"
                > Pawfect Companions
                </Typography>
            </Grid>
            <Grid item size = {{ md:5 }}></Grid>

            <Grid className = "centerGrid" item size = {{ md:2 }}>
                <Button
                    color = "secondary"
                    fullWidth
                    startIcon = {<FavoriteIcon/>}
                    variant = "contained"
                >
                    View Favorite
                </Button>
            </Grid>

            <Grid className = "centerGrid" item size = {{ md:1 }}>
                <Tooltip title="Log out">
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

export default Header;