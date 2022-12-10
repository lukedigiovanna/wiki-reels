import { Request, Response } from 'express';
import { Endpoint } from '../utils/endpoint';
import users from './users.service';

class UsersController {
    @Endpoint
    createUser(req: Request, res: Response) {
        return "";
    }
}

export default UsersController;
