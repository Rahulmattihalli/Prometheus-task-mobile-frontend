import {combineReducers} from 'redux';
import UserReducer from './reducers/user';


const RootReducer = combineReducers({
   userreducer : UserReducer,
})
export default RootReducer;