import {createActions, createReducer} from "reduxsauce";
import Immutable from "seamless-immutable";

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  searchPoints: ['searchTerm'],
  searchPointsSuccess: ['response'],
  searchPointsFailure: ['response'],
  resetSearchPoints: null
})

export const SearchTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  points: [],
  fetching: false,
  error: null
})

/* ------------- Reducers ------------- */

export const searchPoints = (state) =>
  state.merge({fetching: true})

export const searchPointsSuccess = (state, {response}) => {
  const {data} = response
  return state.merge({fetching: false, error: null, points: data})
}

export const searchPointsFailure = (state) => state.merge({fetching: false, error: true, points: []})

export const resetSearchPoints = (state) => state.merge({points: []})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SEARCH_POINTS]: searchPoints,
  [Types.SEARCH_POINTS_SUCCESS]: searchPointsSuccess,
  [Types.SEARCH_POINTS_FAILURE]: searchPointsFailure,
  [Types.RESET_SEARCH_POINTS]: resetSearchPoints
})
