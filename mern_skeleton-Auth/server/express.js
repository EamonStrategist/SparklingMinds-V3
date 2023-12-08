/*import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compress())
app.use(helmet())
app.use(cors())
export default app
*/

import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compress from "compression";
import cors from "cors";
import helmet from "helmet";
import Template from "./../template.js";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import adminProductsRoutes from "./routes/adminproducts.routes.js";

//import devBundle from './devBundle'
import path from "path";

const app = express();
const CURRENT_WORKING_DIR = process.cwd();
//devBundle.compile(app)
app.use(cors());
app.options("http://localhost:5173", cors());
//...
//app.get("/", (req, res) => {
//  res.status(200).send(Template());
//});
//...
app.use(express.static(path.join(CURRENT_WORKING_DIR, "dist/app")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", userRoutes);
app.use("/", authRoutes);
app.use("/", productRoutes);
app.use("/", adminProductsRoutes);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) =>{
  res.status(200).sendFile(path.join(_dirname, '/index.html'));

});
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: err.name + ": " + err.message });
  } else if (err) {
    res.status(400).json({ error: err.name + ": " + err.message });
    console.log(err);
  }
});
export default app;
