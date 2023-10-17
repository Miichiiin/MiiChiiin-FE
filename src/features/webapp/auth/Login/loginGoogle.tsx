import React from "react";
import { GoogleLogin } from "react-google-login";

const GoogleLoginButton = () => {
  const responseGoogle = (response: any) => {
    // Handle the response from Google here
    console.log("res", response);
    // res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    const idToken = response.tokenId;
    console.log(idToken);
    // You can send the ID token to your server for further processing
  };

  return (
    <GoogleLogin
      clientId="1087580804015-6cp4c8e5lev8qccea3u5qggvb3epu0jc.apps.googleusercontent.com"
      buttonText="Login with Google"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      //   redirectUri="http://localhost:5173/login"
      cookiePolicy={"single_host_origin"}
      isSignedIn={true}
    />
  );
};

export default GoogleLoginButton;
