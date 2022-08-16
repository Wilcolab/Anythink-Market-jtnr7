import {
  SUBMIT_TITLE_FILTER,
  ASYNC_START,
  UPDATE_SEARCH_FIELD,
  SEARCH_GET_CLICK,
} from "../constants/actionTypes";

const reducer = (state = {}, action) => {
  switch (action.type) {
    case SUBMIT_TITLE_FILTER:
      return {
        ...state,
        submitted: true,
        inProgress: null,
        errors: action.error ? action.payload.errors : null,
      };
    case ASYNC_START:
      if (action.subtype === SUBMIT_TITLE_FILTER) {
        return { ...state, inProgress: true };
      }
      break;
    case UPDATE_SEARCH_FIELD:
      if (action.subtype === SUBMIT_TITLE_FILTER) {
        return { ...state, title: action.payload };
      } else {
        return { ...state, title: action.payload, submitted: false };
      }

    case SEARCH_GET_CLICK:
      return { ...state, clicked: true };
    default:
      return state;
  }

  return state;
};

export default reducer;
