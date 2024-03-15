import { createContext, useContext, useState, useEffect } from "react";
import { backendUrl } from "../assets/FrontendUtils";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {


  // now for isLoading statein getting and updating any api request

  const [isLoading, setisLoading] = useState(true)
  const [isAdmin, setisAdmin] = useState(false)



  const [jwtToken, setjwtToken] = useState(localStorage.getItem("jwtToken"))

  const [userLoginedData, setuserLoginedData] = useState("");


  const [serviceData, setserviceData] = useState([])

  const AuthorisationToken = `Bearer ${jwtToken}`;

  let storeTokenInLS = (jwtGivenToken) => {
    console.log("token stored in local storage")
    setjwtToken(jwtGivenToken)
    return localStorage.setItem("jwtToken", jwtGivenToken)

  }

  let logoutUserFnc = () => {
    setjwtToken("")
    setuserLoginedData("");


    return localStorage.removeItem("jwtToken")
  }


  let isLoggedIn = !!jwtToken;


  // function to check the user Authentication or not
  const userAuthentication = async () => {
    try {
      let url = `${backendUrl}/api/auth/user`
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();

        // our main goal is to get the user data 👇
        setuserLoginedData(data.userData);
        setisAdmin(data.userData.isAdmin)
        setisLoading(false);
      } else {
        console.error("Error fetching user data");
        setuserLoginedData("")
        setisLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };



  let getServiceFnc = async () => {
    try {
      let url = `${backendUrl}/api/data/service`
      const response = await fetch(url, {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        setserviceData(data.response); // Update state with the array of objects
      } else {
        console.error("Error fetching user data");
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getServiceFnc();
    userAuthentication();
  }, []);

  useEffect(() => {
    console.log(serviceData); // Log updated serviceData whenever it changes
  }, [serviceData]);


  return <AuthContext.Provider value={{ AuthorisationToken, isLoggedIn, storeTokenInLS, logoutUserFnc, userLoginedData, serviceData, isLoading , isAdmin }}>
    {children}
  </AuthContext.Provider>
}



export const useAuthContextApi = () => {
  return useContext(AuthContext);
}