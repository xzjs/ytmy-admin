const reducer = (state, action) => {
  switch (action.type) {
    case "SET_LOGIN":
      return Object.assign({}, state, {
        isLogin: action.isLogin,
      });
    default:
      return state;
  }
};

export default reducer;
