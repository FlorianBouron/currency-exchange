export const SET_ERROR_BALANCE_FROM = "errors/SET_ERROR_BALANCE_FROM";
export const SET_ERROR_BALANCE_TO = "errors/SET_ERROR_BALANCE_TO";

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
