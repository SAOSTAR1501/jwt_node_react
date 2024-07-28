require("dotenv").config();
import express from "express";
import configViewEngine from "./config/viewEngine";
import initApiRoutes from "./routes/api";
import initWebRoutes from "./routes/web";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import connection from "./config/connnectDB";
import configCors from "./config/cors";

const app = express();
const PORT = process.env.PORT || 8080;

//config Cors
configCors(app);
//config view engine
configViewEngine(app);

//config body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//config cookie parser
app.use(cookieParser());

//init api routes
initApiRoutes(app);
//init web routes
initWebRoutes(app);
connection();

app.listen(PORT, () => {
  console.log("JWT backend is running on port " + PORT);
});
