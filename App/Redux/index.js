import {combineReducers} from "redux";
import configureStore from "./CreateStore";
import rootSaga from "../Sagas/";

export default () => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    nav: require('./NavigationRedux').reducer,
    explore: require('./ExploreRedux').reducer,
    search: require('./SearchRedux').reducer,
    app: require('./AppRedux').reducer,
    startup: require('./StartupRedux').reducer
  })

  return configureStore(rootReducer, rootSaga)
}
