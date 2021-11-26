const SET_LOGIN = "设置登录态";

function setLogin(isLogin) {
  return {
    type: SET_LOGIN,
    isLogin,
  };
}

export {setLogin}