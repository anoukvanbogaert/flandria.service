import React from 'react';
import MUIDataTable from 'mui-datatables';
import { IconButton, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useStoreState } from 'pullstate';
import { AppStore } from '../stores/AppStore';
import './data.css';
import { deleteFromCollection } from '../utils/getData';

const BoatData = () => {
    const { boats, clients } = useStoreState(AppStore);

    const getClientNameById = (clientId) => {
        const client = clients.find((c) => c.id === clientId);
        return client ? client.name : 'Unknown';
    };

    const onEditClick = (boatId) => {
        console.log('Editing boat:', boatId);
        // Add your edit logic here
    };

    const onDeleteClick = (boatId, clientId) => {
        console.log('Deleting boat:', boatId);
        deleteFromCollection('boats', boatId, AppStore);
    };

    const columns = [
        {
            name: 'boatName',
            label: 'Boat Name',
        },
        {
            name: 'client',
            label: 'Client',
            options: {
                customBodyRenderLite: (dataIndex) => {
                    const boat = boats[dataIndex];
                    return getClientNameById(boat.client);
                },
            },
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
                            <IconButton
                                onClick={() => onEditClick(boat.id)}
                                aria-label='edit'
                                color='secondary'
                            >
                                <EditIcon />
                            </IconButton>
                            <IconButton
                                onClick={() => onDeleteClick(boat.id, boat.client)}
                                aria-label='delete'
                                color='error'
                            >
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
        <div style={{ width: '100%', margin: '5rem' }}>
            <MUIDataTable data={boats} columns={columns} options={options} />
        </div>
    );
};

export default BoatData;
