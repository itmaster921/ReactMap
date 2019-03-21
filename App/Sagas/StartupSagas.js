import {put} from "redux-saga/effects";
import StartupActions from "../Redux/StartupRedux";


export function * startup(action) {
  yield put(StartupActions.startupSuccess())
}
