import { Router } from "express";
import { RouteSource } from "../models/router.model";
import UsersController from "./users.controller";

class UsersRouter implements RouteSource {
    private readonly controller: UsersController;
    public readonly router: Router;
    public readonly path: string = '/api/users';

    constructor() {
        this.router = Router();
        this.controller = new UsersController();
        this.initializeRoutes();
    }

    initializeRoutes() {
        
    }
} 

export { UsersRouter };