import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Box, ButtonBase, Typography } from '@mui/material/';

const images = [
    {
        url: require('../assets/images/boat.jpg'),
        title: 'Add a boat',
        width: '49%',
    },
    {
        url: require('../assets/images/people.jpg'),
        title: 'Add a customer',
        width: '49%',
    },
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
    position: 'relative',
    height: 250,

    [theme.breakpoints.down('sm')]: {
        width: '100% !important',
        height: 100,
    },
    '&:hover, &.Mui-focusVisible': {
        zIndex: 1,
        '& .MuiImageBackdrop-root': {
            opacity: 0.15,
        },
        '& .MuiImageMarked-root': {
            opacity: 0,
        },
        '& .MuiTypography-root': {
            border: '4px solid currentColor',
            borderRadius: '10px',
        },
    },
}));

const ImageSrc = styled('span')({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
    borderRadius: '10px',
});

const Image = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
    borderRadius: '10px',
}));

const ImageMarked = styled('span')(({ theme }) => ({
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
}));

export default function ButtonBaseDemo() {
    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                width: '100%',
                justifyContent: 'space-between',
                paddingLeft: '1.5rem',
            }}
        >
            {images.map((image) => (
                <ImageButton
                    focusRipple
                    key={image.title}
                    style={{
                        width: image.width,
                    }}
                >
                    <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
                    <ImageBackdrop className='MuiImageBackdrop-root' />
                    <Image>
                        <Typography
                            component='span'
                            variant='h3'
                            color='inherit'
                            sx={{
                                fontWeight: 'bolder',
                                position: 'relative',
                                p: 4,
                                pt: 2,
                                pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                            }}
                        >
                            {image.title}
                            <ImageMarked className='MuiImageMarked-root' />
                        </Typography>
                    </Image>
                </ImageButton>
            ))}
        </Box>
    );
}
