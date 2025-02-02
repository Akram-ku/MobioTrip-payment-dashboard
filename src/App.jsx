import { useState, useEffect, createContext, useRef } from "react";
import { ColorModeContext, useMode } from "./Theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route, useNavigate } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import EditProfile from "./scenes/EditProfile";
import Login from "./scenes/login";
import FAQ from "./scenes/faq";
import Dashboard from "./scenes/dashBoard";
import PrivateRoute from "./scenes/PrivateRoute";
import Wallets from "./scenes/Wallets";
import WalletOwner from "./scenes/WalletOwner";
import Transactions from "./scenes/Transactions";
import Loading from "./scenes/Loading";

export const LoginContext = createContext();

function App() {
  const [theme, colorMode] = useMode();
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const refreshInProgress = useRef(false);

  const refreshTokens = async () => {
    if (refreshInProgress.current) {
      console.log("Refresh token already in progress, skipping...");
      return;
    }
    refreshInProgress.current = true;

    const refresh = localStorage.getItem("refresh");
    if (refresh) {
      try {
        console.log("Attempting to refresh token with refresh token:", refresh);
        const response = await fetch(
          "https://b620-5-0-153-214.ngrok-free.app/users/refresh/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Origin: "https://b620-5-0-153-214.ngrok-free.app",
            },
            body: JSON.stringify({ refresh }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to refresh token");
        }

        const data = await response.json();
        console.log("Received new tokens:", data);
        localStorage.setItem("access", data.access);
        localStorage.setItem("refresh", data.refresh);
        setLoggedIn(true);
      } catch (error) {
        console.error("Refresh token error:", error);
        setLoggedIn(false);
        localStorage.clear();
        navigate("/login");
      } finally {
        refreshInProgress.current = false;
      }
    } else {
      setLoggedIn(false);
      localStorage.clear();
      navigate("/login");
      refreshInProgress.current = false;
    }
    setLoading(false);
  };

  useEffect(() => {
    console.log("Initializing App...");
    const initialize = async () => {
      setLoading(true);
      await refreshTokens();
    };

    initialize();
    // Set interval to refresh tokens every 60 minutes
    const minute = 1000 * 60;
    const intervalId = setInterval(refreshTokens, minute * 60);

    // Cleanup interval on component unmount
    return () => {
      clearInterval(intervalId);
      console.log("Cleared interval for token refresh.");
    };
  }, []);

  useEffect(() => {
    console.log("Checking loggedIn and loading state...");
    // setLoggedIn(true);
    // Check if the user is not logged in and loading is done, then navigate to login page
    if (!loggedIn && !loading) {
      navigate("/login");
    }
  }, [loggedIn, loading, navigate]);

  if (loading) {
    return <Loading />;
  }

  return (
    <LoginContext.Provider value={[loggedIn, setLoggedIn]}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            <main className="content">
              {location.pathname !== "/login" && <Topbar />}
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route element={<PrivateRoute />}>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/wallets" element={<Wallets />} />
                  <Route path="/transactions" element={<Transactions />} />
                  <Route path="/edit-profile" element={<EditProfile />} />
                  <Route path="/wallet-owner/:id" element={<WalletOwner />} />
                </Route>
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </LoginContext.Provider>
  );
}

export default App;
