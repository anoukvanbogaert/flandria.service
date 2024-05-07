import React from 'react';
import MUIDataTable from 'mui-datatables';
import { IconButton, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useStoreState } from 'pullstate';
import { AppStore } from '../stores/AppStore';
import './data.css';

const BoatData = () => {
    const { boats } = useStoreState(AppStore);

    const onEditClick = (boatId) => {
        console.log('Editing boat:', boatId);
        // Add your edit logic here
    };

    const onDeleteClick = (boatId) => {
        console.log('Deleting boat:', boatId);
        // Add your delete logic here
    };

    const columns = [
        {
            name: 'boatName',
            label: 'Boat Name',
        },
        {
            name: 'client',
            label: 'Client',
        },
        {
            name: 'brand',
            label: 'Brand',
        },
        {
            name: 'model',
            label: 'Model',
        },
        {
            name: 'techSpecs',
            label: 'Tech Specs',
        },
        {
            name: '',
            label: '',
            options: {
                filter: false,
                sort: false,
                setCellProps: () => ({
                    style: {
                        width: '15%',
                    },
                }),
                customBodyRenderLite: (dataIndex) => {
                    const boat = boats[dataIndex];
                    return (
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <IconButton onClick={() => onEditClick(boat.id)} aria-label='edit'>
                                <EditIcon />
                            </IconButton>
                            <IconButton onClick={() => onDeleteClick(boat.id)} aria-label='delete'>
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    );
                },
            },
        },
    ];

    const options = {
        selectableRows: 'none',
        responsive: 'standard',
        viewColumns: false,
        rowsPerPageOptions: false,
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
        <div style={{ width: '100%' }}>
            <MUIDataTable data={boats} columns={columns} options={options} />
        </div>
    );
};

export default BoatData;
