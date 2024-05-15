import { React, useState, useEffect } from 'react';
import MUIDataTable from 'mui-datatables';
import { IconButton, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useStoreState } from 'pullstate';
import { AppStore } from '../stores/AppStore';
import './data.css';
import { deleteFromCollection } from '../utils/getData';
import { FormStore } from '../stores/FormStore';

const BoatData = ({ setOpenModal }) => {
    const [highlightedRow, setHighlightedRow] = useState(null);

    const { boats, clients, services } = useStoreState(AppStore);

    const getInfoById = (id, items, property) => {
        const item = items.find((item) => item.id === id);
        return item ? item[property] : 'Unknown';
    };

    const onEditClick = (serviceId) => {
        FormStore.update((s) => {
            s.editId = serviceId;
        });
        setOpenModal(true);
    };

    const onDeleteClick = (serviceId, clientId) => {
        console.log('Deleting service:', serviceId);
        // below needs to be turned into deletefromsubcollection
        // deleteFromCollection('boats', boatId, AppStore);
    };

    //This useffect looks for rows to highlight
    useEffect(() => {
        const lastAddedService = services.find((service) => service.lastAdded);
        if (lastAddedService) {
            setHighlightedRow(lastAddedService.id);

            const timer = setTimeout(() => {
                setHighlightedRow(null);
                AppStore.update((s) => {
                    const index = s.services.findIndex(
                        (service) => service.id === lastAddedService.id
                    );
                    if (index !== -1) {
                        s.services[index].lastAdded = false;
                    }
                });
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [services]);

    const columns = [
        {
            name: 'boatName',
            label: 'Boat Name',
            options: {
                customBodyRenderLite: (dataIndex) => {
                    const service = services[dataIndex];
                    return getInfoById(service.boat, boats, 'boatName');
                },
            },
        },
        {
            name: 'client',
            label: 'Client',
            options: {
                customBodyRenderLite: (dataIndex) => {
                    const service = services[dataIndex];
                    return getInfoById(service.client, clients, 'name');
                },
            },
        },
        {
            name: 'brand',
            label: 'Brand',
            options: {
                customBodyRenderLite: (dataIndex) => {
                    const service = services[dataIndex];
                    return getInfoById(service.boat, boats, 'brand');
                },
            },
        },
        {
            name: 'model',
            label: 'Model',
            options: {
                customBodyRenderLite: (dataIndex) => {
                    const service = services[dataIndex];
                    return getInfoById(service.boat, boats, 'model');
                },
            },
        },
        // {
        //     name: 'date',
        //     label: 'Date',
        // },
        {
            name: 'services',
            label: 'Service(s) performed',
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
                    const service = services[dataIndex];
                    return (
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <IconButton
                                onClick={() => onEditClick(service.id)}
                                aria-label='edit'
                                color='secondary'
                            >
                                <EditIcon />
                            </IconButton>
                            <IconButton
                                onClick={() => onDeleteClick(service.id, service.client)}
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
        setRowProps: (row, dataIndex) => {
            return {
                className: services[dataIndex].id === highlightedRow ? 'flash-background' : '',
            };
        },
    };

    return (
        <div style={{ width: '100%', marginTop: '2rem' }}>
            <MUIDataTable data={services} columns={columns} options={options} />
        </div>
    );
};

export default BoatData;
