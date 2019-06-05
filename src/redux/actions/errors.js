export const SET_ERROR_BALANCE_FROM = "errors/SET_ERROR_BALANCE_FROM";

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
