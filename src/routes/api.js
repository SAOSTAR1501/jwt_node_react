import express from "express";
import homeController from "../controllers/homeController";
const router = express.Router();
import apiController from "../controllers/apiController";
/**
 *
 * @param {*} app : express app
 */
const initApiRoutes = (app) => {
  router.get("/test-api", apiController.testApi);
  router.post("/register", apiController.handleRegister);
  router.post("/login", apiController.handleLogin);
  return app.use("/api/v1/", router);
};

export default initApiRoutes;
