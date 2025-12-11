import { useEffect, useState } from "react";
import keycloak from "./keycloak";

function App() {
  const [backendMessage, setBackendMessage] = useState("");

  // Fetch backend example
  useEffect(() => {
    fetch("http://localhost:8080/api/hello")
      .then((res) => res.json())
      .then((data) => setBackendMessage(data.message))
      .catch(() => setBackendMessage("Backend not running"));
  }, []);

  return (
    <div style={{ padding: 40, color: "black" }}>
      <h1>SMALL bhjbcdf</h1>

      {/* Backend Test */}
      <p>Backend says: {backendMessage}</p>

      <hr />

      {/* 🔥 Keycloak login status */}
      <h3>User: {keycloak.authenticated ? keycloak.tokenParsed?.preferred_username : "Guest"}</h3>

      {/* Login / Logout Buttons */}
      {!keycloak.authenticated ? (
        <button
          onClick={() => keycloak.login()}
          style={{ padding: "10px 20px", marginTop: 20 }}
        >
          Login
        </button>
      ) : (
        <button
          onClick={() => keycloak.logout()}
          style={{ padding: "10px 20px", marginTop: 20 }}
        >
          Logout
        </button>
      )}
    </div>
  );
}

export default App;
