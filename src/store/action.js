function setLogin(isLogin) {
  return {
    type: 'SET_LOGIN',
    isLogin,
  };
}

export {setLogin}