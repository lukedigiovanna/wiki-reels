import { Request, Response } from 'express';
import { HttpException } from '../models/exception.model';
import { Endpoint } from '../utils/endpoint';
import articles from './articles.service';

class ArticlesController {
    @Endpoint
    async createArticle(req: Request, res: Response) {
        const { title, content, categories } = req.body;
        if (!title || !content || !categories) {
            throw new HttpException("Missing title, content, or categories", 400);
        }
        return await articles.createArticle(title, content, categories);
    }
}

export default ArticlesController;
