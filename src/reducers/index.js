import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import errorMessage from './errorMessage'
import user from './user';
import * as ActionTypes from '../actions'


const rootReducer = combineReducers({
  errorMessage,
  user, 
  router: routerReducer
})

export default rootReducer