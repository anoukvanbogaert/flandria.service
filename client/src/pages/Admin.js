import React, { useState } from 'react';
import './Admin.scss';
import BoatData from '../components/adminView/data/BoatData';
import ClientData from '../components/adminView/data/ClientData';
import ServiceData from '../components/adminView/data/ServiceData';
import AdminOptions from '../components/adminView/AdminOptions';
import AdminForms from '../components/adminView/AdminForms';
import { Button, Box } from '@mui/material';

import { Add } from '@mui/icons-material/';
import IndividualData from '../components/adminView/data/IndividualData';
import { useStoreState } from 'pullstate';
import { AppStore } from '../stores/AppStore';

const Admin = () => {
    const [selection, setSelection] = useState('boat');
    const [openModal, setOpenModal] = useState(false);
    const { individualData } = useStoreState(AppStore);

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
                </Box>
                {openModal && <AdminForms selection={selection} setOpenModal={setOpenModal} />}
                <Box
                    className={`admin__data-container`}
                    sx={{ display: 'flex', flexDirection: 'row' }}
                >
                    <Box
                        className={`data-table ${
                            individualData.id ? 'data-table-collapsed boat-data-sliding-out' : ''
                        }`}
                    >
                        {selection === 'boat' && (
                            <BoatData setOpenModal={setOpenModal} setSelection={setSelection} />
                        )}
                        {selection === 'client' && <ClientData setOpenModal={setOpenModal} />}
                        {selection === 'service' && <ServiceData setOpenModal={setOpenModal} />}
                    </Box>
                    {individualData.id && (
                        <Box
                            className={`individual-data ${
                                individualData.id ? 'individual-data-visible' : ''
                            }`}
                        >
                            <IndividualData />
                        </Box>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default Admin;
