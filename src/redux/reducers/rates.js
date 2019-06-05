import { FETCH_RATES, FETCH_RATES_ERROR } from "../actions/rates";

const initialState = {};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_RATES: {
      const { data } = action;
      const { base, rates } = data;
      rates[base] = 1;
      return { ...state, base, rates, error: "" };
    }
    case FETCH_RATES_ERROR: {
      const { data } = action;
      return { ...state, error: data };
    }
    default:
      return state;
  }
}
