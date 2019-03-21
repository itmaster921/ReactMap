import {createActions, createReducer} from "reduxsauce";
import _ from 'lodash'

import Immutable from "seamless-immutable";
import AppConfig from "../Config/AppConfig";


/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  setRegion: ['region'],
  addPointToFavorite: ['point'],
  removePointFromFavorite: ['point'],
  clearFavoritePoints: null,
  setMapType: ['mapType']
})

export const AppTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  region: AppConfig.initialRegion,
  favoritePoints: [],     // POI
  mapType: AppConfig.defaultMapType
})

/* ------------- Reducers ------------- */

export const setRegion = (state, {region}) => state.merge({region})

export const addPointToFavorite = (state, {point}) => state.merge({favoritePoints: state.favoritePoints.concat(point)})

export const removePointFromFavorite = (state, {point}) => {
  const favoritePoints = _.filter(state.favoritePoints, (pt) => {
    return( pt.id !== point.id)
  })
  return state.merge({favoritePoints})
}

export const setMapType = (state, {mapType}) => state.merge({mapType})

export const clearFavoritePoints = (state) => state.merge({favoritePoints: []})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_REGION]: setRegion,
  [Types.ADD_POINT_TO_FAVORITE]: addPointToFavorite,
  [Types.REMOVE_POINT_FROM_FAVORITE]: removePointFromFavorite,
  [Types.CLEAR_FAVORITE_POINTS]: clearFavoritePoints,
  [Types.SET_MAP_TYPE]: setMapType
})
