import React from "react";
import {
    Typography,
    Grid2 as Grid,
    TextField,
    Button
} from '@mui/material';
import wallpaperImg from './wallpaper.jpg';
import HomeScreen from "../Home_Screen/home_screen";
import axios from 'axios';

axios.defaults.baseURL = 'https://frontend-take-home-service.fetch.com';
axios.defaults.withCredentials = true;  

const Login_Screen = (props) => {
    const [ name, setName] = React.useState("");
    const [ email, setEmail] = React.useState("");
    const [ showHome, setShowHome] = React.useState(false);

    const handleLogin = (event) => {
        event.preventDefault();
        if( name.length == 0 || email.length == 0){
            window.alert('Please provide both name and email.');
            return
        }
        var bodyData = { name : name, email : email }
        
        axios.post(
            'https://frontend-take-home-service.fetch.com/auth/login', 
            bodyData
        ).then((response) => {
            console.log("Response: ", response.data);
            setShowHome( true );
        }).catch((error) => {
            console.error('Error:', error);
        });
    };

    return (
        <React.Fragment>
            {showHome?(
                <HomeScreen/>
            ):(
                <Grid
                    container
                    className = "fullHeight"
                    >
                    <Grid item size={{ md:8 }}>
                        <img 
                            src={wallpaperImg} 
                            alt="Sorry, No image found!" 
                            className = "fullHeight centerFullWidth"
                        />
                    </Grid>
                    <Grid item size={{ md:4 }}>
                        <Grid container direction="column" spacing={2}>
                            <Grid item size={{ md:12 }} className = "loginCard_1"></Grid>
                            <Grid item size={{ md:12 }} className = "loginCard_3 centerGrid">
                                <Typography  variant="h2" className = "headingClass">Shelter App</Typography>
                            </Grid>
                            <Grid item size={{ md:12 }} className = "loginCard_1">
                                <TextField 
                                    label="Name"
                                    value = {name}
                                    variant="outlined" 
                                    onChange={(evt)=>setName(evt.target.value)}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item size={{ md:12 }} className = "loginCard_1">
                                <TextField 
                                    label="Email" 
                                    value = {email}
                                    variant="outlined" 
                                    onChange={(evt)=>setEmail(evt.target.value)}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item size={{ md:12 }} className = "loginCard_1">
                                <Button 
                                    variant="contained" 
                                    onClick={handleLogin}
                                    fullWidth
                                    size="large"
                                > 
                                    Submit 
                                </Button>
                            </Grid>
                            <Grid item size={{ md:12 }} className = "loginCard_3"></Grid>
                        </Grid>
                    </Grid>
                </Grid>
            )}
        </React.Fragment>
    );
}

export default Login_Screen;