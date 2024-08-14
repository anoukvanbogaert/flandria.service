import React from 'react';

import './OverviewList.scss';
import { useStoreState } from 'pullstate';
import { AppStore } from '../../stores/AppStore';
import MUIDataTable from 'mui-datatables';
import { Box } from '@mui/material';
import { getBoatNameById } from '../../utils/getData';

const OverviewList = () => {
    const { userServices } = useStoreState(AppStore);
    console.log('userServices', userServices);

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
            label: 'Boat Name',
            options: {
                customBodyRenderLite: (dataIndex) => {
                    // return <Box>{getBoatNameById(userServices.boat[0])} (</Box>;
                    return <Box />;
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
