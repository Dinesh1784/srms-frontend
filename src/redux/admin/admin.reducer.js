import { AdminActionTypes } from "./admin.types";

const initialState = {
  currentAdmin: null,
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case AdminActionTypes.SET_CURRENT_ADMIN:
      return {
        ...state,
        currentAdmin: action.payload,
      };
    case AdminActionTypes.LOGOUT_ADMIN:
      return {
        ...state,
        currentAdmin: null,
      };

    default:
      return state;
  }
};

export default adminReducer;
