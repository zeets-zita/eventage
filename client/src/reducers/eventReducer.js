import {
    GET_EVENTS,
    GET_EVENT,
    ADD_EVENT,
    DELETE_EVENT,
    UPDATE_EVENT,
    EVENTS_LOADING
} from '../actions/types'


const intialState = {
    events: [],
    event: {},
    loading: false
}


export default function (state = intialState, action) {
    switch(action.type) {
        case GET_EVENTS:
            return {
                ...state,
                events: action.payload,
                loading: false
            };
        case GET_EVENT:
             return {
                ...state,
                event: action.payload,
                loading: false
            }
        case DELETE_EVENT:
            return {
                ...state,
                events: state.events.filter(event => event._id !== action.payload)
            }
        case ADD_EVENT:
            return {
                ...state,
                events: [action.payload, ...state.events]
            }
        case UPDATE_EVENT:
            return {
                ...state,
                event: action.payload
            }
        case EVENTS_LOADING: 
            return {
                ...state,
                loading: true
            }   
        default:
            return state;
    }
}