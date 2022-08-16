import item from "./reducers/item";
import itemList from "./reducers/itemList";
import auth from "./reducers/auth";
import { combineReducers } from "redux";
import common from "./reducers/common";
import editor from "./reducers/editor";
import search from "./reducers/search";
import home from "./reducers/home";
import profile from "./reducers/profile";
import settings from "./reducers/settings";
import { routerReducer } from "react-router-redux";

export default combineReducers({
  item,
  itemList,
  auth,
  common,
  editor,
  search,
  home,
  profile,
  settings,
  router: routerReducer,
});
