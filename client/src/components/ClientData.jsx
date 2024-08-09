import React from 'react';
import MUIDataTable from 'mui-datatables';
import { IconButton, Box, Chip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useStoreState } from 'pullstate';
import { AppStore } from '../stores/AppStore';
import './data.css';
import { deleteFromCollection, handleRowClick, getBoatNameById } from '../utils/getData';
import { FormStore } from '../stores/FormStore';

const ClientData = ({ setOpenModal }) => {
    const { boats, clients } = useStoreState(AppStore);

    const onEditClick = (clientId) => {
        FormStore.update((s) => {
            s.editId = clientId;
        });
        setOpenModal(true);
    };

    const onDeleteClick = (clientId) => {
        deleteFromCollection('clients', clientId, AppStore);
    };

    const onRowClick = (rowData, rowMeta) => {
        handleRowClick(rowData, rowMeta, clients, 'clients');
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
            name: 'boat',
            label: 'Boat(s)',
            options: {
                customBodyRenderLite: (dataIndex) => {
                    const client = clients[dataIndex];

                    return client.boat && client.boat.length > 0
                        ? client.boat.map((boatId, index) => (
                              <Chip
                                  key={index}
                                  label={getBoatNameById(boatId, boats)}
                                  onClick={(event) => {
                                      event.stopPropagation();
                                      AppStore.update((s) => {
                                          s.individualData = {
                                              collection: 'boats',
                                              id: boatId,
                                          };
                                      });
                                  }}
                                  sx={{
                                      backgroundColor: '#ceeefd',
                                      color: '#045174',
                                      cursor: 'pointer',
                                      fontSize: '15px',
                                      marginRight: '5px',
                                  }}
                              />
                          ))
                        : getBoatNameById(client.boat, boats) || '';
                },
            },
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
                                onClick={() => onEditClick(client.uid)}
                                aria-label='edit'
                                color='secondary'
                            >
                                <EditIcon />
                            </IconButton>
                            <IconButton
                                onClick={() => onDeleteClick(client.uid)}
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
        onRowClick: onRowClick,
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
