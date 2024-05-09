import React, { useState } from 'react';
import './Admin.scss';
import classNames from 'classnames';
import BoatData from './BoatData';
import AdminOptions from './AdminOptions';
import AdminForms from './AdminForms';
import { Button, Box } from '@mui/material';

import { Add } from '@mui/icons-material/';

const Admin = () => {
    const [activeComponent, setActiveComponent] = useState(1);
    const [selection, setSelection] = useState('');
    console.log('selection', selection);

    let afterClick = '';
    if (activeComponent) {
        afterClick = true;
    } else {
        afterClick = false;
    }

    const formClass = classNames('admin__form', {
        'admin__form--open': afterClick,
        'admin__form--close': !afterClick,
    });

    const optionsClass = classNames('admin__options', {
        'admin__options--middle': !afterClick,
        'admin__options--left': afterClick,
    });

    return (
        <Box className='admin__container'>
            <Box className={formClass}>
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
                >
                    Add a {selection}
                </Button>
                {/* {selection && <AdminForms selection={selection} />} */}
                {selection === 'boat' && <BoatData />}
            </Box>
        </Box>
    );
};

export default Admin;
