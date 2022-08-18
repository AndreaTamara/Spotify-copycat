import {LOG_IN,LOG_OUT,SET_USER_DATA} from '../actions/logActions';

export const inicialState = {
    logged:false,
    user:{
        name:'',
        id:'',
        country:''
    }
}

export function logReducer(state = inicialState, action) {
    switch (action.type) {

        case LOG_IN:
            return {...state,logged:true}

        case LOG_OUT:
            return {...state, logged:false}

        case SET_USER_DATA:{
            const user = action.payload
            return {
                ...state,
                    user: {
                        name: user.display_name,
                        id: user.id,
                        country: user.country
                    }
            }
        }
        
        default: return state;
            
    }
}