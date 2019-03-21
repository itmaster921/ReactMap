import {createActions, createReducer} from "reduxsauce";
import Immutable from "seamless-immutable";

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  getPoints: ['region'],
  getPointsSuccess: ['response'],
  getPointsFailure: ['response'],
  resetPoints: null,
  selectPoint: ['point'],
  selectPoi: ['point']
})

export const ExploreTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  points: [],           // Point
  fetching: false,
  error: null,
  selectedPoint: null     // POI
})

/* ------------- Reducers ------------- */

export const getPoints = (state) =>
  state.merge({fetching: true})

export const getPointsSuccess = (state, {response}) => {
  const {points} = response.data
  return state.merge({fetching: false, error: null, points})
}

export const getPointsFailure = (state) => state.merge({fetching: false, error: true, points: []})

export const resetPoints = (state) => state.merge({points: []})

export const selectPoint = (state, {point}) => state.merge({selectedPoint: point && point.json})
export const selectPoi = (state, {point}) => state.merge({selectedPoint: point})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_POINTS]: getPoints,
  [Types.GET_POINTS_SUCCESS]: getPointsSuccess,
  [Types.GET_POINTS_FAILURE]: getPointsFailure,
  [Types.RESET_POINTS]: resetPoints,
  [Types.SELECT_POINT]: selectPoint,
  [Types.SELECT_POI]: selectPoi,
})
