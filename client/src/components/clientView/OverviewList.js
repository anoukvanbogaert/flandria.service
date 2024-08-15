import React from 'react';

import './OverviewList.scss';
import { useStoreState } from 'pullstate';
import { AppStore } from '../../stores/AppStore';
import MUIDataTable from 'mui-datatables';
import { Box } from '@mui/material';
import { getBoatNameById } from '../../utils/getData';
import CustomLoader from '../CustomLoader';

const OverviewList = () => {
    const { userServices, boats, loadingData } = useStoreState(AppStore);

    const columns = [
        {
            name: 'date',
            label: 'Date',
            options: {
                customBodyRender: (value) => {
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

                    return <Box>{getBoatNameById(boatId, boats)} </Box>;
                },
            },
        },
        {
            name: 'services',
            label: 'Service',
            options: {
                customBodyRender: (value) => {
                    if (Array.isArray(value)) {
                        return value.join(', ');
                    }
                    return value;
                },
            },
        },
        {
            name: 'remark',
            label: 'Remarks',
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
            {loadingData || !userServices.length ? (
                <CustomLoader />
            ) : (
                <MUIDataTable data={userServices} columns={columns} options={options} />
            )}
        </div>
    );
};

export default OverviewList;
