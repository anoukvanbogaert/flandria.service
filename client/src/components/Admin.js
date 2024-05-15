import React, { useState } from 'react';
import './Admin.scss';
import BoatData from './BoatData';
import ClientData from './ClientData';
import ServiceData from './ServiceData';
import AdminOptions from './AdminOptions';
import AdminForms from './AdminForms';
import { Button, Box } from '@mui/material';

import { Add } from '@mui/icons-material/';

const Admin = () => {
    const [selection, setSelection] = useState('boat');
    const [openModal, setOpenModal] = useState(false);

    return (
        <Box className='admin__container'>
            <Box className='admin__form'>
                <AdminOptions setSelection={setSelection} />
                {selection && (
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
                )}
                {openModal && <AdminForms selection={selection} setOpenModal={setOpenModal} />}
                {selection === 'boat' && <BoatData setOpenModal={setOpenModal} />}
                {selection === 'client' && <ClientData setOpenModal={setOpenModal} />}
                {selection === 'service' && <ServiceData setOpenModal={setOpenModal} />}
            </Box>
        </Box>
    );
};

export default Admin;
