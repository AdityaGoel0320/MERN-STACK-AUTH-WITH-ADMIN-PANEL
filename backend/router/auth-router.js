let express = require("express");
let router = express.Router();

const authController = require("../controller/auth-controller");

let validate = require("../middleware/validate-middleware")

let { registerSchema, loginSchema } = require("../validators/auth-validators");
const authMiddleWare = require("../middleware/auth-middleware");

router.route("/").get(authController.home);

router.route("/register")
    .get(authController.RegisterGet)
    .post(validate(registerSchema), authController.register);


router.route("/login").post(validate(loginSchema), authController.login);



router.route("/user").get(authMiddleWare, authController.user);



module.exports = router;