import { useState } from "react";
import OAuthButton from "./components/OAuthButton";
import AdForm from "./components/AdForm";
import ErrorBanner from "./components/ErrorBanner";
import { mockOAuthExchange } from "./api/tiktokApi";
import "./styles.css";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [globalError, setGlobalError] = useState(null);

  const handleOAuth = async (code) => {
    try {
      const res = await mockOAuthExchange(code);
      localStorage.setItem("token", res.access_token);
      setToken(res.access_token);
    } catch (err) {
      setGlobalError(err.message);
    }
  };

  return (
    <div className="container">
      <h1>TikTok Ads Creative Flow</h1>

      <ErrorBanner error={globalError} />

      {!token ? (
        <OAuthButton onConnect={handleOAuth} />
      ) : (
        <AdForm token={token} setGlobalError={setGlobalError} />
      )}
    </div>
  );
}
