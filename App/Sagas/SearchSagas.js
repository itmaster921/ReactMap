import {call, put} from "redux-saga/effects";
import SearchActions from "../Redux/SearchRedux";

export function* searchPoints(api, {searchTerm}) {
  if (searchTerm) {
    yield put(SearchActions.resetSearchPoints())

    const response = yield call(api.searchPoints, searchTerm)

    if (response.ok) {
      yield put(SearchActions.searchPointsSuccess(response))
    } else {
      yield put(SearchActions.searchPointsFailure(response))
    }
  }
}
