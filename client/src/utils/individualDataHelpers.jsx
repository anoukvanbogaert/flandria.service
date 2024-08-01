export const keyMapping = {
    boatName: 'Boat Name',
    name: 'Client Name',
    uid: 'Client ID',
    owner: 'Owner',
    email: 'Email',
    id: 'Boat ID',
    client: 'Client ID',
    brand: 'Brand',
    model: 'Model',
    boat: 'Boat(s)',
    remark: 'Remark',
    residence: 'Residence',
    domicile: 'Domicile',
    cellphone1: 'Cellphone 1',
    cellphone2: 'Cellphone 2',
    nieNumber: 'NIEº',
    idNumber: 'IDº',
    emergencyContact1: 'ICE 1',
    emergencyContact2: 'ICE 2',
};

export const orderedKeys = [
    'boatName',
    'owner',
    'name',
    'email',
    'id',
    'uid',
    'boat',
    'residence',
    'domicile',
    'cellphone1',
    'cellphone2',
    'idNumber',
    'nieNumber',
    'emergencyContact1',
    'emergencyContact2',
    'client',
    'brand',
    'model',
    'remark',
];

export const findData = (
    uid,
    individualCollection,
    clients,
    boats,
    services,
    getClientNameById
) => {
    let data;
    switch (individualCollection) {
        case 'clients':
            data = clients.find((item) => item.uid === uid);
            break;
        case 'boats':
            data = boats.find((item) => item.id === uid);
            if (data) {
                data = {
                    ...data,
                    owner: getClientNameById(data.client, clients),
                };
                delete data.lastAdded;
            }
            break;
        case 'services':
            data = services.find((item) => item.id === uid);
            break;
        default:
            data = null;
    }
    return data;
};

export const findTitle = (individualCollection) => {
    let title;
    switch (individualCollection) {
        case 'clients':
            title = 'Client';
            break;
        case 'boats':
            title = 'Boat';
            break;
        case 'services':
            title = 'Service';
            break;
        default:
            title = null;
    }
    return title;
};
