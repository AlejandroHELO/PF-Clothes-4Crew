import { applyMiddleWare, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import reducer from './reducer';

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleWare(thunk))
);

export default store;