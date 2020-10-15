import {
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR
} from '../actions/types';

export default function (state = {}, action) {
    switch (action.type) {
        case AUTH_USER:
            return { ...state, user: action.user, message: '', isLogin: true, token: action.token }
        case UNAUTH_USER:
            return { ...state, user: null, isLogin: false }
        case AUTH_ERROR:
            return { ...state, message: action.message }
        default:
            return state
    }
}