import { Request, Response } from 'express';
import { HttpException } from '../models/exception.model';
import { Endpoint } from '../utils/endpoint';
import users from './users.service';

class UsersController {
    @Endpoint
    createUser(req: Request, res: Response) {
        const uid: string | undefined = req.body.uid;
        if (!uid) {
            throw new HttpException("Missing uid", 400);
        }
        const user = users.createUser(uid);
        return user;
    }
}

export default UsersController;
