let express = require("express");
let router = express.Router(); 
const authMiddleWare = require("../middleware/auth-middleware");
const adminMiddleWare = require("../middleware/admin-middleware");
const { getAllUser, getAllContact, deleteUserById  ,getUserById, updateUserById, deleteContactById, becomeAdmin} = require("../controller/admin-controller");


router.route("/users").get( authMiddleWare , adminMiddleWare,  getAllUser);

router.route("/users/:id").get( authMiddleWare , adminMiddleWare,  getUserById);

router.route("/users/update/:id").patch( authMiddleWare , adminMiddleWare,  updateUserById);

router.route("/users/delete/:id").delete(authMiddleWare , adminMiddleWare , deleteUserById )

router.route("/contacts").get( authMiddleWare , adminMiddleWare ,   getAllContact);
router.route("/contacts/delete/:id").delete( authMiddleWare , adminMiddleWare ,   deleteContactById );

router.route("/becomeAdmin").put( authMiddleWare    ,becomeAdmin);

module.exports = router;
