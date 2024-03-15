let dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

let express = require("express");
let app = express();
let PORT = process.env.PORT || 5000;
let cors = require("cors")
const { frontendUrl } = require("./assets/BackendUtils");


const corsOptions = {
    origin:  `${frontendUrl}`, // or an array of allowed origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

let authRoute = require("./router/auth-router");
let contactRoute = require("./router/contact-router");
let serviceRoute = require("./router/service-router");
let adminRoute = require("./router/admin-router");
const errorMiddleWare = require("./middleware/error-middleware");
// const errorMiddleWare = require("./middleware/error-middleware");

// Log checkpoint to ensure this code block is reached
console.log("Checkpoint 1");



app.use(express.json());

// Log checkpoint to ensure this code block is reached
console.log("Checkpoint 2");

app.use("/api/form", contactRoute);
app.use("/api/auth", authRoute);
app.use("/api/data", serviceRoute);
app.use("/api/admin",adminRoute );

// Log checkpoint to ensure this code block is reached
console.log("Checkpoint 3");

require("./db/conn");

// Log checkpoint to ensure this code block is reached
console.log("Checkpoint 4");





app.use(errorMiddleWare);

app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
});
