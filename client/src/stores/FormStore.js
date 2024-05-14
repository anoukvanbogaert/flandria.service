import { Store } from 'pullstate';

export const FormStore = new Store({
    editId: '',
    boatData: { client: '', name: '', brand: '', model: '', remark: '' },
    clientData: { name: '', email: '', boat: [] },
    serviceData: {
        services: [],
        date: null,
        client: '',
        boat: '',
        remark: '',
    },
});
