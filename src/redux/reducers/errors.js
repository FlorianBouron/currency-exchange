import { SET_ERROR_BALANCE_FROM } from "../actions/errors";

const initialState = {
  errorBalanceFrom: ""
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_ERROR_BALANCE_FROM: {
      const { data } = action;
      const { error } = data;
      return Object.assign({}, state, { errorBalanceFrom: error });
    }
    default:
      return state;
  }
}
