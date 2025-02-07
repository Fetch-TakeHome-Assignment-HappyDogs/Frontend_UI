import React from "react";
import {
    Grid2 as Grid,
    Typography,
    Button,
    IconButton,
    Tooltip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Alert,
    Stack
} from '@mui/material';
import { 
    Logout,
    Favorite as FavoriteIcon
} from "@mui/icons-material";
import axios from 'axios';

const Header = (props) => {
    const [ showBestMatch, setShowBestMatch] = React.useState( false );
    const [ match, setMatch] = React.useState({
        name: null,
        age: null,
        breed: null
    });

    const handleLogout = ( evt ) => {
        evt.preventDefault();
        axios.post('https://frontend-take-home-service.fetch.com/auth/logout')
        .then((response) => {
            console.log("Successfully logged out!")
        })
        .catch((error) => {
            console.error('Error:', error);
        });
        window.location.reload();
    }

    const handleMatchClick = (evt) => {
        if( props.favList.length == 0){
            window.alert('Please add atleast one dog in your favoutite list.');
            return
        }
        setShowBestMatch(true);

        axios.post("https://frontend-take-home-service.fetch.com/dogs/match",
            props.favList
        ).then((res) => {
            for( let i = 0 ; i < props.cards.length; i++){
                if( props.cards[i]["id"] == res.data.match){
                    setMatch( props.cards[i] );
                    break;
                }
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            window.alert('Something went wrong.');
        });
    }



    return (
        <React.Fragment>
            <Dialog
                open={showBestMatch}
                onClose={()=>setShowBestMatch(false)}
                maxWidth = "md"
                fullWidth
            >
                <DialogTitle>{"Best Match for you"}</DialogTitle>
                
                <DialogContent>
                    <Stack sx={{ width: '100%' }} spacing={2}>
                        <Alert  severity="success">
                            <Typography variant="h3">Success, We found a match!</Typography>
                            <br/>
                            <Typography variant="h1">{match.name}</Typography>
                            <Typography variant="h5">Age: {match.age}</Typography>
                            <Typography variant="h5">Breed: {match.breed}</Typography>
                            <br/><br/><br/>
                            <Typography variant="h5"> Thank you so much for using our website.</Typography>
                        </Alert>
                    </Stack>
                    
                </DialogContent>
                
                <DialogActions>
                    <Button onClick={()=>setShowBestMatch(false)} autoFocus>Close</Button>
                </DialogActions>
            </Dialog>


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
                        color = "info"
                        fullWidth
                        startIcon = {<FavoriteIcon/>}
                        variant = "outlined"
                        sx={{backgroundColor:"white"}}
                        onClick = { handleMatchClick }
                    >
                        <b>Best Match for you</b>
                    </Button>
                </Grid>

                <Grid className = "centerGrid" item size = {{ md:1 }}>
                    <Tooltip title="Log out">
                        <IconButton
                            onClick={handleLogout} 
                            sx={{
                                backgroundColor: "white",
                                marginRight: "30px"
                            }}>
                            <Logout color = "error"/>
                        </IconButton>
                    </Tooltip>
                </Grid>
            </Grid>
        </React.Fragment>

        
    )
}

export default Header;