import { createContext, useContext, useState, useEffect } from "react";
import { backendUrl } from "../assets/FrontendUtils";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [jwtToken, setJwtToken] = useState(localStorage.getItem("jwtToken"));
  const [userLoginedData, setUserLoginedData] = useState("");
  const [serviceData, setServiceData] = useState([]);
  const AuthorisationToken = `Bearer ${jwtToken}`;

  let storeTokenInLS = (jwtGivenToken) => {
    setJwtToken(jwtGivenToken);
    localStorage.setItem("jwtToken", jwtGivenToken);
  };

  let isLoggedIn = !!jwtToken;

  const userAuthentication = async () => {
    try {
      let url = `${backendUrl}/api/auth/user`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserLoginedData(data.userData);
        setIsAdmin(data.userData.isAdmin);
        setIsLoading(false);
      } else {
        console.error("Error fetching user data");
        setUserLoginedData("");
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  let getServiceFnc = async () => {
    try {
      let url = `${backendUrl}/api/data/service`;
      const response = await fetch(url, {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        setServiceData(data.response);
      } else {
        console.error("Error fetching service data");
      }
    } catch (error) {
      console.log(error);
    }
  };

  let logoutUserFnc = () => {
    setJwtToken("");
    setUserLoginedData("");
    localStorage.removeItem("jwtToken");
  };

  useEffect(() => {
    if (jwtToken) {
      userAuthentication();
    }
  }, [jwtToken]);

  useEffect(() => {
    getServiceFnc();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        AuthorisationToken,
        isLoggedIn,
        storeTokenInLS,
        logoutUserFnc,
        userLoginedData,
        serviceData,
        isLoading,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContextApi = () => {
  return useContext(AuthContext);
}