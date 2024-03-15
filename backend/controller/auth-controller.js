const User = require("../model/userSchema");

const bcrypt = require("bcryptjs");

let home = async (req, res) => {
    try {

        res.status(200).send("Welcome to the backend home page using controllers");
    } catch (error) {
        console.log(error)
    }

}


let RegisterGet = async (req, res) => {
    try {

        res.status(200).send("Welcome to the register home page using controllers");
    } catch (error) {
        console.log("error")
    }

}


const register = async (req, res) => {
    try {
      const { username, email, phone, password } = req.body;
  
      // Checking if the user didn't leave any field empty
      if (!username || !email || !phone || !password) {
        return res.status(422).json({ error: "Enter all details properly" });
      }
  
      // Checking if the user with the same email already exists
      const userExist = await User.findOne({ email: email });
  
      if (userExist) {
        return res.status(422).json({ message: "User already registered" });
      }
  
      // Creating the user
      const userCreated = await User.create({ username, email, phone, password });
  
      // Checking if the user was created successfully
      if (!userCreated) {
        return res.status(500).json({ error: "Error creating user" });
      }
  
      // Generating and sending JWT token upon successful registration
      const jwtToken = await userCreated.generateAuthToken();
  
      return res.status(201).json({
        message: "User registration is done",
        jwtToken,
        userId: userCreated._id.toString(),
      });
    } catch (error) {
      console.error("Error in registration:", error);
      // res.status(500).json({ error: "Error in registration" });
      next(error) ; 
    }
  };
  
  module.exports = register;
  




let login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Enter details properly for sign in" });
        }

        const userLogin = await User.findOne({ email: email });

        console.log("User Login:", userLogin);

        if (userLogin) {
            const passwordIsMatch = await userLogin.comparePassword(password);

            console.log("Password Match:", passwordIsMatch);

            if (!passwordIsMatch) {
                return res.status(400).json({ error: "Invalid credentials, wrong password" });
            } else {
                const jwtToken = await userLogin.generateAuthToken();

                console.log("User login successful");

                return res.status(201).json({
                    message: "User login successfully",
                    jwtToken: jwtToken,
                    userId: userLogin._id.toString()
                });
            }
        } else {
            console.log("User is not registered");
            return res.status(400).json({ message: "User is not registered" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error in signing in" });
    }
};


const user = async (req, res) => {
    try {
      // const userData = await User.find({});
      const userData = req.user;
      console.log(userData);
      return res.status(200).json({userData });
    } catch (error) {
      console.log(` error from user route ${error}`);
    }
  };




module.exports = { home, register , login  , RegisterGet , user }; 