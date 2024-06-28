import { React, useState, useEffect } from 'react';
import MUIDataTable from 'mui-datatables';
import { IconButton, Box, Chip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useStoreState } from 'pullstate';
import { AppStore } from '../stores/AppStore';
import './data.css';
import { deleteFromCollection, getClientNameById } from '../utils/getData';
import { FormStore } from '../stores/FormStore';

const BoatData = ({ setOpenModal, setSelection }) => {
    const [highlightedRow, setHighlightedRow] = useState(null);

    const { boats, clients } = useStoreState(AppStore);

    const onEditClick = (boatId) => {
        FormStore.update((s) => {
            s.editId = boatId;
        });
        setOpenModal(true);
    };

    const onDeleteClick = (boatId, clientId) => {
        deleteFromCollection('boats', boatId, AppStore);
    };

    const onRowClick = (rowData, rowMeta) => {
        const boat = boats[rowMeta.dataIndex];
        console.log('boat', boat);
        AppStore.update((s) => {
            s.individualData = {
                collection: 'boats',
                id: boat.id,
            };
        });
    };

    //This useffect looks for rows to highlight
    useEffect(() => {
        const lastAddedBoat = boats.find((boat) => boat.lastAdded);
        if (lastAddedBoat) {
            setHighlightedRow(lastAddedBoat.id);

            const timer = setTimeout(() => {
                setHighlightedRow(null);
                AppStore.update((s) => {
                    const index = s.boats.findIndex((boat) => boat.id === lastAddedBoat.id);
                    if (index !== -1) {
                        s.boats[index].lastAdded = false;
                    }
                });
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [boats]);

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
                    return boat.client ? (
                        <Chip
                            label={getClientNameById(boat.client, clients)}
                            onClick={(event) => {
                                event.stopPropagation();
                                AppStore.update((s) => {
                                    s.individualData = {
                                        collection: 'clients',
                                        id: boat.client,
                                    };
                                });
                                setSelection('');
                                console.log(`Client ID: ${boat.client}`);
                            }}
                            sx={{
                                backgroundColor: '#ceeefd',
                                color: '#045174',
                                cursor: 'pointer',
                                fontSize: '15px',
                            }}
                        />
                    ) : (
                        getClientNameById(boat.client, clients) || 'Unknown'
                    );
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
                className: boats[dataIndex].id === highlightedRow ? 'flash-background' : '',
            };
        },
    };

    return (
        <div style={{ width: '100%', marginTop: '2rem' }}>
            <MUIDataTable data={boats} columns={columns} options={options} />
        </div>
    );
};

export default BoatData;
