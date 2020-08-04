import {v4 as uuid} from 'uuid'

import {SET_ALERT,REMOVE_ALERT} from './types'

export const setAlert = (message, alertType)=> dispatch =>
{
    const id = uuid();
    dispatch (
        {
            type:SET_ALERT,
            payload: {id,message,alertType}
        }
    );

    setTimeout(()=> dispatch({type:REMOVE_ALERT,payload:id}), 10000);
};