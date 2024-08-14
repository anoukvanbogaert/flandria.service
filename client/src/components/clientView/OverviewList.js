import React from 'react';

import './OverviewList.scss';
import { useStoreState } from 'pullstate';
import { AppStore } from '../../stores/AppStore';
import MUIDataTable from 'mui-datatables';
import { Box } from '@mui/material';
import { getBoatNameById } from '../../utils/getData';

const OverviewList = () => {
    const { userServices, boats } = useStoreState(AppStore);
    console.log('userServices', userServices);
    console.log('boats', boats);

    const columns = [
        {
            name: 'date',
            label: 'Date',
            options: {
                customBodyRender: (value) => {
                    console.log('value', value);
                    if (value) {
                        const date = new Date(value.seconds * 1000);

                        const options = { year: 'numeric', month: 'long', day: 'numeric' };
                        return date.toLocaleDateString('en-US', options);
                    }
                    return value;
                },
            },
        },
        {
            name: 'boatName',
            label: 'Boat',
            options: {
                customBodyRenderLite: (dataIndex) => {
                    const userBoat = userServices[dataIndex];
                    const boatId = userBoat.boat[0];
                    console.log('userBoat', userBoat);
                    console.log('boatId', boatId);

                    return <Box>{getBoatNameById(boatId, boats)} </Box>;
                },
            },
        },
    ];

    const options = {
        selectableRows: 'none',
        responsive: 'standard',
        viewColumns: false,
        rowsPerPageOptions: [],
        customToolbar: () => {
            return (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                    }}
                ></div>
            );
        },
        setTableProps: () => ({
            size: 'small',
        }),
    };
    return (
        <div style={{ width: '100%', marginTop: '2rem' }}>
            <MUIDataTable data={userServices} columns={columns} options={options} />
        </div>
    );
};

export default OverviewList;
