export default {
 async login(context,payload){
 return context.dispatch('auth',{
    ...payload,
    mode:'login'
  })
  // const response = await fetch(
  //   'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBUnx9LpMYioUROsm3yQRBlFXLD34gmBRU',
  //   {
  //     method: 'POST',
  //     body: JSON.stringify({
  //       email: payload.email,
  //       password: payload.password,
  //       returnSecureToken: true
  //     })
  //   });
  // const responseData = await response.json();
  // if (!response.ok) {
  //   console.log(responseData);
  //   const error = new Error(responseData.message || "Fail to Authenticate check you login data");
  //   throw error;
  // }
  // console.log(responseData);

  // context.commit('setUser', {
  //   token: responseData.idToken,  
  //   userId: responseData.localId,
  //   tokenExpiration: responseData.expiresIn,
  // });
 },
  async signup(context,payload){
   return context.dispatch('auth',{
      ...payload,
      mode:'signup'
    })
    // const response = await fetch(
    //   'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBUnx9LpMYioUROsm3yQRBlFXLD34gmBRU',
    //   {
    //     method: 'POST',
    //     body: JSON.stringify({
    //       email: payload.email,
    //       password: payload.password,
    //       returnSecureToken: true
    //     })
    //   });
    // const responseData = await response.json();
    // if (!response.ok) {
    //   console.log(responseData);
    //   const error = new Error(responseData.message || "Fail to Authenticate check you login data");
    //   throw error;
    // }
    // console.log(responseData);

    // context.commit('setUser', {
    //   token: responseData.idToken,  
    //   userId: responseData.localId,
    //   tokenExpiration: responseData.expiresIn,
    // });
  },
  isLogOut(context){
    context.commit('setUser',{
      token:null,
      userId:null,
      tokenExpiration:null
    })
  },
async auth(context,payload){
  const mode = payload.mode;
  let url ='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBUnx9LpMYioUROsm3yQRBlFXLD34gmBRU';
  if (mode === "SignUp") {
    url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBUnx9LpMYioUROsm3yQRBlFXLD34gmBRU';
  } 
  const response = await fetch(
      url,
      {
        method: 'POST',
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true
        })
      });
    const responseData = await response.json();
    if (!response.ok) {
      console.log(responseData);
      const error = new Error(responseData.message || "Fail to Authenticate check you login data");
      throw error;
    }
    console.log(responseData);
  
    context.commit('setUser', {
      token: responseData.idToken,  
      userId: responseData.localId,
      tokenExpiration: responseData.expiresIn,
    });
  }
};
