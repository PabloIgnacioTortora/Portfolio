"use strict";

const express = require("express");
const ProjectController = require("../controller/project");
const authJwt = require("../middlewares/authJwt");
const router = express.Router();

const multipart = require("connect-multiparty");
const multipartMiddleware = multipart({ uploadDir: "./upload" });

router.get("/home", ProjectController.home);
router.post("/test", ProjectController.test);
router.get("/projects", ProjectController.getProjects);
router.get("/project/:id?", ProjectController.getProject);
router.post(
  "/saveProject",
  [authJwt.verifyToken, authJwt.isAdmin],
  ProjectController.saveProject
);
router.put(
  "/projectUpdate/:id",
  [authJwt.verifyToken, authJwt.isAdmin],
  ProjectController.updateProject
);
router.delete(
  "/projectDelete/:id",
  [authJwt.verifyToken, authJwt.isAdmin],
  ProjectController.deleteProject
);
router.post(
  "/uploadImage/:id",
  multipartMiddleware,
  ProjectController.uploadImage
);
router.get("/getImage/:image", ProjectController.getImageFile);

module.exports = router;
