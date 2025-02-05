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
                image={wallpaperImg}
                alt="Paella dish"
            /> 
            <CardContent>
                <Table>
                    <TableRow>
                        <TableCell>Name: Prajwal</TableCell>
                        <TableCell align="right">Age: 26</TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell>Breed: Lion</TableCell>
                        <TableCell align="right">Zip: 02135</TableCell>
                    </TableRow>
                </Table>
                <br/>

                <Button
                    color = "secondary"
                    fullWidth
                    startIcon = {<FavoriteIcon/>}
                >
                    Add to Favorites
                </Button>
            </CardContent>
            
        </Card>
    )
}

export default DogCard;