import {Typography, Box, useTheme} from '@mui/material';

const Header =({titulo, subtitulo, descripcion }) => {
    return (
        <Box m='30px' className='justify-content-start' display='flex' flexDirection='column' alignItems='self-start'>
            <Typography variant='h3' color={'black'} fontWeight='bold' sx={{mb: '5'}}>{titulo}</Typography>
            <Typography variant='h6' color={'gray'}>{subtitulo}</Typography>
            <Typography className='mt-3' variant='p' color={'black'}>{descripcion}</Typography>
        </Box>
    )
}

export default Header;