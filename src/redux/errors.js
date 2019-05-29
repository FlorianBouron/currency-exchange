const SET_ERROR_BALANCE_FROM = "wallets/SET_ERROR_BALANCE_FROM";
const SET_ERROR_BALANCE_TO = "wallets/SET_ERROR_BALANCE_TO";

const initialState = {
  errorBalanceFrom: "",
  errorBalanceTo: ""
};

export const selectors = {
  getErrors: state => state.errors
};

export const setErrorBalanceFrom = error => {
  return dispatch => {
    dispatch({
      type: SET_ERROR_BALANCE_FROM,
      data: {
        error
      }
    });
  };
};

export const setErrorBalanceTo = error => {
  return dispatch => {
    dispatch({
      type: SET_ERROR_BALANCE_TO,
      data: {
        error
      }
    });
  };
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
