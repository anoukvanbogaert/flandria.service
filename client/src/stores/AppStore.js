import { Store } from 'pullstate';

export const AppStore = new Store({
    user: null,
    userDoc: {},
    appBarHeight: 64,
    overview: null,
});
