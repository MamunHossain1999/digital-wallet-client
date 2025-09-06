/* eslint-disable @typescript-eslint/no-explicit-any */
// src/features/auth/components/GoogleLoginButton.tsx
import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import axios from "axios";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { setUser } from "@/features/auth/authSlice";
import "../../styles/google-button.css";

const GoogleLoginButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleLogin = async (credentialResponse: CredentialResponse) => {
    if (!credentialResponse.credential) {
      toast.error("Google login failed: No credential found");
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/google-login`,
        { token: credentialResponse.credential },
        { withCredentials: true }
      );

      dispatch(setUser(res.data.user));
      toast.success("Login successful with Google");
      navigate("/");
    } catch (err: any) {
      console.error("Google login error:", err);
      toast.error("Google login failed");
    }
  };

  return (
    <div className="w-full google-login-container" style={{ width: '100%' }}>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={() => toast.error("Google login failed")}
          width="384"
          size="large"
          theme="outline"
          text="signin_with"
          shape="rectangular"
          logo_alignment="left"
        />
      </div>
    </div>
  );
};

export default GoogleLoginButton;
