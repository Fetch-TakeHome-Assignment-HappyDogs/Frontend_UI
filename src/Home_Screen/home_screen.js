import React from 'react';
import DogCard from './dogCard';
import Headers from './header';
import SearchEngine from './searchEngine';
import {
    Container,
    Grid2 as Grid,
    Stack,
    Typography,
    Alert
} from '@mui/material';
import axios from 'axios';
import Footer from './footer';


const HomeScreen = ( props ) => {
    const [ cards, setCards] = React.useState([]);
    const [ favList, setFavList] = React.useState([]);
    const [ filter, setFilter] = React.useState("");
    const [ order, setOrder] = React.useState(false);

    const [ zip_codes, setZip_codes] = React.useState(null);
    const [ breeds, setBreeds] = React.useState(null);
    const [ minAge, setMinAge] = React.useState(null);
    const [ maxAge, setMaxAge] = React.useState(null);
    const [ allBreeds, setAllBreeds] = React.useState( [] );
    
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
        advSearchAPI(1, false);

        axios.get('https://frontend-take-home-service.fetch.com/dogs/breeds'
        ).then( res => {
            setAllBreeds( res.data );
        }).catch( err => console.log("Something went wrong", err));
    }, []);

    const advSearchAPI = ( page, clear, zip_clone, breed_clone, minClone, maxClone ) => {
        page = (page - 1) * 24
        let requiredAPI = "https://frontend-take-home-service.fetch.com/dogs/search?";

        breed_clone = breed_clone? breed_clone : breeds;
        if( !clear && breed_clone ){
            for( let i = 0; i < breed_clone.length; i++){
                requiredAPI = requiredAPI + `&breeds=${breed_clone[i]}` 
            }
        }

        zip_clone = zip_clone? zip_clone: zip_codes;
        if( !clear && zip_clone){
            for( let i = 0; i < zip_clone.length; i++){
                requiredAPI = requiredAPI + `&zipCodes=${zip_clone[i]}` 
            }
        }

        minClone = minClone? minClone : minAge;
        if( !clear && minClone ){
            requiredAPI = requiredAPI + "&ageMin=" + minClone
        }

        maxClone = maxClone? maxClone : maxAge;
        if( !clear && maxClone != null){
            requiredAPI = requiredAPI + "&ageMax=" + maxClone
        }

        axios.get(
            requiredAPI + "&size=24&from=" + page,
        ).then((response) => {
            renderIds( response.data.resultIds);
        }).catch((error) => {
            setCards([])
            console.error('Error:', error.message);
        });
    }

    const handleCityChange = ( newCity ) => {
        if( newCity && newCity.length != 0){
            const regex = /^[A-Za-z ]+$/;
            if( regex.test(newCity) == false){
                window.alert('Please enter a valid city!');
                return
            }
            axios.post(
                'https://frontend-take-home-service.fetch.com/locations/search',
                {city:newCity}
            ).then( res => {
                const zips = res.data.results.map(item => item.zip_code);
                setZip_codes(zips);
                advSearchAPI( 1, false, zips );
            }).catch( err => console.log("Something went wrong", err));
        }
        else{
            advSearchAPI( 1, false );
        }
    }

    return (
        <React.Fragment>
            <Headers
                favList = {favList}
                cards = {cards}
            />
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
                    handleCityChange = {handleCityChange}
                    cleanFilter = { () => {
                        setZip_codes(null);
                        setBreeds(null);
                        setMinAge(null);
                        setMaxAge(null);
                        advSearchAPI( 1, true );
                    }}
                    setMinAge = {(val) => setMinAge(val)}
                    setMaxAge = {(val) => setMaxAge(val)}
                    setBreeds = {(val) => setBreeds(val)}
                    allBreeds = {allBreeds}
                />
                <br/>
                <Grid
                    container
                    spacing={4}
                    alignItems="center"
                    justifyContent="center"
                >
                    {cards.length == 0?(
                        <Stack sx={{ width: '100%' }} spacing={2}>
                            <Alert  severity="info">
                                <Typography variant="h3">Sorry!</Typography>
                                <br/>
                                <Typography variant="h5">There is no pet for you in your city.</Typography>
                                <br/><br/><br/>
                                <Typography variant="h5">Try some another city</Typography>
                            </Alert>
                        </Stack>
                    ):(
                        <React.Fragment>
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
                        </React.Fragment>
                    )}
                </Grid>
                <br/>
                
                <Footer
                    updateKey = { (page) => advSearchAPI(page, false)}
                />
                <br/>
            </Container>
            
        </React.Fragment>
    )
}

export default HomeScreen;