import { Router } from "express";
import { RouteSource } from "../models/router.model";
import ArticlesController from "./articles.controller";

class ArticlesRouter implements RouteSource {
    private readonly controller: ArticlesController;
    public readonly router: Router;
    public readonly path: string = '/api/articles';

    constructor() {
        this.router = Router();
        this.controller = new ArticlesController();
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.post('/', this.controller.createArticle);
    }
} 

export { ArticlesRouter };