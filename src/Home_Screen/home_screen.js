import React from 'react';
import DogCard from './dogCard';
import Headers from './header';
import SearchEngine from './searchEngine';
import {
    Container
} from '@mui/material';

const HomeScreen = ( props ) => {
    return (
        <React.Fragment>
            <Headers/>
            <br/>
            <Container maxWidth = 'xl'>
                <SearchEngine/>
                <br/>
                <DogCard/>
            </Container>
            
        </React.Fragment>
    )
}

export default HomeScreen;