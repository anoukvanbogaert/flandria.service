import React from 'react';

import './OverviewList.scss';
import { useStoreState } from 'pullstate';
import { AppStore } from '../../stores/AppStore';
import MUIDataTable from 'mui-datatables';

const OverviewList = () => {
    const { userServices } = useStoreState(AppStore);

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
