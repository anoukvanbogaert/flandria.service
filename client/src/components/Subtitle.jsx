import { Typography, Grid } from '@mui/material';
import React from 'react';

const Subtitle = ({ subtitle }) => {
    return (
        <>
            <Grid item xs={1}></Grid>
            <Grid item xs={11}>
                <Typography
                    variant='subtitle1'
                    sx={{
                        fontWeight: 'bold',
                        color: '#045174',
                    }}
                >
                    {subtitle}
                </Typography>
            </Grid>
        </>
    );
};

export default Subtitle;
