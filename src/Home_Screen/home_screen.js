import React from 'react';
import DogCard from './dogCard';
import Headers from './header';
import SearchEngine from './searchEngine';
import {
    Container,
    Grid2 as Grid
} from '@mui/material';
import axios from 'axios';
import Footer from './footer';


const HomeScreen = ( props ) => {
    const [ cards, setCards] = React.useState([]);
    const [ favList, setFavList] = React.useState([]);
    const [ filter, setFilter] = React.useState("");
    const [ order, setOrder] = React.useState(true);
    
    const renderIds = ( dogIds ) => {
        axios.post(
            'https://frontend-take-home-service.fetch.com/dogs',
            dogIds
        ).then( res => {
            var data = res.data
            data.sort((a, b) => {
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                return 0;
            });
            setCards( data );
        }).catch( err => console.log("Something went wrong", err));
    }

    React.useEffect( ()=>{
        axios.get(
            'https://frontend-take-home-service.fetch.com/dogs/search?size=25&from=0',
        ).then((response) => {
            renderIds( response.data.resultIds);
        }).catch((error) => {
            console.error('Error:', error);
        });
    }, []);

    const updatePage = (page) => {
        page = (page - 1) * 25
        axios.get(
            'https://frontend-take-home-service.fetch.com/dogs/search?size=25&from=' + page,
        ).then((response) => {
            renderIds( response.data.resultIds);
        }).catch((error) => {
            console.error('Error:', error);
        });
    }

    return (
        <React.Fragment>
            <Headers/>
            <br/>
            <Container maxWidth = 'xl'>
                <SearchEngine
                    handleSort = { () => {
                        var data = cards.sort((a, b) => {
                            if (a.name < b.name) return !order? 1 : -1;
                            if (a.name > b.name) return !order? -1 : 1;
                            return 0;
                        });

                        setOrder(!order);
                        setCards( data );
                    }}
                    searchIds = {(newfilter) => {
                        if( newfilter.length == 0 ){
                            setFilter( []);
                        }
                        else{
                            var newArr = [null];
                            for( let i = 0; i < cards.length; i++){
                                if( cards[i]["name"].includes(newfilter)){
                                    newArr.push( cards[i]["id"])
                                }
                            }
                            setFilter( newArr );
                        } 
                    }}
                />
                <br/>
                <Grid
                    container
                    spacing={4}
                    alignItems="center"
                    justifyContent="center"
                >
                    {cards.map((card) => (
                        filter.length === 0 || filter.includes(card.id) ? (
                            <Grid item size = {{ md:3 }} key = {card.id}>
                                <DogCard
                                    card={card}
                                    favList={favList}
                                    onSelect={(id) => setFavList([...favList, id])}
                                    onDelete={(id) => {
                                        const newArr = favList.filter((currId) => currId !== id);
                                        setFavList(newArr);
                                    }}
                                />
                            </Grid>
                        ) : null
                    ))}
                </Grid>
                <br/>
                
                <Footer
                    updateKey = { (page) => updatePage(page)}
                />
                <br/>
            </Container>
            
        </React.Fragment>
    )
}

export default HomeScreen;