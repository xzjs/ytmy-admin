const initialState = {
  isLogin: true,
};

const reducer = (state = initialState, action) => {
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