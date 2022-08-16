import {
  QUERY_SUBMITTED,
  ASYNC_START,
  UPDATE_SEARCH_FIELD,
} from "../constants/actionTypes";

const reducer = (state = {}, action) => {
  switch (action.type) {
    case QUERY_SUBMITTED:
      return {
        ...state,
        inProgress: null,
        errors: action.error ? action.payload.errors : null,
      };
    case ASYNC_START:
      if (action.subtype === QUERY_SUBMITTED) {
        return { ...state, inProgress: true };
      }
      break;
    case UPDATE_SEARCH_FIELD: //
      console.log("the action:::", action);
      return { ...state, title: action.payload };
    default:
      return state;
  }

  return state;
};

export default reducer;
