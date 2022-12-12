import { Request, Response } from 'express';
import { Endpoint } from '../utils/endpoint';
import ratings from './ratings.service';

class RatingsController {
    @Endpoint
    async getAllRatings(req: Request, res: Response) {
        const all = await ratings.getAll();
        console.log(all);
        return all;
    }

    @Endpoint
    async postRating(req: Request, res: Response) {
        // extract info from the body
        const { user, rank, articleTitle } = req.body;
        return await ratings.postRating(user, rank, articleTitle);
    }
}

export default RatingsController;