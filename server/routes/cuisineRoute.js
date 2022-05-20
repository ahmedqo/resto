const express = require("express");
const { getCuisines, getCuisine, updateCuisine, deleteCuisine, createCuisine } = require("../controllers/cuisineController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

const router = express.Router();

router.route("/cuisines").get(getCuisines);
router.route("/cuisine/:id").get(getCuisine);

router.route("/admin/cuisine/new").post(isAuthenticatedUser, authorizeRoles("admin"), createCuisine);

router
    .route("/admin/cuisine/:id")
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateCuisine)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteCuisine);

module.exports = router;