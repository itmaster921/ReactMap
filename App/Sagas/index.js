import {takeLatest, throttle} from "redux-saga/effects";
import API from "../Services/Api";
import FixtureAPI from "../Services/FixtureApi";
import DebugConfig from "../Config/DebugConfig";
import {StartupTypes} from "../Redux/StartupRedux";
import {ExploreTypes} from "../Redux/ExploreRedux";
import {SearchTypes} from "../Redux/SearchRedux";
import {startup} from "./StartupSagas";
import {getPoints} from "./ExploreSagas";
import {searchPoints} from "./SearchSagas";
import AppConfig from '../Config/AppConfig'

/* ------------- Types ------------- */

/* ------------- Sagas ------------- */

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root() {
  yield [
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),

    throttle(AppConfig.throttleDelay, ExploreTypes.GET_POINTS, getPoints, api),
    takeLatest( SearchTypes.SEARCH_POINTS, searchPoints, api)
  ]
}
