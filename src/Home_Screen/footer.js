import React from "react";
import {
    Stack,
    Pagination,
    Grid2 as Grid
} from '@mui/material';


const Footer = (props) => {
    const [ page, setPage] = React.useState(1);
    React.useEffect(()=>{
        props.updateKey(page);
    },[page]);

    return (
        <Grid
            container
            spacing={4}
            alignItems="center"
            justifyContent="center"
        >
            <Stack spacing={2}>
                <Pagination 
                    count={10} 
                    color="primary"
                    page={page}
                    onChange={(evt,page)=>setPage(page)} 
                />
            </Stack>
        </Grid>
    );
}

export default Footer;