import express from "express";
import router from "./auth.js";
import User from "./user.js";
import Task from "./task.js";

const Router = express.Router();

Router.use("/api", router );
Router.use("/user", User );
Router.use("/task", Task );

export default Router;