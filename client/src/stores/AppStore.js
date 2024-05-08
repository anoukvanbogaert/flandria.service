import { Store } from 'pullstate';

export const AppStore = new Store({
    user: null,
    userDoc: {},
    serviceTemplates: [],
    clients: [],
    boats: [],
    appBarHeight: 64,
    overview: null,
});
