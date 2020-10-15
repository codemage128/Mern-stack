import {
    ALL_USER,
    USER_ERROR,
    DELETE_USER
} from '../actions/types';

export default function (state = { users: [] }, action) {
    switch (action.type) {
        case ALL_USER:
            return { ...state, users: action.users }
        case DELETE_USER:
            return { ...state, users: [] }
        case USER_ERROR:
            return { ...state, message: action.message, users: [] }
        default:
            return state
    }
}