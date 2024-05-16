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
                <Box
                    sx={{
                        justifySelf: 'left',
                        marginTop: '5rem',
                    }}
                >
                    {selection && (
                        <Button
                            variant='contained'
                            startIcon={<Add />}
                            color='secondary'
                            sx={{
                                fontWeight: 'bold',
                                width: 'fit-content',
                            }}
                            onClick={() => setOpenModal(true)}
                        >
                            Add a {selection}
                        </Button>
                    )}
                    {selection === 'service' && (
                        <Button
                            variant='outlined'
                            startIcon={<Add />}
                            color='secondary'
                            sx={{
                                fontWeight: 'bold',
                                marginLeft: '2rem',
                                width: 'fit-content',
                            }}
                            onClick={() => setOpenModal(true)}
                        >
                            Add a service template
                        </Button>
                    )}
                </Box>
                {openModal && <AdminForms selection={selection} setOpenModal={setOpenModal} />}
                {selection === 'boat' && <BoatData setOpenModal={setOpenModal} />}
                {selection === 'client' && <ClientData setOpenModal={setOpenModal} />}
                {selection === 'service' && <ServiceData setOpenModal={setOpenModal} />}
            </Box>
        </Box>
    );
};

export default Admin;
