import  {GET_PROFILE,PROFILE_ERROR} from '../actions/types'

const initialState = 
{
    profile:null,
    profiles:[],
    error: null
}

export default function( state=initialState,action)
{
    const {type,payload} = action;
    switch(type)
    {
        case GET_PROFILE:
            return {
                ...state,
                profile:payload
            }
        case PROFILE_ERROR:
            return{
                ...state,
                error:payload
            }
        default:
            return state
    }

}