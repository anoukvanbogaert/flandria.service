import React from 'react';
import './Navbar.scss';

import Logo from '../assets/images/logo1.png';
import { logout } from '../firebase';
import IconButton from '@mui/material/IconButton';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Tooltip from '@mui/material/Tooltip';

const Navbar = () => {
    return (
        <nav className='navbar'>
            <div className='navbar__logo'>
                <img src={Logo} alt='logo'></img>
            </div>
            <div className='navbar__right'>
                <div className='navbar__contact'>
                    <p>INFO@FLANDRIAYACHTS.COM</p>
                    <p>+34 965 270285</p>
                </div>
                <Tooltip title='Logout'>
                    <IconButton
                        onClick={logout}
                        color='#FFFFFF'
                        sx={{ textAlign: 'end', width: 'content' }}
                    >
                        <ExitToAppIcon sx={{ color: '#FFFFFF' }} />
                    </IconButton>
                </Tooltip>
            </div>
        </nav>
    );
};

export default Navbar;
