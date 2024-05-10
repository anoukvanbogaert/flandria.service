import React from 'react';
import MUIDataTable from 'mui-datatables';
import { IconButton, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useStoreState } from 'pullstate';
import { AppStore } from '../stores/AppStore';
import './data.css';
import { deleteFromCollection } from '../utils/getData';
import { FormStore } from '../stores/FormStore';

const ClientData = ({ setOpenModal }) => {
    const { boats, clients } = useStoreState(AppStore);

    const getClientNameById = (clientId) => {
        const client = clients.find((c) => c.id === clientId);
        return client ? client.name : 'Unknown';
    };

    const onEditClick = (clientId) => {
        FormStore.update((s) => {
            s.editId = clientId;
        });
        setOpenModal(true);
    };

    const onDeleteClick = (clientId) => {
        console.log('Deleting client:', clientId);
        deleteFromCollection('clients', clientId, AppStore);
    };

    const columns = [
        {
            name: 'name',
            label: 'Client Name',
        },

        {
            name: 'email',
            label: 'Email',
        },
        {
            name: 'Placeholder',
            label: 'Placeholder',
        },
        {
            name: 'Placeholder',
            label: 'Placeholder',
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
                    const client = clients[dataIndex];
                    return (
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <IconButton
                                onClick={() => onEditClick(client.id)}
                                aria-label='edit'
                                color='secondary'
                            >
                                <EditIcon />
                            </IconButton>
                            <IconButton
                                onClick={() => onDeleteClick(client.id)}
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
            <MUIDataTable data={clients} columns={columns} options={options} />
        </div>
    );
};

export default ClientData;
