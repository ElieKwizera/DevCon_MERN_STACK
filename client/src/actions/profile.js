import axios from 'axios'
import  {GET_PROFILE,PROFILE_ERROR} from './types';

export const getCurrentProfile = ()=> async dispatch =>
{
    try {
        const res = await axios.get('/api/profile');
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })
    } catch (error) {

        dispatch({
            type:PROFILE_ERROR,
            payload:error
        })
        
    }
}