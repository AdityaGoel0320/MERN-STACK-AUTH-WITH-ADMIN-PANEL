let express = require("express");
let router = express.Router(); 

const contactController = require("../controller/contact-controller");

// This is where the error occurs, ensure you are using contactController.contactForm as a callback
router.route("/contact").post(contactController.contactForm);

module.exports = router;
