const express = require("express");
const { protect, authorize } = require("../../middleware/protect");

const {
  login,
  logout,
  register,
  createUser,
  deleteUser,
  getUsers,
  updateUser,
} = require("../../controller/GreenGroupControllers/greenGroupUsers");

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);

router.use(protect);
router
  .route("/")
  .get(authorize("admin"), getUsers)
  .post(authorize("admin"), createUser);
router
  .route("/:username")
  .post(authorize("admin"), updateUser)
  .delete(authorize("admin"), deleteUser);

// export hiij bna
module.exports = router;
