import axios from 'axios';

import {
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR,
    USER_ERROR,
    ALL_USER,
    DELETE_USER
} from './types';

import { Config } from '../config/config';
import { UPDATE_SYNC_WARNINGS } from 'redux-form/lib/actionTypes';

export function signin(data) {
    return function (dispatch) {
        axios.defaults.baseURL = Config.api_url;
        axios.post(`/user/signin`, data)
            .then(({ data }) => {
                if (data.success) {
                    dispatch({ type: AUTH_USER, user: data.user, token: data.token })
                    localStorage.setItem("user", JSON.stringify(data.user));
                    localStorage.setItem("isLogin", true);
                    localStorage.setItem("token", data.token);
                    window.location = '/#home';
                } else {
                    dispatch({ type: AUTH_ERROR, message: data.message })
                }
            })
            .catch(error => {
                console.log(error);
                dispatch({ type: AUTH_ERROR, payload: 'Server Connection Error, Try Later.' })
            });
    }
}

export function signout(data) {
    return function (dispatch) {
        axios.defaults.baseURL = Config.api_url;
        axios.defaults.headers.get['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
        axios.get(`/user/signout`)
            .then(({ data }) => {
                if (data) {
                    dispatch({ type: UNAUTH_USER })
                    window.reload(true);
                } else {
                    dispatch({ type: USER_ERROR, message: data.message })
                }
            })
            .catch(error => {
                console.log(error);
                dispatch({ type: USER_ERROR, payload: 'Server Connection Error, Try Later.' })
            });
    }
}

export function signup(u) {
    return function (dispatch) {
        axios.defaults.baseURL = Config.api_url;
        axios.post(`/user/signup`, u)
            .then(({ data }) => {
                if (data.success) {
                    window.location = '/#login';
                } else {
                    dispatch({ type: AUTH_ERROR, message: data.message })
                }
            })
            .catch(error => {
                console.log(error);
                dispatch({ type: AUTH_ERROR, payload: 'Server Connection Error, Try Later.' })
            });
    }
}

export function alluser() {
    return function (dispatch) {
        axios.defaults.baseURL = Config.api_url;
        axios.defaults.headers.get['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
        axios.get(`/user`)
            .then(({ data }) => {
                if (data) {
                    dispatch({ type: ALL_USER, users: data })
                } else {
                    dispatch({ type: USER_ERROR, message: data.message })
                }
            })
            .catch(error => {
                console.log(error);
                dispatch({ type: USER_ERROR, payload: 'Server Connection Error, Try Later.' })
            });
    }
}

export function deluser(u) {
    return function (dispatch) {
        axios.defaults.baseURL = Config.api_url;
        axios.defaults.headers.delete['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
        axios.delete(`/user/${u.id}`)
            .then(({ data }) => {
                if (data.success) {
                    window.location.reload(true);
                } else {
                    dispatch({ type: USER_ERROR, message: data.message })
                }
            })
            .catch(error => {
                console.log(error);
                dispatch({ type: USER_ERROR, payload: 'Server Connection Error, Try Later.' })
            });
    }
}


export function updateuser(u) {
    return function (dispatch) {
        axios.defaults.baseURL = Config.api_url;
        axios.defaults.headers.put['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
        axios.put(`/user/${u.id}`, u)
            .then(({ data }) => {
                if (data.success) {
                    window.location.reload(true);
                } else {
                    dispatch({ type: USER_ERROR, message: data.message })
                }
            })
            .catch(error => {
                console.log(error);
                dispatch({ type: USER_ERROR, payload: 'Server Connection Error, Try Later.' })
            });
    }
}
