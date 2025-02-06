import React from 'react';
import DogCard from './dogCard';
import Headers from './header';
import SearchEngine from './searchEngine';
import {
    Container,
    Grid2 as Grid
} from '@mui/material';
import axios from 'axios';


const HomeScreen = ( props ) => {
    const [ cards, setCards] = React.useState([]);
    const [ loading, setLoading] = React.useState(true);

    const renderIds = ( dogIds ) => {
        axios.post(
            'https://frontend-take-home-service.fetch.com/dogs',
            dogIds
        ).then( res => {
            setCards( res.data);
            setLoading(false);
        }).catch( err => console.log("Something went wrong", err));
    }

    React.useEffect( ()=>{
        axios.get(
            'https://frontend-take-home-service.fetch.com/dogs/search?size=25&from=0',
        ).then((response) => {
            console.log('Response:', response.data);
            renderIds( response.data.resultIds);
            
        }).catch((error) => {
            console.error('Error:', error);
        });
    }, []);

    return (
        <React.Fragment>
            <Headers/>
            <br/>
            <Container maxWidth = 'xl'>
                <SearchEngine/>
                <br/>
                <Grid
                    container
                    spacing={4}
                    alignItems="center"
                    justifyContent="center"
                >
                    {cards.map( card => (
                        <Grid item size = {{ md:3 }}>
                            <DogCard card = {card}/>
                        </Grid> 
                    ))}
                </Grid>
                <br/>
                
            </Container>
            
        </React.Fragment>
    )
}

export default HomeScreen;