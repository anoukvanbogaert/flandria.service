import { Store } from 'pullstate';

export const AppStore = new Store({
    user: null,
    userDoc: {},
    serviceTemplates: [],
    clients: [],
    boats: [],
    services: [],
    userServices: [],
    appBarHeight: 64,
    overview: null,
    individualData: { collection: '', id: '' },
    userBoats: null,
    loadingData: true,
});
