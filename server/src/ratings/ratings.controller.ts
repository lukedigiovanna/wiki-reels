import { Request, Response } from 'express';
import { Endpoint } from '../utils/endpoint';

class RatingsController {
    @Endpoint
    test(req: Request, res: Response) {
        return "nothing";
    }
}

export default RatingsController;