import { Router, Request, Response } from "express";
import itemRoutes from "./itemRoutes";
import billRoutes from "./billRoutes";

const routes = Router();

routes.use('/items',itemRoutes)
routes.use('/bills',billRoutes)
export default routes;
