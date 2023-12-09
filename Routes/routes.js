const express = require("express");
const user = require("../Controllers/userControls");
const upload = require("../middlewares/multerMiddleware");
const { jwtMiddleware } = require("../middlewares/jwtMiddleware");
const project = require("../Controllers/projectControls");
const router = new express.Router();

router.post("/users/register", user.register);

router.post("/users/login", user.login);

router.put(
  "/users/updateProfile/:_id",
  jwtMiddleware,
  upload.single("profile"),
  user.editProfile
);

router.post(
  "/users/addProject",
  jwtMiddleware,
  upload.single("projectImg"),
  project.addProject
);

router.get(
  "/users/getUserProjects/:id",
  jwtMiddleware,
  project.getUserProjects
);
router.get("/users/getAllProjects", project.getAllProjects);
router.get("/users/getHomeProjects", project.getHomeProjects);

router.put(
  "/users/editProject/:_id",
  jwtMiddleware,
  upload.single("projectImg"),
  project.editProject
);

router.delete(
  "/users/deleteProject/:_id",
  jwtMiddleware,
  project.deleteProject
);

module.exports = router;
