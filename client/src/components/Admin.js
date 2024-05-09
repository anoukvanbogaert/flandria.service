import React, { useState } from 'react';
import './Admin.scss';
import classNames from 'classnames';
import BoatData from './BoatData';
import AdminOptions from './AdminOptions';
import AdminForms from './AdminForms';
import { Button, Box } from '@mui/material';

import { Add, FormatColorResetRounded } from '@mui/icons-material/';

const Admin = () => {
    const [selection, setSelection] = useState('');
    const [openModal, setOpenModal] = useState(false);

    return (
        <Box className='admin__container'>
            <Box className='admin__form'>
                <AdminOptions setSelection={setSelection} />
                <Button
                    variant='contained'
                    startIcon={<Add />}
                    color='secondary'
                    sx={{
                        justifySelf: 'left',
                        marginTop: '5rem',
                        fontWeight: 'bold',
                        width: 'fit-content',
                    }}
                    onClick={() => setOpenModal(true)}
                >
                    Add a {selection}
                </Button>
                {openModal && <AdminForms selection={selection} setOpenModal={setOpenModal} />}
                {selection === 'boat' && <BoatData />}
            </Box>
        </Box>
    );
};

export default Admin;
