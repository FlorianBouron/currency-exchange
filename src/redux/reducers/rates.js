import { FETCH_RATES, FETCH_RATES_ERROR } from "../actions/rates";

const initialState = {};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_RATES: {
      const { data } = action;
      const { base, rates } = data;
      return Object.assign({}, state, { base, rates, error: "" });
    }
    case FETCH_RATES_ERROR: {
      const { data } = action;
      return Object.assign({}, state, { error: data });
    }
    default:
      return state;
  }
}
