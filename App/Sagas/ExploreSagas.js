import {call, put} from "redux-saga/effects";
import ExploreActions from "../Redux/ExploreRedux";
import AppConfig from "../Config/AppConfig";
import {viewport} from "@mapbox/geo-viewport";
import Metrics from "../Themes/Metrics";
import {getCoordinatesFromRegion} from '../Lib/Map'

export function * getPoints(api, action) {
  const {region} = action

  const bounds = [
    region.longitude - region.longitudeDelta,
    region.latitude - region.latitudeDelta,
    region.longitude + region.longitudeDelta,
    region.latitude + region.latitudeDelta,
  ]

  const view = viewport(bounds, [Metrics.screenHeight, Metrics.screenWidth], 1, AppConfig.zoomLevelToRadius.length, AppConfig.mapTileSize)

  const zoomIndex = view.zoom - 1

  const radius = AppConfig.zoomLevelToRadius[zoomIndex]

  const point = getCoordinatesFromRegion(region)

  const data = {
    radius,
    types: AppConfig.defaultTypes,
    x1: point.x1,
    x2: point.x2,
    y1: point.y1,
    y2: point.y2
  }

  const response = yield call(api.getPoiByBbox, data)

  if (response.ok) {
    yield put(ExploreActions.getPointsSuccess(response))
  } else {
    yield put(ExploreActions.getPointsFailure(response))
  }
}
