import React from 'react';
import {
    Card,
    CardMedia,
    CardContent,
    Table,
    TableRow,
    TableCell,
    Button
} from '@mui/material';
import wallpaperImg from './wallpaper.jpg';

import {
    Favorite as FavoriteIcon
 } from '@mui/icons-material';


const DogCard = ( props ) => {
    return (
        <Card sx={{ maxWidth: 345, borderRadius: "15px" }}>
            <CardMedia
                component="img"
                height="194"
                image={props.card.img}
                alt="Paella dish"
            /> 
            <CardContent>
                <Table>
                    <TableRow>
                        <TableCell>Name: {props.card.name}</TableCell>
                        <TableCell align="right">Age: {props.card.age}</TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell>Breed: {props.card.breed}</TableCell>
                        <TableCell align="right">Zip: {props.card.zip_code}</TableCell>
                    </TableRow>
                </Table>
                <br/>

                <Button
                    color = "secondary"
                    fullWidth
                    startIcon = {<FavoriteIcon/>}
                    variant = {props.favList.includes(props.card.id) == true? "contained":"text"}
                    onClick={
                        (evt)=>props.favList.includes(props.card.id) == true?
                        props.onDelete(props.card.id):props.onSelect(props.card.id)
                    }
                >
                    Add to Favorites
                </Button>
            </CardContent>
            
        </Card>
    )
}

export default DogCard;