import axios from 'axios';
import {setAlert} from './alert';
import {REGISTER_FAIL,REGISTER_SUCCESS,AUTH_FAIL,USER_LOADED,LOGIN_FAIL,LOGIN_SUCCESS,LOGOUT} from './types';
import setAuthToken from '../helpers/setAuthToken'

export const loadUser = () => async dispatch =>
{
    if(localStorage.token)
    {
        setAuthToken(localStorage.token);
    }
    try {
        const res = await axios.get('/api/auth');
        dispatch({
            type:USER_LOADED,
            payload:res.data
        });

    } catch (error) {
        dispatch({
            type:AUTH_FAIL
        });
    }
}

export const register =  ({username,email,password}) =>  async dispatch =>
{
   
    const config  = 
    {
        headers:
        {
            'Content-Type':'application/json'
        }
    };

    const body = JSON.stringify({username,email,password});

    try {
        const response = await axios.post('/api/users',body,config);
        dispatch({
            type:REGISTER_SUCCESS,
            payload:response.data
        });
        dispatch(loadUser());
    } catch (error) {
        dispatch(setAlert(error.response.data.message,'danger'));
        dispatch(
            {
                type:REGISTER_FAIL
            }
        )
    }
};

export const login = (email,password) => async dispatch =>
{
    const config  = 
    {
        headers:
        {
            'Content-Type':'application/json'
        }
    };

    const body = JSON.stringify({email,password});
    try {
        const response = await axios.post('/api/auth',body,config);
        dispatch({
            type:LOGIN_SUCCESS,
            payload:response.data
        });
        dispatch(loadUser());
    } catch (error) {
        dispatch(setAlert(error.response.data.message,'danger'));
        dispatch(
            {
                type:LOGIN_FAIL
            }
        )
    }
};

export const logout = () => async dispatch =>
{
    dispatch({
        type:LOGOUT
    });
}
