import {
  SET_ERROR_BALANCE_FROM,
  SET_ERROR_BALANCE_TO
} from "../actions/errors";

const initialState = {
  errorBalanceFrom: "",
  errorBalanceTo: ""
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_ERROR_BALANCE_FROM: {
      const { data } = action;
      const { error } = data;
      return Object.assign({}, state, { errorBalanceFrom: error });
    }
    case SET_ERROR_BALANCE_TO: {
      const { data } = action;
      const { error } = data;
      return Object.assign({}, state, { errorBalanceTo: error });
    }
    default:
      return state;
  }
}
