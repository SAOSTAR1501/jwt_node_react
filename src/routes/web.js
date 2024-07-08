import express from "express";
import homeController from "../controllers/homeController";
const router = express.Router();
import apiController from "../controllers/apiController";
/**
 *
 * @param {*} app : express app
 */
const initWebRoutes = (app) => {
  router.get("/", homeController.handleHelloWorld);
  router.get("/user", homeController.handleUserPage);
  router.post("/user/create-user", homeController.handleCreateNewUser);
  router.post("/delete-user/:id", homeController.handleDeleteUser);
  router.get("/update-user/:id", homeController.getUpdateUserPage);
  router.post("/user/update-user", homeController.handleUpdateUser);

  router.get("/api/test-api", apiController.testApi);
  return app.use("/", router);
};

export default initWebRoutes;
