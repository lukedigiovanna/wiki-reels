import { Router } from "express";
import { RouteSource } from "../models/router.model";
import RatingsController from "./ratings.controller";

class RatingsRouter implements RouteSource {
    private readonly controller: RatingsController;
    public readonly router: Router;
    public readonly path: string = "/api/ratings";

    constructor() {
        this.controller = new RatingsController();
        this.router = Router();
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get("/", this.controller.test);
    }
}

export { RatingsRouter };