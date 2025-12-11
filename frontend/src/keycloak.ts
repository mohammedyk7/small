import Keycloak from "keycloak-js";

// Keycloak instance
const keycloak = new Keycloak({
  url: "http://localhost:8090",     // Keycloak server
  realm: "small",                   // Your realm name
  clientId: "small-frontend",       // The client you created
});

export default keycloak;
