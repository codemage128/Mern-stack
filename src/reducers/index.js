import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form'

import auth from './auth';
import user from './user';

const rootReducer = combineReducers({
    form,
    auth,
    user
});

export default rootReducer;
