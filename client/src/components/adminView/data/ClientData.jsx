import { React, useState } from 'react';
import MUIDataTable from 'mui-datatables';
import { IconButton, Box, Chip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useStoreState } from 'pullstate';
import { AppStore } from '../../../stores/AppStore';
import './data.css';
import {
    deleteFromCollection,
    handleRowClick,
    getBoatNameById,
    closeIndividualData,
} from '../../../utils/getData';
import { FormStore } from '../../../stores/FormStore';

const ClientData = ({ setOpenModal }) => {
    const { boats, clients } = useStoreState(AppStore);
    const [highlightedRow, setHighlightedRow] = useState(null);
    const [deletedRow, setDeletedRow] = useState(null);

    const onEditClick = (clientId) => {
        FormStore.update((s) => {
            s.editId = clientId;
        });
        setOpenModal(true);
    };

    const onDeleteClick = (clientId) => {
        closeIndividualData();

        const deletedClient = clients.find((client) => client.uid === clientId);
        if (deletedClient) {
            setDeletedRow(deletedClient.uid);
            const timer = setTimeout(() => {
                deleteFromCollection('clients', clientId, AppStore);
            }, 2000);

            return () => clearTimeout(timer);
        }
        setDeletedRow(null);
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
                                      fontSize: '16px',
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
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDeleteClick(client.uid);
                                }}
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
        setRowProps: (row, dataIndex) => {
            return {
                className:
                    clients[dataIndex].uid === highlightedRow
                        ? 'flash-background'
                        : clients[dataIndex].uid === deletedRow
                        ? 'background-red'
                        : '',
            };
        },
    };

    return (
        <div style={{ width: '100%', marginTop: '2rem' }}>
            <MUIDataTable data={clients} columns={columns} options={options} />
        </div>
    );
};

export default ClientData;
