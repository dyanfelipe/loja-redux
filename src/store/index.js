import { createStore } from 'redux';

import rootReducer from './modules/rootReducer';

const enhance = process.env.NODE_ENV === 'development' ? console.tron.createEnhancer() : null;

const store = createStore(rootReducer, enhance);

export default store;
